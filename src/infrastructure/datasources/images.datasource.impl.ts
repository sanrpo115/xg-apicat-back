import { ImagesService } from "..";
import { CustomError, ImagesDatasource, ImagesEntity } from "../../domain";

export class ImagesDatasourceImpl implements ImagesDatasource {

  constructor (
    private readonly imagesService: ImagesService = new ImagesService()
  ) { }

  async getImagesByBreedId(image_id: string): Promise <ImagesEntity> {
    try {
      const response = await this.imagesService.getImagesByBreedId(image_id);
      return response;
    } catch (err: any) {
      console.error(`Error:`, err);
      if (err.status === 400) {
        throw CustomError.badRequest(err.message);
      } else {
        throw CustomError.internalServer();
      }
    }
  }

}