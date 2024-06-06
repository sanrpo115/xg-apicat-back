import { envs } from "../../config";

export class CatService {
  
  private readonly url: string = envs.API_URL;
  private readonly api_key: string = envs.API_KEY;

  async getBreeds()  {
    const response = await fetch(`${this.url}/breeds`, {
      headers: {
        'x-api-key': this.api_key,
        'Content-Type': 'application/json'
      }
    });

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
    const response = await fetch(`${this.url}/breeds/${breed_id}`, {
      headers: {
        'x-api-key': this.api_key,
        'Content-Type': 'application/json'
      }
    });
    if (!response.ok) {
      let msg = `Error fetching breeds: ID "${breed_id}" don't exists`;
      console.log(msg)
      throw new Error(msg);
    }

    const data = await response.json();
    const filteredData = data.id === breed_id ? { id: data.id, name: data.name } : { id: null, name: null};
    return filteredData;
  }

  async searchBreeds(q: string, image_id: string) {
    const response = await fetch(`${this.url}/breeds/search?q=${q}&attach_image=${image_id}`);
    return response.json();
  }
}