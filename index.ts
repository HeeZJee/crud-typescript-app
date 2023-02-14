import * as fs from "fs";
import { Cats } from "./src/cats/index";
import path from "path";

const filePath = path.join(__dirname, "./utils/cats.json");

const cats = new Cats(filePath);

cats.addCat({
  imageLink: "",
  altText: "A cat",
  codeNames: ["cat"],
})

cats.updateCat(2,{
  imageLink: "",
  altText: "A cat 2",
  codeNames: ["cat 2"],
});

// cats.deleteCat(1)

cats.getCats().then((data) => {
  console.log(data);
});
