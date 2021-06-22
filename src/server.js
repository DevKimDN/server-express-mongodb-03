//process.env.NODE_ENV = process.env.NODE_ENV || 'development'
const db = require("./db");
const port = parseInt(process.env.PORT || '3003')
const express = require("express");
//const path = require('path')
const dotenv = require("dotenv").config();
//const cookieParser = require('cookie-parser')
//const bodyParser = require('body-parser')
const passport = require("passport");
//const webpack = require('webpack')
//const webpackDevMiddleware = require('webpack-dev-middleware')
//const webpackHotMiddleware = require('webpack-hot-middleware')
//const helmet = require('helmet')
//const logger = require('morgan')

// load environment variables
// if (process.env.NODE_ENV !== 'production') {
//     dotenv.config({
//         path: path.resolve(`${__dirname}/../config/.${process.env.NODE_ENV}`)
//     })
// }

const { jwtLogin, localLogin } = require("./auth/auth-middleware");
//const devConfig = require('../webpack.dev.js')

const app = express();
//app.use(helmet())
//app.use(logger('dev'))
app.use(express.json()); //Body parser

// app.use(bodyParser.json())
// app.use(bodyParser.urlencoded({
//     extended: false
// }))
//app.use(cookieParser())

// Apply passport middleware
passport.use(jwtLogin);
passport.use(localLogin);

// Apply API Routes
require("./routes")(app);

// if (process.env.NODE_ENV === 'development') {
//     const compiler = webpack(devConfig)

//     app.use(webpackDevMiddleware(compiler, {
//         publicPath: '/',
//         contentBase: path.resolve(__dirname, '..', 'client'),
//         hot: true,
//         quiet: false,
//         noInfo: false,
//         lazy: false,
//         stats: 'normal',
//     }))

//     app.use(webpackHotMiddleware(compiler, {
//         path: '/__webpack_hmr',
//         heartbeat: 2000
//     }))

//     app.use(express.static(path.resolve(__dirname, '..', 'public')))

//     app.use('*', (req, res, next) => {
//         const filename = path.join(compiler.outputPath, 'index.html')

//         compiler.outputFileSystem.readFile(filename, (err, result) => {
//             if (err) {
//                 return next(err)
//             }
//             res.set('content-type', 'text/html')
//             res.send(result)

//             return res.end()
//         })
//     })
// } else {
//     app.use(express.static(path.resolve(__dirname, '..', 'public')))

//     app.get('*', (req, res) => {
//         res.sendFile(path.resolve(__dirname, '..', 'index.html'))
//     })
// }



//const server = http.createServer(app);


//app.set("port", port);

const httpServer = require("http").createServer(app);


const onListening = () => {
    const addr = httpServer.address();
    const bind = typeof addr === "string" ? `pipe ${addr}` : `port ${addr.port}`;
  
    //signale.success(`Server listening on ${bind}`);
  };
  
  const onError = (error) => {
    if (error.syscall !== "listen") {
      throw error;
    }
  
    const bind = typeof port === "string" ? `Pipe ${port}` : `Port ${port}`;
  
    switch (error.code) {
      case "EACCES":
        //signale.fatal(`${bind} requires elevated privileges`);
  
        process.exit(1);
        break;
      case "EADDRINUSE":
        //signale.fatal(`${bind} is already in use`);
  
        process.exit(1);
        break;
      default:
        throw error;
    }
  };


httpServer.listen(port);
httpServer.on("error", onError);
httpServer.on("listening", onListening);


db.connect(process.env.MONGODB_URL);
