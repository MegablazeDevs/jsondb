/// <reference types="node" />
import * as fs from "fs";
export declare class Database {
    filePath: string;
    constructor(folder: fs.PathLike, name: string);
    write(key: string, data: JSON | string): void;
    overwrite(data: JSON | object): void;
    read(key?: string): string | object;
}
