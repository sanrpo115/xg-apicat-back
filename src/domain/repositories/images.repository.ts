import { ImagesEntity } from "../entities/images.entity";

export abstract class ImagesRepository {
  abstract getImagesByBreedId(id: string): Promise<ImagesEntity>
}