import { Router } from 'express';
import { ACSController } from '../controllers/acs.controller.';

export default class ACSRoutes {
    static get routes(): Router {
        const router = Router();
        const ctl = new ACSController()

        // Cardholder APIs
        router.post('/cardholders', ctl.createCardholder)
        router.patch('/cardholers/{cardholderId}', ctl.updateCardholder)
        router.delete('/cardholders/{carholderId}', ctl.removeCardholder)
        router.post('/cardholders/{carholderId}/cards', ctl.addCard2Cardholder)
        router.delete('/cardholders/{carholderId}/cards/{cardId}', ctl.removeCardFromCardholder)
        router.get('/cardholders/{carholderId}/', ctl.activateCardholder)

        return router;
    }
}