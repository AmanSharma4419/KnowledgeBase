const express = require('express');
const compression = require('compression');
const debug = require('debug')('app:app');
const cors = require('cors');
const bodyParser = require('body-parser');
const { Server } = require('http');
const morganDebug = require('morgan-debug');

const { PORT, PROJECT_NAME, ENVIRONMENT } = require('./appConfig');
const connectToDb = require('./helpers/connectToDb.helper');
const { checkEnvVariables } = require('./helpers/utils.helper');
const fileUpload = require('express-fileupload')
//const scheculer = require('../src/jobs/index');

// Check whether all required config variables are loaded  or not

const swaggerJsDocs = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: 'Knowledge Base API',
      description: "Knowledge base api description",
      contact: {
        name: "Harry"
      },
      servers: [SERVERURL+":"+PORT]
    }
  },
  apis: ["app.js"]
};



checkEnvVariables();

module.exports.app = express();

module.exports.server = new Server(this.app);

// Start Server
module.exports.startServer = async () => {
  // connect to database
  await connectToDb();

  require('./models/index');
  // Load models
  //  require('./models');

  // Load socket

  // require('./socket').init(this.server);

  this.app.use(morganDebug('app:app', 'tiny'));

  const swaggerDocs = swaggerJsDocs(swaggerOptions);
  this.app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

  // body-parser needed to parse form-data bodies
  this.app.use(bodyParser.json({ limit: '100mb' }));
  this.app.use(bodyParser.urlencoded({ extended: true, limit: '100mb', parameterLimit: 100000 }));

  // Disable x-powered-by header
  this.app.disable('x-powered-by');
  this.app.set('env', ENVIRONMENT);

  // Handle `OPTIONS` request.
  //this.app.use('*', cors());
  //this.app.all('*', handleOptions);

  // delete all headers related to cache
  this.app.use(deleteCacheHeaders);

  // compress responses
  this.app.use(compression({ threshold: 512 }));

  // enabling CORS for all routes.
  this.app.use(cors());

  this.app.use(
    fileUpload({
      useTempFiles: false,
      tempFileDir: process.cwd(),
      preserveExtension: 4,
      safeFileNames: true
    })
  )

  // multer for file upload
  //this.app.use(multer().any());

  // load routes
  this.app.use(express.json())
  const router = require('./routes/user.routes');

  this.app.use('/api/v1', router);

  // It works route
  this.app.get('/', itworks);

  await listen({ server: this.server });


  return Promise.resolve();
};

async function listen({ server }) {
  server.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
    debug(`Listening on port ${PORT}`);

    return Promise.resolve();
  });
}

async function handleOptions(req, res, next) {
  // res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS,PATCH');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization, Accept-Language');
  if (req.method == 'OPTIONS') {
    res.status(200).end();
  } else {
    next();
  }
}

async function deleteCacheHeaders(req, res, next) {
  req.headers['if-none-match'] = '';
  req.headers['if-modified-since'] = '';
  res.header('Access-Control-Expose-Headers', 'Content-Disposition');
  next();
}

async function itworks(req, res) {
  return res.send({
    name: 'API',
    status: 'IT_WORKS',
    message: 'No, this is not the correct basePath!',
    PROJECT_NAME,
  });
}
