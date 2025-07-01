import { Request, Response } from 'express';
import { FormationService } from '../services/formation.service.ts';
import { IFormation } from '../models/formation.model.ts'; // For type hinting if needed

const formationService = new FormationService();

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
      console.error(`Error in getFormationById for id ${req.params.id}:`, error);
      if (error.kind === 'ObjectId') { // Mongoose specific error for bad ID format
        res.status(400).json({ success: false, message: 'ID de formation invalide.' });
        return;
      }
      res.status(500).json({ success: false, message: 'Erreur serveur lors de la récupération de la formation.' });
    }
  }

  public async createFormation(req: Request, res: Response): Promise<void> {
    try {
      // Basic validation: Ensure body is not empty
      if (Object.keys(req.body).length === 0) {
        res.status(400).json({ success: false, message: "Le corps de la requête ne peut pas être vide." });
        return;
      }
      // TODO: Add more robust validation (e.g., check for required fields like titre, description, code, etc.)
      // For example, using a DTO with class-validator if in a full NestJS setup.

      const formationData: Partial<IFormation> = req.body;
      const newFormation = await formationService.create(formationData);
      res.status(201).json({ success: true, message: "Formation créée avec succès.", data: newFormation });
    } catch (error) {
      console.error('Error in createFormation:', error);
      if (error.name === 'ValidationError') { // Mongoose validation error
        res.status(400).json({ success: false, message: "Erreur de validation.", errors: error.errors });
      } else if (error.code === 11000) { // MongoError: Duplicate key
        res.status(409).json({ success: false, message: "Une formation avec ce code existe déjà." });
      } else {
        res.status(500).json({ success: false, message: 'Erreur serveur lors de la création de la formation.' });
      }
    }
  }

  public async updateFormation(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      if (Object.keys(req.body).length === 0) {
        res.status(400).json({ success: false, message: "Le corps de la requête ne peut pas être vide pour une mise à jour." });
        return;
      }
      // TODO: Add more robust validation for req.body

      const formationData: Partial<IFormation> = req.body;
      const updatedFormation = await formationService.update(id, formationData);

      if (!updatedFormation) {
        res.status(404).json({ success: false, message: 'Formation non trouvée pour la mise à jour.' });
        return;
      }
      res.status(200).json({ success: true, message: "Formation mise à jour avec succès.", data: updatedFormation });
    } catch (error) {
      console.error(`Error in updateFormation for id ${req.params.id}:`, error);
      if (error.name === 'ValidationError') {
        res.status(400).json({ success: false, message: "Erreur de validation.", errors: error.errors });
      } else if (error.kind === 'ObjectId') {
        res.status(400).json({ success: false, message: 'ID de formation invalide.' });
      } else if (error.code === 11000) { // Duplicate key error, e.g. if trying to update 'code' to one that already exists
        res.status(409).json({ success: false, message: "Conflit de données, le code de formation doit être unique." });
      }
      else {
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
      console.error(`Error in deleteFormation for id ${req.params.id}:`, error);
       if (error.kind === 'ObjectId') {
        res.status(400).json({ success: false, message: 'ID de formation invalide.' });
        return;
      }
      res.status(500).json({ success: false, message: 'Erreur serveur lors de la suppression de la formation.' });
    }
  }
}
