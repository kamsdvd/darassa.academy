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

  // TODO: Implement controller methods for CUD operations
}
