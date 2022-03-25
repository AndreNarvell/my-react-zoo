import { IAnimal } from "../models/IAnimal";

//Function getting LS
export function getLS(key: string) {
  return JSON.parse(localStorage.getItem(key)!) || [];
}

//Function setting LS
export function setLS(key: string, value: IAnimal[]) {
  localStorage.setItem(key, JSON.stringify(value));
}
