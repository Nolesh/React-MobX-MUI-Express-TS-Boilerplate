import fs, { promises as fsp } from "fs";
import path from "path";

export async function createToDoListFile(filePath: string) {
  try {
    // Ensure the directory exists
    const dir = path.dirname(filePath);
    await fsp.mkdir(dir, { recursive: true });

    await fsp.access(filePath);
    console.log(`File "${filePath}" already exists.`);
  } catch (error: any) {
    if (error.code === "ENOENT") {
      // File does not exist, create it
      try {
        await fsp.writeFile(filePath, "[]");
        console.log(`File "${filePath}" has been created.`);
      } catch (writeError: any) {
        console.error(`Error creating file: ${writeError.message}`);
      }
    } else {
      console.error(`Error checking file: ${error}`);
    }
  }
}

export async function createToDoListFileSync(filePath: string) {
  try {
    // Ensure the directory exists
    const dir = path.dirname(filePath);
    fs.mkdirSync(dir, { recursive: true });

    fs.accessSync(filePath);
    console.log(`File "${filePath}" already exists.`);
  } catch (error: any) {
    if (error.code === "ENOENT") {
      // File does not exist, create it
      try {
        fs.writeFileSync(filePath, "[]");
        console.log(`File "${filePath}" has been created.`);
      } catch (writeError: any) {
        console.error(`Error creating file: ${writeError.message}`);
      }
    } else {
      console.error(`Error checking file: ${error}`);
    }
  }
}
