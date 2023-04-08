import { Router } from 'express';
import * as UserCtrl from '../controller/user.controller';
import { SchemaValidator } from '../../config/base.validate';
import { UserSchema } from '../dto/user.dto';

const router: Router = Router();

router.get('/users', UserCtrl.getUsers);
router.get('/user/:id', UserCtrl.getUser);
router.post('/createUser', SchemaValidator(UserSchema), UserCtrl.createUser);
router.put('/user/:id', UserCtrl.updateUser);
router.delete('/user/:id', UserCtrl.deleteUser);

export default router;
