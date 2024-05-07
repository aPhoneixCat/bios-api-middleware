import { Router } from 'express';

export class QRCodeRoutes {
 static get routes(): Router {
  const router = Router();

  router.get('/', controller.getAll);

  // rest of operations
  // ...

  return router;
 }
}