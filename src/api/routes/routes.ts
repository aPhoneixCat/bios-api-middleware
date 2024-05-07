import { Router } from 'express';

// global routing
export class AppRoutes {
    static get routes(): Router {
        const router = Router();

        router.get('', () => {
            console.log('/api/v1')
        });
        return router;
    }
}