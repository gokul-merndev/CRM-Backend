import { Router } from 'express';
import * as controller from '../controllers/taskController.js';
import { validate } from '../middleware/validate.js';
import { idSchema, taskSchema, taskStatusSchema } from '../validation/schemas.js';

const router = Router();
router.get('/', controller.list);
router.post('/', validate(taskSchema), controller.create);
router.get('/:id', validate(idSchema), controller.get);
router.patch('/:id/status', validate(taskStatusSchema), controller.updateStatus);
export default router;
