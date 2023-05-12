import express from 'express';
import bodyParser from 'body-parser';
import {filterImageFromURL, deleteLocalFiles} from './util/util';
const fs = require('fs');
import { log } from 'console';
(async () => {

  // Init the Express application
  const app = express();

  // Set the network port
  const port = process.env.PORT || 8082;
  
  // Use the body parser middleware for post requests
  app.use(bodyParser.json());

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
  app.get("/filteredimage", (req:express.Request, res:express.Response) =>{
    const filters = req.query;
   let {image_url} = filters;

   if(!image_url){
    return res.status(422).send("Fail");
   }
   filterImageFromURL(image_url);
   console.log("add file success!!!");
   return res.status(200).send("Success")
  })

  app.get("/deleteimage", async (req:express.Request, res:express.Response) =>{
    
   const basePath = "\\src\\util\\tmp\\";
   var dirs = [];
   var files = fs.readdirSync(process.cwd() + basePath);
   for(var i in files) {   
    dirs.push(process.cwd() + basePath + files[i]);
  }

  console.log("List-File -> ", dirs);

   deleteLocalFiles(dirs);
   console.log("delete file success!!!");

   return res.status(200).send("Delete Success")
  })
  //! END @TODO1
  
  // Root Endpoint
  // Displays a simple message to the user
  app.get( "/", async ( req, res ) => {
    res.send("try GET /filteredimage?image_url={{}}")
  } );
  

  // Start the Server
  app.listen( port, () => {
      console.log( `server running http://localhost:${ port }` );
      console.log( `press CTRL+C to stop server` );
  } );
})();