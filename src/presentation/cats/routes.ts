import { Router } from 'express';
import { BreedDatasourceImpl, BreedRepositoryImpl } from '../../infrastructure';
import { CatController } from './controller';

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
    
    return router;
  }


}