import { Router } from 'express';
import * as controller from '../controllers/companyController.js';
import { validate } from '../middleware/validate.js';
import { companyListSchema, companySchema, idSchema } from '../validation/schemas.js';

const router = Router();
router.get('/', validate(companyListSchema), controller.list);
router.post('/', validate(companySchema), controller.create);
router.get('/:id', validate(idSchema), controller.get);
export default router;
