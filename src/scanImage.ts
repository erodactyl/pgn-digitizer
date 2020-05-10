import { spawn } from "child_process";
import Path from "path";

/**
 * Scan an image by id using the tesseract library
 * @param id Id of the image to be scanned
 */
const scanImage = (path: string): Promise<string> => {
  return new Promise(function (res, rej) {
    const scanner = spawn("python", [Path.join(__dirname, "../ocr.py"), path]);

    scanner.stdout.on("data", function (data) {
      res(data.toString());
    });

    scanner.stderr.on("data", (data) => {
      rej(data.toString());
    });
  });
};

export default scanImage;
