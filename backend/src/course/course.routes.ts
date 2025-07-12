import { Router } from 'express';
import { getAllCourses, getCourseById, createCourseHandler, updateCourseHandler, deleteCourseHandler } from './course.controller';

const router = Router();

router.get('/', getAllCourses);
router.get('/:id', getCourseById);
router.post('/', createCourseHandler);
router.put('/:id', updateCourseHandler);
router.delete('/:id', deleteCourseHandler);

export default router;
