import * as fs from "fs";
import { ICat } from "./cats.types";
const fetch = require("node-fetch").default;

export class Cats {
  filePath: string;
  static gIndex: number = 0;
  static getFreshIndex(): number {
    Cats.gIndex += 1;
    return Cats.gIndex;
  }
  constructor(filePath: string) {
    this.filePath = filePath;
  }

  public async getCats() {
    let data = await fs.readFileSync(this.filePath);
    return JSON.parse(data.toString());
  }

  public async addCat(cat: ICat) {
    cat.id = Cats.getFreshIndex();
    cat.imageLink = await this._reolveCatImageLink(
      "https://aws.random.cat/meow"
    );

    let cats = await this.getCats();
    cats.push(cat);
    fs.writeFileSync(this.filePath, JSON.stringify(cats));
    return cat;
  }

  public async deleteCat(id: number) {
    let cats = await this.getCats();
    cats = cats.filter((cat: any) => cat.id !== id);
    fs.writeFileSync(this.filePath, JSON.stringify(cats));
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
  }

  private async _reolveCatImageLink(imageLink: string) {
    return await fetch(imageLink)
      .then((res: any) => res.json())
      .then((data: any) => data.file);
  }
}
