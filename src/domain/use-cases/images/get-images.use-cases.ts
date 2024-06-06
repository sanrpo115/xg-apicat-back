import { ImagesEntity } from "../../entities/images.entity";
import { ImagesRepository } from "../..";

export class ImagesUseCases {
  constructor(private readonly imagesRepository: ImagesRepository) {}

  async getImagesByBreedId(id: string): Promise<ImagesEntity> {
    return this.imagesRepository.getImagesByBreedId(id);
  }

}