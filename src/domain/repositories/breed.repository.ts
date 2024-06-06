import { BreedById, BreedEntity } from "..";

export abstract class BreedRepository {
  abstract getBreeds(): Promise<BreedEntity[]>;
  abstract searchBreeds(name: string, img: string): Promise<BreedEntity | null>
  abstract getBreedById(id: string): Promise<BreedById>
}