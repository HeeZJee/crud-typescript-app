import httpRequest from "../../utils/httpRequest";
import { CatsService } from "./cats.service";
import { ICat } from "./cats";

export class CatsController {
  constructor(filePath: string) {
    this.filePath = filePath;
  }

  private filePath: string;
  private httpRequest: httpRequest = new httpRequest();
  
public async getCats() {
        const catsService: CatsService = new CatsService(this.filePath);
        return await catsService.getCats();
    }
    
    public async addCat(cat: ICat) {
      const catsService: CatsService = new CatsService(this.filePath);
    return await catsService.addCat(cat);
  }

//   public async deleteCat(id: number) {
//     return await this.catsService.deleteCat(id);
//   }

//   public async updateCat(id: number, newCat: ICat) {
//     return await this.catsService.updateCat(id, newCat);
//   }
}
