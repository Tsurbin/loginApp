
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const PORT = 8080;
const app = express();
const router = express.Router();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(require('../policies/headerMiddleware'));


const routes = require('./routes');
routes.readRouterFiles('logInApp').forEach(fileInfo => {
    console.log("file --> " + fileInfo.file);
    require(fileInfo.file)(app);
});

  app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
  });

