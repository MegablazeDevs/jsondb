"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Database = void 0;
const fs = require("fs");
class Database {
    constructor(folder, name) {
        this.filePath = `${folder}/${name}.json`;
    }
    write(key, data) {
        try {
            const prelimData = JSON.parse(fs.readFileSync(this.filePath, "utf8"));
            prelimData[key] = data;
            fs.writeFileSync(this.filePath, JSON.stringify(prelimData, null, 2));
        }
        catch (error) {
            console.error(error);
        }
    }
    overwrite(data) {
        try {
            fs.writeFileSync(this.filePath, JSON.stringify(data, null, 2));
        }
        catch (error) {
            console.error(error);
        }
    }
    read(key) {
        let data;
        try {
            if (key) {
                data = JSON.parse(fs.readFileSync(this.filePath, "utf8"))[key];
            }
            else {
                data = JSON.parse(fs.readFileSync(this.filePath, "utf8"));
            }
        }
        catch (error) {
            if (error instanceof TypeError) {
                throw `Key "${key}" does not exist.`;
            }
            else {
                throw error;
            }
        }
        return data;
    }
}
exports.Database = Database;
//# sourceMappingURL=main.js.map