// import httpRequest from "../../utils/httpRequest";
import { CatsService } from "./cats.service";
import { ICat } from "./cats";
export class CatsController {
  constructor(filePath: string) {
    this.filePath = filePath;
  }

  private filePath: string;

  public async getCats() {
    const catsService: CatsService = new CatsService(this.filePath);
    return await catsService.getCats();
  }

  public async addCat(cat: ICat) {
    const catsService: CatsService = new CatsService(this.filePath);
    return await catsService.addCat(cat);
  }

  public async deleteCat(id: number) {
    const catsService: CatsService = new CatsService(this.filePath);
    return await catsService.deleteCat(id);
  }

  public async updateCat(id: number, newCat: ICat) {
    const catsService: CatsService = new CatsService(this.filePath);
    return await catsService.updateCat(id, newCat);
  }
}
