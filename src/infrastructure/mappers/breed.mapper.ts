import { BreedEntity } from "../../domain/entities/breed.entity";

export class BreedMapper {
  static catEntityFromObject(object: {[key: string]: any}) {
    const { _id, id, name, reference_image_id, temperament, origin, life_span, description } = object;

    return new BreedEntity(
      _id || id,
      name, 
      reference_image_id,
      temperament,
      origin,
      life_span,
      description
    );

  }
}