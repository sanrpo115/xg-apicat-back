import { Response, Request, Router } from 'express';
import { BreedDatasourceImpl, BreedRepositoryImpl } from '../../infrastructure';
import { AuthMiddleware } from '../middleware/auth.middleware';
import { CatController } from './controller';
import { AuthController } from '../auth/controller';

export class CatRoutes {
  static get routes(): Router {
    const router = Router();

    const datasource = new BreedDatasourceImpl();
    const breedRepository = new BreedRepositoryImpl(datasource);

    const catController = new CatController(breedRepository);

    console.debug('[BreedsRoute::create] Creating Breeds route');

    router.get('/breeds', catController.getBreeds )
    router.get('/breeds/search', catController.searchBreeds )
    router.get('/breeds/:breed_id', catController.getBreedById )
    
    // router.get('/', [AuthMiddleware.validateJWT], authController.getUsers );

    return router;
  }


}