import { envs } from "../../config";

export class CatService {
  
  private readonly url: string = envs.API_URL;

  async getBreeds()  {
    const response = await fetch(`${this.url}/breeds`);

    if (!response.ok) {
      throw new Error(`Error fetching breeds: ${response.statusText}`);
    }

    const data = await response.json();
    const filteredData = data.map((breed: { id: string, name: string }) => ({
      id: breed.id,
      name: breed.name
    }));

    return filteredData;
  }

  async getBreedById(breed_id: string) {
    const response = await fetch(`${this.url}/breeds/${breed_id}`);
    if (!response.ok) {
      let msg = `Error: ID "${breed_id}" don't exists`;
      throw ({ status: response.status, message: msg, endpoint: response.url });
    }

    const data = await response.json();
    const filteredData = data.id === breed_id ? data : { statusCode: 404, message: 'Data not available'};
    return filteredData;
  }

  async searchBreeds(q: string, image_id: string) {
    const response = await fetch(`${this.url}/breeds/search?q=${q}&attach_image=${image_id}`);
    return response.json();
  }
}