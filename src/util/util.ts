import Jimp = require("jimp");
import express from "express";
import { error, log } from "console";
import axios from "axios";
const fs = require("fs");
const path = require("path");

// filterImageFromURL
// helper function to download, filter, and save the filtered image locally
// returns the absolute path to the local image
// INPUTS
//    inputURL: string - a publicly accessible url to an image file
// RETURNS
//    an absolute path to a filtered image locally saved file
export async function filterImageFromURL(inputURL: string): Promise<string> {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios({
        method: "GET",
        url: inputURL,
        responseType: "stream",
      });
      const localFilePath = path.resolve(__dirname, "temp", "filtered." + Math.floor(Math.random() * 2000)+ ".jpg");
      console.log("filtered",localFilePath );
      
      const w = response.data.pipe(fs.createWriteStream(localFilePath));
      w.on("finish", () => {
        resolve(localFilePath);
      });
    } catch (error) {
      reject("error" + error);
    }
  });
}

// deleteLocalFiles
// helper function to delete files on the local disk
// useful to cleanup after tasks
// INPUTS
//    files: Array<string> an array of absolute paths to files
export async function deleteLocalFiles(files: Array<string>) {
  for (let file of files) {
    fs.unlinkSync(file);
  }
}
