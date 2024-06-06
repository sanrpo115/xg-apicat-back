import { Request, Response } from 'express';
import { CatService } from "../../infrastructure/";
import { BreedRepository } from '../../domain';

export class CatController {
  constructor(
    private readonly breedRepository: BreedRepository,
    private readonly catService: CatService = new CatService()
  ) {}
  // constructor(private catService: CatService = new CatService()) {}

  // getBreeds = async (_: Request, res: Response ): Promise<any> => {
  //   try {
  //     const breeds = await this.catService.getBreeds();
  //     res.json(breeds);
  //   } catch (error: any) {
  //     res.status(500).json({ error: error.message });
  //   }
  // }
  
  getBreeds = async (_: Request, res: Response ): Promise<any> => {
    try {
      const breeds = await this.breedRepository.getBreeds()
      console.log(breeds.length);
      res.json(breeds);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  getBreedById = async (req: Request, res: Response): Promise<any> => {
    try {
      const breed = await this.breedRepository.getBreedById(req.params.breed_id);
      console.log(breed);
      res.json(breed);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  };
  
  searchBreeds = async (req: Request, res: Response): Promise<any> => {
    try {
      const name: string = req.query.q as string;
      const img: string = req.query.attach_image as string;

      const data = await this.breedRepository.searchBreeds(name, img);
      res.json(data);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  // getBreedById = async (req: Request, res: Response): Promise<any> => {
  //   try {
  //     const breed = await this.catService.getBreedById(req.params.breed_id);
  //     console.log(breed);
  //     res.json(breed);
  //   } catch (error: any) {
  //     res.status(500).json({ error: error.message });
  //   }
  // };
  
  // searchBreeds = async (req: Request, res: Response): Promise<any> => {
  //   try {
  //     const name: string = req.query.q as string;
  //     const img: string = req.query.attach_image as string;

  //     const data = await this.catService.searchBreeds(name, img);
  //     res.json(data);
  //   } catch (error: any) {
  //     res.status(500).json({ error: error.message });
  //   }
  // }


}