"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const main_1 = require("../main");
const console_1 = require("console");
const fs_1 = require("fs");
const db = new main_1.Database(__dirname, "testfile");
const testData = {
    clientID: "testdata-client-id",
    clientSecret: "testdata-client-secret",
    token: "testdata-client-oauth-token",
};
try {
    db.overwrite(testData);
    let auth = db.read();
    console_1.assert(JSON.stringify(testData) === JSON.stringify(auth));
    db.write("token", "new_token");
    auth = db.read();
    //eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
    console_1.assert(auth.token === "new_token");
    console.log("Test passed. Removing testfile...");
    try {
        fs_1.unlink(__dirname + "/" + "testfile.json", () => {
            console.log("Successfully removed testfile.");
        });
    }
    catch (error) {
        console.error("Failed to remove testfile. Reason:", error);
    }
}
catch (error) {
    console.error("Test failed. Reason:", error);
}
//# sourceMappingURL=index.test.js.map