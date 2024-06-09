import { Request, Response } from 'express';
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
      res.status(error.statusCode).json({ error: error.message });
    }
  };

}