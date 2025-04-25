import AuditLog, { IAuditLog } from '../models/auditLog.model';
import { Types } from 'mongoose';

class AuditService {
  private static instance: AuditService;

  private constructor() {}

  public static getInstance(): AuditService {
    if (!AuditService.instance) {
      AuditService.instance = new AuditService();
    }
    return AuditService.instance;
  }

  public async logAction(data: {
    userId: Types.ObjectId;
    action: string;
    resource: string;
    resourceId?: string;
    details?: any;
    ip: string;
    userAgent: string;
  }): Promise<IAuditLog> {
    try {
      const log = await AuditLog.create({
        ...data,
        timestamp: new Date()
      });

      return log;
    } catch (error) {
      console.error('Erreur lors de la création du log d\'audit:', error);
      throw error;
    }
  }

  public async getUserActivity(userId: Types.ObjectId, options: {
    limit?: number;
    skip?: number;
    startDate?: Date;
    endDate?: Date;
  } = {}): Promise<IAuditLog[]> {
    const query: any = { userId };

    if (options.startDate || options.endDate) {
      query.timestamp = {};
      if (options.startDate) query.timestamp.$gte = options.startDate;
      if (options.endDate) query.timestamp.$lte = options.endDate;
    }

    return AuditLog.find(query)
      .sort({ timestamp: -1 })
      .skip(options.skip || 0)
      .limit(options.limit || 50);
  }

  public async getResourceActivity(resource: string, resourceId: string): Promise<IAuditLog[]> {
    return AuditLog.find({ resource, resourceId })
      .sort({ timestamp: -1 })
      .limit(100);
  }

  public async getActionStats(startDate: Date, endDate: Date): Promise<any> {
    return AuditLog.aggregate([
      {
        $match: {
          timestamp: {
            $gte: startDate,
            $lte: endDate
          }
        }
      },
      {
        $group: {
          _id: '$action',
          count: { $sum: 1 }
        }
      }
    ]);
  }
}

export default AuditService.getInstance(); 