import { Router } from 'express';
import EventsRoutes from './events.route';
import ACSRoutes from './acs.route';

// global routing
export class AppRoutes {
    static get routes(): Router {
        const router = Router();

        // rest api
        router.use('/events', EventsRoutes.routes);
        router.use('/acs', ACSRoutes.routes);

        return router;
    }
}