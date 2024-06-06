import { BreedById, BreedEntity } from "../entities/breed.entity";

export abstract class BreedDatasource {

  abstract getBreeds():Promise<BreedEntity[]>
  abstract searchBreeds(name: string, img: string):Promise<BreedEntity>
  abstract getBreedById(breed_id: string):Promise<BreedById>

}
