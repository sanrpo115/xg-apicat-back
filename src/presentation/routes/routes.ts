import { Router } from 'express';
import { AuthRoutes } from '../auth/routes';
import { CatRoutes } from '../cats/routes';
import { ImagesRoutes } from '../images/routes';

export class AppRoutes {
  static get routes(): Router {
    const router = Router();

    console.debug('[IndexRoute::create] Creating index route');

    router.use('/api/auth', AuthRoutes.routes)
    router.use('/api', CatRoutes.routes);
    router.use('/api/images', ImagesRoutes.routes);

    // router.use('/api/imagesbybreedid');

    return router;
  }
}