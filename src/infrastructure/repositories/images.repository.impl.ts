import { ImagesDatasource, ImagesEntity, ImagesRepository } from "../../domain";

export class ImagesRepositoryImpl implements ImagesRepository {
  constructor(private readonly imagesDataSource: ImagesDatasource) {}
  
  getImagesByBreedId(id: string): Promise<ImagesEntity> {
    return this.imagesDataSource.getImagesByBreedId(id);
  }

}