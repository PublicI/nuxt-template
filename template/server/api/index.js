import { Router } from 'express';

import example from './example';

const router = Router();

// Add EXAMPLE Routes
router.use(example);

export default router;
