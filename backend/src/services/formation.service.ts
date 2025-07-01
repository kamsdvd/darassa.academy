import { Formation, IFormation } from '../models/formation.model.ts';
import { Session, ISession } from '../models/session.model.ts'; // Import Session model

// Utility for pagination if not using a library
interface PaginatedResult<T> {
  data: T[];
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export class FormationService {
  public async findAll(page: number = 1, limit: number = 10, category?: string, level?: string): Promise<PaginatedResult<IFormation>> {
    const skip = (page - 1) * limit;

    const query: any = {};
    if (category && typeof category === 'string' && category.trim() !== '') {
      // Utiliser une expression régulière pour une recherche insensible à la casse et partielle
      // query.category = new RegExp(category, 'i');
      // Ou pour une correspondance exacte (sensible à la casse par défaut):
      query.category = category.trim();
    }
    if (level && typeof level === 'string' && level.trim() !== '') {
      query.niveau = level.trim(); // 'niveau' exists in IFormation
    }

    const totalFormations = await Formation.countDocuments(query);
    const formations = await Formation.find(query)
      .populate('formateurs', 'firstName lastName email') // Populate formateur details
      .populate('centreFormation', 'nom adresse') // Populate centre details
      // .populate('sessions') // If sessions are separate and need to be linked
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 }) // Default sort
      .exec();

    return {
      data: formations,
      page,
      limit,
      total: totalFormations,
      totalPages: Math.ceil(totalFormations / limit),
    };
  }

  public async findById(id: string): Promise<(IFormation & { sessions?: ISession[] }) | null> {
    const formation = await Formation.findById(id)
      .populate('formateurs', 'firstName lastName email profilePicture') // Added profilePicture
      .populate('centreFormation', 'nom adresse')
      .exec();

    if (!formation) {
      return null;
    }

    // Fetch associated sessions
    const sessions = await Session.find({ formation: formation._id })
      .populate('formateur', 'firstName lastName email profilePicture') // Populate formateur for each session
      .sort({ dateDebut: 1 }) // Sort sessions by start date
      .exec();

    // Combine formation with its sessions
    // Use toObject() or spread to make a plain JS object if we want to add properties
    const formationObject = formation.toObject();
    formationObject.sessions = sessions;

    return formationObject as (IFormation & { sessions?: ISession[] });
  }

  public async create(data: Partial<IFormation>): Promise<IFormation> {
    // Add any necessary validation or data transformation before saving
    const newFormation = new Formation(data);
    return newFormation.save();
  }

  public async update(id: string, data: Partial<IFormation>): Promise<IFormation | null> {
    // Add any necessary validation or data transformation
    // { new: true } returns the modified document rather than the original
    return Formation.findByIdAndUpdate(id, data, { new: true }).exec();
  }

  public async delete(id: string): Promise<IFormation | null> {
    // findByIdAndDelete will return the deleted document
    return Formation.findByIdAndDelete(id).exec();
  }
}
