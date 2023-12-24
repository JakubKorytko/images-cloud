import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';

import router from 'routes/routes';

import multerErrorHandler from 'upload/multer.errorHandler';

import thumbnails from 'utils/thumbnails.util';
import folders from 'utils/folders.util';

require('dotenv').config();

const app = express();
const { PORT } = process.env;

app.set('view-engine', 'ejs');
app.use(bodyParser.json());
app.use(cors());
app.use('/', router);

app.use(multerErrorHandler);
app.use(cookieParser());

app.listen(PORT, () => {
  console.log(`server listening at port ${PORT}`);
});

const autostart = async function () {
  await folders.validate();
  await thumbnails.generateAll();
  thumbnails.deleteUnused();
};

autostart();
