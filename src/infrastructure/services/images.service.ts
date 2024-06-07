import { envs } from "../../config";

export class ImagesService {
  
  private readonly url: string = envs.API_URL;

  async getImagesByBreedId(image_id: string) {
    const response = await fetch(`${this.url}/images/${image_id}`);
    if (!response.ok) {
      let msg = `Error fetching images by breeds ID: "${image_id}" don't exists`;
      throw ({ status: response.status, message: msg, endpoint: response.url });
    }

    const data = await response.json();
    return data;
  }


}