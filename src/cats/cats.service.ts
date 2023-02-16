import * as fs from "fs";
import { ICat } from "./cats";
const fetch = require("node-fetch").default;
// import httpRequest from "../../utils/httpRequest"; 

export class CatsService {
  filePath: string;
  static gIndex: number = 0;
  static getFreshIndex(): number {
    CatsService.gIndex += 1;
    return CatsService.gIndex;
  }
  constructor(filePath: string) {
    this.filePath = filePath;
  }

  public async getCats() {
    let data = await fs.readFileSync(this.filePath);
    return JSON.parse(data.toString());
  }

  public async addCat(cat: ICat) {
    cat.id = CatsService.getFreshIndex();
    cat.imageLink = await this._reolveCatImageLink(
      "https://aws.random.cat/meow"
    );

    let cats = await this.getCats();
    cats.push(cat);
    fs.writeFileSync(this.filePath, JSON.stringify(cats));
    return { message: `cat with id ${cat.id} has been added` };
  }

  public async deleteCat(id: number) {
    let cats = await this.getCats();
    cats = cats.filter((cat: any) => cat.id !== id);
    fs.writeFileSync(this.filePath, JSON.stringify(cats));

    return { message: `cat with id ${id} has been deleted` };
  }

  public async updateCat(id: number, newCat: ICat) {
    let cats = await this.getCats();
    cats = cats.map((cat: ICat) => {
      if (cat.id === id) {
        return newCat;
      }
      return cat;
    });
    fs.writeFileSync(this.filePath, JSON.stringify(cats));
     return { message: `cat with id ${newCat.id} has been updated` };

  }

  private async _reolveCatImageLink(imageLink: string) {
    return await fetch(imageLink)
      .then((res: any) => res.json())
      .then((data: any) => data.file);
  }
}
