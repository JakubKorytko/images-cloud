const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 3001;
const thumbnails = require("./src/utils/thumbnails.util");
const multerErrorHandler = require("./src/errors/multer.errorHandler");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

const folders = require("./src/utils/folders.util");

app.set("view-engine", 'ejs');
app.use(bodyParser.json());
app.use(cors());
app.use("/", require("./src/routes/routes"));
app.use(multerErrorHandler);
app.use(cookieParser);

const server = app.listen(PORT, () => {
    console.log(`server listening at port ${PORT}`)
})

const autostart = async function (){
await folders.validate();
thumbnails.generateAll();
thumbnails.deleteUnused();
}()