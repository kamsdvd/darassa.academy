import { Router } from 'express';
import { register } from '../auth/auth.controller';

const router = Router();

// @route   POST api/auth/register
// @desc    Register a new user
// @access  Public
router.post('/register', register);

export default router;
