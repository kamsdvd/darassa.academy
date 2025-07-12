import { Request, Response } from 'express';
import { plainToClass } from 'class-transformer';
import { validate, ValidationError } from 'class-validator';
import { FormationService } from '../services/formation.service';
import { IFormation } from '../models/formation.model';
import { CreateFormationDto } from '../dtos/formation/create-formation.dto';
import { UpdateFormationDto } from '../dtos/formation/update-formation.dto';

const formationService = new FormationService();

// Helper function to format validation errors
const formatValidationErrors = (errors: ValidationError[]): any => {
  return errors.map(err => {
    return {
      property: err.property,
      constraints: err.constraints,
      children: err.children ? formatValidationErrors(err.children) : [], // Handle nested errors
    };
  });
};

export class FormationController {
  public async getAllFormations(req: Request, res: Response): Promise<void> {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;
      const category = req.query.category as string | undefined;
      const level = req.query.level as string | undefined;

      const result = await formationService.findAll(page, limit, category, level);

      // Map to a DTO if necessary, for now sending full result
      // Potentially, we should adapt this to CourseDto structure if API contract is strict
      res.status(200).json({
        success: true,
        data: result.data,
        pagination: {
          page: result.page,
          limit: result.limit,
          total: result.total,
          pages: result.totalPages,
        },
      });
    } catch (error) {
      console.error('Error in getAllFormations:', error);
      res.status(500).json({ success: false, message: 'Erreur serveur lors de la récupération des formations.' });
    }
  }

  public async getFormationById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const formation = await formationService.findById(id);

      if (!formation) {
        res.status(404).json({ success: false, message: 'Formation non trouvée.' });
        return;
      }
      // Map to a DTO if necessary
      res.status(200).json({ success: true, data: formation });
    } catch (error) {
      const err = error as any;
      console.error(`Error in getFormationById for id ${req.params.id}:`, err);
      if (err.kind === 'ObjectId') { // Mongoose specific error for bad ID format
        res.status(400).json({ success: false, message: 'ID de formation invalide.' });
        return;
      }
      res.status(500).json({ success: false, message: 'Erreur serveur lors de la récupération de la formation.' });
    }
  }

  public async createFormation(req: Request, res: Response): Promise<void> {
    const createFormationDto = plainToClass(CreateFormationDto, req.body);
    const errors = await validate(createFormationDto, { skipMissingProperties: false, whitelist: true, forbidNonWhitelisted: true });

    if (errors.length > 0) {
      res.status(400).json({ success: false, message: "Erreur de validation des données.", errors: formatValidationErrors(errors) });
      return;
    }

    try {
      // Conversion des dates string en Date
      // Mapping des modules pour garantir la compatibilité avec IModule
      let modules: any = undefined;
      if (Array.isArray(createFormationDto.modules)) {
        modules = createFormationDto.modules.map((mod: any) => ({
          ...mod,
          contenu: Array.isArray(mod.contenu) ? mod.contenu : [],
          evaluation: Array.isArray(mod.evaluation) ? mod.evaluation : [],
        }));
      }
      const payload: Partial<IFormation> = {
        ...createFormationDto,
        dateDebut: new Date(createFormationDto.dateDebut),
        dateFin: new Date(createFormationDto.dateFin),
        modules
      };
      const newFormation = await formationService.create(payload);
      res.status(201).json({ success: true, message: "Formation créée avec succès.", data: newFormation });
    } catch (error) {
      const err = error as any;
      console.error('Error in createFormation:', err);
      if (err.name === 'ValidationError') { // Mongoose schema validation error (should be caught by DTO, but as fallback)
        res.status(400).json({ success: false, message: "Erreur de validation (schéma base de données).", errors: err.errors });
      } else if (err.code === 11000) { // MongoError: Duplicate key (e.g. for 'code' field)
        res.status(409).json({ success: false, message: "Une formation avec ce code existe déjà." });
      } else {
        res.status(500).json({ success: false, message: 'Erreur serveur lors de la création de la formation.' });
      }
    }
  }

  public async updateFormation(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const updateFormationDto = plainToClass(UpdateFormationDto, req.body);
    // For updates, skipMissingProperties should probably be true if not all fields are sent.
    // However, if forbidNonWhitelisted is true, unknown properties will still cause an error.
    // Whitelist ensures that only properties defined in DTO are passed through.
    const errors = await validate(updateFormationDto, { skipMissingProperties: false, whitelist: true, forbidNonWhitelisted: true });

    if (errors.length > 0) {
      res.status(400).json({ success: false, message: "Erreur de validation des données pour la mise à jour.", errors: formatValidationErrors(errors) });
      return;
    }

    // Ensure that if the body is empty after DTO transformation (e.g. only non-whitelisted props were sent),
    // we don't proceed with an empty update.
    if (Object.keys(updateFormationDto).length === 0 && Object.keys(req.body).length > 0) {
        res.status(400).json({ success: false, message: "Aucun champ valide fourni pour la mise à jour." });
        return;
    }
    if (Object.keys(updateFormationDto).length === 0 && Object.keys(req.body).length === 0) {
         res.status(400).json({ success: false, message: "Le corps de la requête ne peut pas être vide pour une mise à jour." });
        return;
    }


    try {
      // Pass validated DTO data. UpdateFormationDto is Partial, compatible with service's Partial<IFormation>.
      const updatedFormation = await formationService.update(id, updateFormationDto as Partial<IFormation>);

      if (!updatedFormation) {
        res.status(404).json({ success: false, message: 'Formation non trouvée pour la mise à jour.' });
        return;
      }
      res.status(200).json({ success: true, message: "Formation mise à jour avec succès.", data: updatedFormation });
    } catch (error) {
      const err = error as any;
      console.error(`Error in updateFormation for id ${id}:`, err);
      if (err.name === 'ValidationError') { // Mongoose schema validation
        res.status(400).json({ success: false, message: "Erreur de validation (schéma base de données).", errors: err.errors });
      } else if (err.kind === 'ObjectId') { // Mongoose error for bad ID format
        res.status(400).json({ success: false, message: 'ID de formation invalide.' });
      } else if (err.code === 11000) { // MongoError: Duplicate key
        res.status(409).json({ success: false, message: "Conflit de données, le code de formation doit être unique." });
      } else {
        res.status(500).json({ success: false, message: 'Erreur serveur lors de la mise à jour de la formation.' });
      }
    }
  }

  public async deleteFormation(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const deletedFormation = await formationService.delete(id);

      if (!deletedFormation) {
        res.status(404).json({ success: false, message: 'Formation non trouvée pour la suppression.' });
        return;
      }
      res.status(200).json({ success: true, message: "Formation supprimée avec succès.", data: deletedFormation });
    } catch (error) {
      const err = error as any;
      console.error(`Error in deleteFormation for id ${req.params.id}:`, err);
      if (err.kind === 'ObjectId') {
        res.status(400).json({ success: false, message: 'ID de formation invalide.' });
        return;
      }
      res.status(500).json({ success: false, message: 'Erreur serveur lors de la suppression de la formation.' });
    }
  }
}
