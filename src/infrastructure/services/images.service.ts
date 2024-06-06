import { envs } from "../../config";

export class ImagesService {
  
  private readonly url: string = envs.API_URL;
  private readonly api_key: string = envs.API_KEY;

  async getImagesByBreedId(image_id: string) {
    const response = await fetch(`${this.url}/images/${image_id}`, {
      headers: {
        'x-api-key': this.api_key,
        'Content-Type': 'application/json'
      }
    });
    if (!response.ok) {
      let msg = `Error fetching images by breeds: ID "${image_id}" don't exists`;
      console.log(msg)
      throw new Error(msg);
    }

    const data = await response.json();
    return data;
  }


}