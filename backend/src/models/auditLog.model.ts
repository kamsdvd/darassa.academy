import mongoose, { Schema, Document, Types } from 'mongoose';

export interface IAuditLog extends Document {
  userId: Types.ObjectId;
  action: string;
  resource: string;
  resourceId?: string;
  details: any;
  ip: string;
  userAgent: string;
  timestamp: Date;
}

const auditLogSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  action: {
    type: String,
    required: true,
    enum: ['LOGIN', 'LOGOUT', 'CREATE', 'UPDATE', 'DELETE', 'PASSWORD_RESET', 'EMAIL_VERIFICATION']
  },
  resource: {
    type: String,
    required: true
  },
  resourceId: String,
  details: {
    type: Schema.Types.Mixed
  },
  ip: String,
  userAgent: String,
  timestamp: {
    type: Date,
    default: Date.now
  }
});

// Index pour la recherche rapide
auditLogSchema.index({ userId: 1, timestamp: -1 });
auditLogSchema.index({ action: 1, timestamp: -1 });
auditLogSchema.index({ resource: 1, resourceId: 1 });

export default mongoose.model<IAuditLog>('AuditLog', auditLogSchema); 