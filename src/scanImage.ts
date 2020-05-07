import { spawn } from "child_process";

/**
 * Scan an image by id using the tesseract library
 * @param id Id of the image to be scanned
 */
const scanImage = (id: number): Promise<string> => {
  return new Promise(function (res, rej) {
    const scanner = spawn("python", ["./ocr.py", `${id}`]);

    scanner.stdout.on("data", function (data) {
      res(data.toString());
    });

    scanner.stderr.on("data", (data) => {
      rej(data.toString());
    });
  });
};

export default scanImage;