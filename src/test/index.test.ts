import { Database } from "../main";
import { assert } from "console";
import { unlink } from "fs";

const db = new Database(__dirname, "testfile");

const testData = {
  clientID: "testdata-client-id",
  clientSecret: "testdata-client-secret",
  token: "testdata-client-oauth-token",
};

try {
  db.overwrite(testData);

  let auth = db.read();

  assert(JSON.stringify(testData) === JSON.stringify(auth));

  db.write("token", "new_token");

  auth = db.read();

  //eslint-disable-next-line @typescript-eslint/ban-ts-ignore
  // @ts-ignore
  assert(auth.token === "new_token");

  console.log("Test passed. Removing testfile...");
  try {
    unlink(__dirname + "/" + "testfile.json", () => {
      console.log("Successfully removed testfile.");
    });
  } catch (error) {
    console.error("Failed to remove testfile. Reason:", error);
  }
} catch (error) {
  console.error("Test failed. Reason:", error);
}
