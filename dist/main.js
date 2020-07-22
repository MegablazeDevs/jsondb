"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
class Database {
    constructor(folder, name) {
        this.filePath = `${folder}/${name}.json`;
    }
    write(data) {
        try {
            fs.writeFileSync(this.filePath, JSON.stringify(data, null, 2));
            console.log("JSON was written to file.");
        }
        catch (error) {
            console.error(error);
        }
    }
    read(key) {
        let data;
        try {
            data = JSON.parse(fs.readFileSync(this.filePath, "utf8"))[key];
        }
        catch (error) {
            if (error instanceof TypeError) {
                throw `Key "${key}" does not exist.`;
            }
            else {
                data = error;
            }
        }
        return data;
    }
}
const db = new Database(__dirname, "testfile");
db.write(JSON.parse('{"hey": "this is a test"}'));
console.log(`Key content: ${db.read("what?")}`);
//# sourceMappingURL=main.js.map