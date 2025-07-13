import { Request, Response, NextFunction } from 'express';

const errorMiddleware = (err: any, req: Request, res: Response, next: NextFunction) => {
  console.error('Erreur Express:', err);

    res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Erreur interne du serveur',
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
  });
};

export default errorMiddleware; 