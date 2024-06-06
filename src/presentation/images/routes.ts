import { Router } from "express";
import { ImagesController } from "./controller";
import { ImagesDatasourceImpl } from "../../infrastructure/datasources/images.datasource.impl";
import { ImagesRepositoryImpl } from "../../infrastructure";

export class ImagesRoutes {
  static get routes(): Router {
    const router = Router();

    const datasource = new ImagesDatasourceImpl();
    const imagesRepository = new ImagesRepositoryImpl(datasource);

    const imagesController = new ImagesController(imagesRepository);

    console.debug('[ImagesRoute::create] Creating Images route');

    router.get('/imagesbybreedid/:image_id', imagesController.getImagesByBreedId )
    
    // router.get('/', [AuthMiddleware.validateJWT], authController.getUsers );

    return router;
  }


}