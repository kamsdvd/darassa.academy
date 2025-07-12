import { Request, Response } from 'express';
import { plainToClass } from 'class-transformer';
import { validate, ValidationError } from 'class-validator';

import { listCourses, createCourse, updateCourse, deleteCourse } from './course.service';
import { Course } from './course.model';


// Ajoute ici la logique de validation si besoin


export const getAllCourses = (req: Request, res: Response) => {
  // ...utiliser listCourses...
};

export const getCourseById = (req: Request, res: Response) => {
  // ...implémentation...
};

export const createCourseHandler = (req: Request, res: Response) => {
  // ...utiliser createCourse...
};

export const updateCourseHandler = (req: Request, res: Response) => {
  // ...utiliser updateCourse...
};

export const deleteCourseHandler = (req: Request, res: Response) => {
  // ...utiliser deleteCourse...
};
