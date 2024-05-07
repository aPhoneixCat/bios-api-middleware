// src/app.ts

import { envs } from './config/env';
import { AppRoutes } from './api/routes/routes' 
import { Server } from './server';

(() => {
    main();
})();

function main(): void {
    const server = new Server({
        port: envs.PORT,
        apiPrefix: envs.API_PREFIX,
        routes: AppRoutes.routes
    });
    void server.start();
}