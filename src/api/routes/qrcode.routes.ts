import { Router } from 'express';
import { QRCodeController } from '../controllers/qrcode.controller';
import { RegisterRequest } from '../../domain/dtos/qrcode';

export default class QRCodeRoutes {
    static get routes(): Router {
        const router = Router();
        const controller = new QRCodeController()

        router.post('/register_qrcode', async (req, res) => {
            const registerRequest: RegisterRequest  = {
                visitId: req.body.visitId
            }
            const response = await controller.registerVisit(registerRequest)
            return res.json(response)
        })

        router.get('/access_qrcode', async (req, res) => {
            const registerRequest: RegisterRequest  = {
                visitId: req.body.visitId
            }
            const response = await controller.registerVisit(registerRequest)
            return res.json(response)
        })

        router.get('/:visitId/dynamic_link', async (req, res) => {
            const registerRequest: RegisterRequest  = {
                visitId: req.params.visitId
            }
            const response = await controller.registerVisit(registerRequest)
            return res.json(response)
        })

        router.get('/dynamic_link/:visitId/activate', async (req, res) => {
            const registerRequest: RegisterRequest  = {
                visitId: req.params.visitId
            }
            const response = await controller.registerVisit(registerRequest)
            return res.json(response)
        })

        return router;
    }
}