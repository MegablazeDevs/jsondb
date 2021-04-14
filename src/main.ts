import * as fs from "fs";

export class Database {
  filePath: string;
  constructor(folder: fs.PathLike, name: string) {
    this.filePath = `${folder}/${name}.json`;
  }
  write(key: string, data: JSON | string): void {
    try {
      const prelimData = JSON.parse(fs.readFileSync(this.filePath, "utf8"));
      prelimData[key] = data;
      fs.writeFileSync(this.filePath, JSON.stringify(prelimData, null, 2));
    } catch (error) {
      console.error(error);
    }
  }
  overwrite(data: JSON | object): void {
    try {
      fs.writeFileSync(this.filePath, JSON.stringify(data, null, 2));
    } catch (error) {
      console.error(error);
    }
  }
  read(key?: string): string | object {
    let data;
    try {
      if (key) {
        data = JSON.parse(fs.readFileSync(this.filePath, "utf8"))[key];
      } else {
        data = JSON.parse(fs.readFileSync(this.filePath, "utf8"));
      }
    } catch (error) {
      if (error instanceof TypeError) {
        throw `Key "${key}" does not exist.`;
      } else {
        throw error;
      }
    }
    return data;
  }
}
