import { BreedById, BreedDatasource, BreedEntity, BreedRepository } from "../../domain";

export class BreedRepositoryImpl implements BreedRepository {
  constructor(private readonly breedDataSource: BreedDatasource) {}
  
  getBreeds(): Promise<BreedEntity[]> {
    return this.breedDataSource.getBreeds();
  }
  
  searchBreeds(name: string, img: string): Promise<BreedEntity> {
    return this.breedDataSource.searchBreeds(name, img);
  }
  
  getBreedById(id: string): Promise<BreedById> {
    return this.breedDataSource.getBreedById(id);
  }

}