import { Request, Response } from 'express';
import { ImagesService } from "../../infrastructure/";
import { ImagesRepository } from '../../domain';

export class ImagesController {
  constructor(
    private readonly imagesRepository: ImagesRepository
  ) {}

  getImagesByBreedId = async (req: Request, res: Response): Promise<any> => {
    try {
      const response = await this.imagesRepository.getImagesByBreedId(req.params.image_id);
      res.json(response);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  };

}