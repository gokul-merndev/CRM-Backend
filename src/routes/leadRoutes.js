import { Router } from 'express';
import * as controller from '../controllers/leadController.js';
import { validate } from '../middleware/validate.js';
import { createLeadSchema, idSchema, leadListSchema, updateLeadSchema } from '../validation/schemas.js';

const router = Router();
router.get('/', validate(leadListSchema), controller.list);
router.post('/', validate(createLeadSchema), controller.create);
router.get('/:id', validate(idSchema), controller.get);
router.patch('/:id', validate(updateLeadSchema), controller.update);
router.delete('/:id', validate(idSchema), controller.remove);
export default router;
