import { Router } from 'express';
import TestRoutes from './test.routes'

// global routing
export class AppRoutes {
    static get routes(): Router {
        const router = Router();

        // Test rest api
        router.use('/', TestRoutes.routes);

        return router;
    }
}