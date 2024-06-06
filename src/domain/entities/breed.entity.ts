export class BreedEntity {
  constructor (
    public id: string, 
    public name: string, 
    public reference_image_id: string, 
    public temperament: string, 
    public origin: string, 
    public life_span: string, 
    public description: string
  ) {}
}

export class BreedById {
  constructor(
    public id: string,
    public name: string
  ) {}
}