import { Router } from 'express';
import * as AuthCtrl from '../controller/auth.controlller';
import { SchemaValidator } from '../../config/base.validate';
import { UserSchema } from '../dto/user.dto';
import { BodyLoggin, isAutorized } from '../middlewares/auth.midd';

const router: Router = Router();

router.post(
    '/signin',
    SchemaValidator(BodyLoggin),
    isAutorized,
    AuthCtrl.singIn
);

router.post('/signup', SchemaValidator(UserSchema), AuthCtrl.singUp);

export default router;
