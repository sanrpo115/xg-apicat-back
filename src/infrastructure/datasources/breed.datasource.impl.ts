import { BreedById, BreedDatasource, BreedEntity, CustomError } from "../../domain";
import { CatService } from "../services/cat.service";

export class BreedDatasourceImpl implements BreedDatasource {

  constructor (
    private readonly catService: CatService = new CatService()
  ) { }

  async getBreeds(): Promise <BreedEntity[]> {
    try {
      const response = await this.catService.getBreeds();
      return response;
    } catch (err) {
      console.log(err);
      throw CustomError.internalServer();
    }
  }

  async searchBreeds(name: string, img: string): Promise<BreedEntity> {
    try {
      const response = await this.catService.searchBreeds(name, img);
      return response;
    } catch (err) {
      throw CustomError.internalServer();
    }
  }
  
  async getBreedById(breed_id: string): Promise<BreedById> {
    try {
      const response = await this.catService.getBreedById(breed_id);
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