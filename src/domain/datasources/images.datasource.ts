import { ImagesEntity } from "../entities/images.entity";

export abstract class ImagesDatasource {

  abstract getImagesByBreedId(image_id: string):Promise<ImagesEntity>

}
