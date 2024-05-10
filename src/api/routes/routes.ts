import { Router } from 'express';
import EventsRoutes from './events.routes';
import QRCodeRoutes from './qrcode.routes';

// global routing
export class AppRoutes {
    static get routes(): Router {
        const router = Router();

        // rest api
        router.use('/events', EventsRoutes.routes);
        router.use('/qrcode', QRCodeRoutes.routes);

        return router;
    }
}