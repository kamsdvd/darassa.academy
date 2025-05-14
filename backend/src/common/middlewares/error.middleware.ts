import { Request, Response, NextFunction } from 'express';

const errorMiddleware = (err: any, req: Request, res: Response, next: NextFunction) => {
  console.error('Erreur Express:', err);

  // Gestion des erreurs de duplication MongoDB (code 11000)
  if (err.code === 11000) {
    return res.status(409).json({
      success: false,
      message: 'Conflit de duplication en base de données',
      fields: Object.keys(err.keyValue),
      keyValue: err.keyValue
    });
  }

  // Gestion des erreurs de validation Mongoose
  if (err.name === 'ValidationError') {
    return res.status(400).json({
      success: false,
      message: 'Erreur de validation en base de données',
      errors: Object.values(err.errors).map((e: any) => ({ field: e.path, message: e.message }))
    });
  }

  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Erreur interne du serveur',
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
  });
};

export default errorMiddleware; 