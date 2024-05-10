import { Router } from 'express';
import { EventController } from '../controllers/events.controller';
import { EventType } from '../../domain/entities/event';

export default class EventsRoutes {
    static get routes(): Router {
        const router = Router();
        const controller = new EventController()

        router.get('/live', async (req, res) => {
            // const eventType: EventType = req.
            // const cardholderIds: string[] = req.params.cardholderIds.
            // const response = await controller.getLiveEvents(eventType, cardholderIds)
            // return res.send(response)
        })

        router.get('/reporting', async (req, res) => {
            // const eventType: string = req.par
            // const response = await controller.getLiveEvents()
            // return res.send(response)
        })


        return router;
    }
}