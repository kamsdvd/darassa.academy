import { PrismaClient, Formation, Session } from '../generated/prisma';
const prisma = new PrismaClient();

// Utility for pagination if not using a library
interface PaginatedResult<T> {
  data: T[];
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export class FormationService {
  public async findAll(page: number = 1, limit: number = 10, category?: string, level?: string): Promise<PaginatedResult<Formation>> {
    const skip = (page - 1) * limit;

    const where: any = {};
    if (category && typeof category === 'string' && category.trim() !== '') {
      where.category = category.trim();
    }
    if (level && typeof level === 'string' && level.trim() !== '') {
      where.niveau = level.trim();
    }
    const totalFormations = await prisma.formation.count({ where });
    const formations = await prisma.formation.findMany({
      where,
      skip,
      take: limit,
      orderBy: { createdAt: 'desc' },
      include: {
        formateurs: true,
        centreFormation: true,
      },
    });
    return {
      data: formations,
      page,
      limit,
      total: totalFormations,
      totalPages: Math.ceil(totalFormations / limit),
    };
  }

  public async findById(id: string): Promise<{ formation: Formation, sessions: Session[] } | null> {
    const formation = await prisma.formation.findUnique({
      where: { id },
      include: {
        formateurs: true,
        centreFormation: true,
      },
    });
    if (!formation) {
      return null;
    }
    const sessions = await prisma.session.findMany({
      where: { formationId: id },
      include: { formateur: true },
      orderBy: { dateDebut: 'asc' },
    });
    return { formation, sessions };
  }

  public async create(data: Formation): Promise<Formation> {
    // Add any necessary validation or data transformation before saving
    const newFormation = await prisma.formation.create({ data });
    return newFormation;
  }

  public async update(id: string, data: Partial<Formation>): Promise<Formation | null> {
    // Add any necessary validation or data transformation
    // { new: true } returns the modified document rather than the original
    return prisma.formation.update({ where: { id }, data });
  }

  public async delete(id: string): Promise<Formation | null> {
    // findByIdAndDelete will return the deleted document
    return prisma.formation.delete({ where: { id } });
  }
}

