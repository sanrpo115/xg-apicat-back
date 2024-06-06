import { BreedEntity } from "./breed.entity";

export class ImagesEntity {

  constructor(
    public id: string,
    public url: string,
    public breeds: BreedEntity,
  ) {}

}