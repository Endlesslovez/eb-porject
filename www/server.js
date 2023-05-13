"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const util_1 = require("./util/util");
const fs = require("fs");
(() => __awaiter(this, void 0, void 0, function* () {
    // Init the Express application
    const app = express_1.default();
    // Set the network port
    const port = process.env.PORT || 8082;
    // Use the body parser middleware for post requests
    app.use(body_parser_1.default.json());
    // @TODO1 IMPLEMENT A RESTFUL ENDPOINT
    // GET /filteredimage?image_url={{URL}}
    // endpoint to filter an image from a public url.
    // IT SHOULD
    //    1
    //    1. validate the image_url query
    //    2. call filterImageFromURL(image_url) to filter the image
    //    3. send the resulting file in the response
    //    4. deletes any files on the server on finish of the response
    // QUERY PARAMATERS
    //    image_url: URL of a publicly accessible image
    // RETURNS
    //   the filtered image file [!!TIP res.sendFile(filteredpath); might be useful]
    /**************************************************************************** */
    app.get("/filteredimage", (req, res) => __awaiter(this, void 0, void 0, function* () {
        const filters = req.query;
        let { image_url } = filters;
        if (!image_url) {
            return res.status(422).send("Fail");
        }
        yield util_1.filterImageFromURL(image_url);
        console.log("add file success!!!");
        const basePath = "\\util\\tmp\\";
        var files = yield fs.readdirSync(process.cwd() + "\\src" + basePath);
        for (var i in files) {
            console.log("path File", __dirname + basePath + files[i]);
            res.status(200).sendFile(__dirname + basePath + files[i]);
        }
    }));
    app.get("/deleteimage", (req, res) => __awaiter(this, void 0, void 0, function* () {
        const basePath = "\\src\\util\\tmp\\";
        var dirs = [];
        var files = fs.readdirSync(process.cwd() + basePath);
        for (var i in files) {
            dirs.push(process.cwd() + basePath + files[i]);
        }
        console.log("List-File -> ", dirs);
        util_1.deleteLocalFiles(dirs);
        console.log("delete file success!!!");
        return res.status(200).send("Delete Success");
    }));
    //! END @TODO1
    // Root Endpoint
    // Displays a simple message to the user
    app.get("/", (req, res) => __awaiter(this, void 0, void 0, function* () {
        res.send("try GET /filteredimage?image_url={{}}");
    }));
    // Start the Server
    app.listen(port, () => {
        console.log(`server running http://localhost:${port}`);
        console.log(`press CTRL+C to stop server`);
    });
}))();
//# sourceMappingURL=server.js.map