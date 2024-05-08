import { Router } from 'express';
import { TestController } from '../controllers/test.controller'

export default class TestRoutes {
    static get routes(): Router {
        const router = Router();

        router.get('/test', async (_req, res) => {
            const controller = new TestController()
            const response = await controller.test()
            return res.send(response)
        })

        return router;
    }
}