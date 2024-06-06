import { Request, Response } from 'express';
import { ImagesService } from "../../infrastructure/";

export class ImagesController {
  constructor(private readonly imagesServices: ImagesService = new ImagesService()) {}

  getImagesByBreedId = async (req: Request, res: Response): Promise<any> => {
    try {
      const breed = await this.imagesServices.getImagesByBreedId(req.params.image_id);
      res.json(breed);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  };

}