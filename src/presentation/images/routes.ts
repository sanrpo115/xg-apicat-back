import { Router } from "express";
import { ImagesController } from "./controller";

export class ImagesRoutes {
  static get routes(): Router {
    const router = Router();

    // const datasource = new AuthDatasourceImpl();
    // const authRepository = new AuthRepositoryImpl(datasource);

    // const authController = new AuthController(authRepository);
    const imagesController = new ImagesController();

    console.debug('[ImagesRoute::create] Creating Images route');

    router.get('/imagesbybreedid/:image_id', imagesController.getImagesByBreedId )
    
    // router.get('/', [AuthMiddleware.validateJWT], authController.getUsers );

    return router;
  }


}