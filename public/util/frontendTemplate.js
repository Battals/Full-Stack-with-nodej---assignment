import { promises as fsPromises } from "fs";

export default async function frontendTemplate(pagePath) {
  const fileContent = await fsPromises.readFile(pagePath, "utf-8");
  return fileContent;
}
