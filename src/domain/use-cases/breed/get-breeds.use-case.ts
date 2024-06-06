import { BreedById, BreedEntity, BreedRepository } from '../..';

export class BreedUseCases {
  constructor(private readonly breedRepository: BreedRepository) {}

  async getBreeds(): Promise<BreedEntity[]> {
    return this.breedRepository.getBreeds();
  }

  async searchBreeds(name: string, img: string): Promise<BreedEntity | null> {
    return this.breedRepository.searchBreeds(name, img);
  }
  
  async getBreedById(id: string): Promise<BreedById> {
    return this.breedRepository.getBreedById(id);
  }

}