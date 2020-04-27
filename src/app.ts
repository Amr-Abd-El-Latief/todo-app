import express from 'express';
import noteDao from './NoteDao'
class App {
  public express
  private router;
  private noteDao;
  constructor() {
    this.express = express();
     this.noteDao = noteDao;
    //this.router= express.Router();

    // logging middel ware 
// body parser 

var bodyParser = require('body-parser');
this.express.use(bodyParser.json()); // support json encoded bodies
this.express.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies


    this.express.use((req, res, next) => {
      console.log("*********");
      console.log(req);
      res.on("finish", () => {
        console.log("Finished : " + res)
      })
      next();
    });

    // logging middel ware 

    this.express.use((req, res, next) => {
      console.log("************************************************");
      console.log("************************************************");
      console.log("************************************************");
      console.log("************************************************");

      console.log(req.headers);

      console.log("************************************************");
      console.log("************************************************");
      console.log("************************************************");
      console.log("************************************************");

      if (req.header('User-Agent')) {
        console.log("'User-Agent''User-Agent''User-Agent''User-Agent''User-Agent'");
      } else {
        console.log("%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%");

      }
      next();
    });



    this.express.use(function (req, res, next) {
      console.log('Time:', Date.now())
      next()
    })

    this.mountRoutes();
    this.mountApis();

  }


  private mountRoutes(): void {
    const router = express.Router();

    // a middleware function with no mount path. This code is executed for every request to the router
    router.use((req, res, next) => {
      console.log("########");
      console.log('Time:', Date.now())
      next()
    })
    router.get('/', (req, res) => {
      res.json({
        message: 'Welcome to todo App ; '
      })
    })

    this.express.use('/', router)
  }

  private mountApis(): void {
    const app = this.express;
    app.get('/todoApp/api/todos', function (req, res) {
      console.log("Got a POST request for the homepage");
      res.send(noteDao.getNotes());
    });

    app.post('/todoApp/api/todos', function (req, res) {
      console.log("%% req : "+JSON.stringify(req.body));
      if(req.body.title && req.body.note){
        let title = req.body.title;
        let note = req.body.note;
        noteDao.addNote({"title":title,"note":note})
        res.sendStatus(200);
      }else{
        res.sendStatus(422)
      }
    });


    app.patch('/todoApp/api/todos', function (req, res) {
      console.log("Got a POST request for the homepage");
      res.send('I am Impossible   Get! ');
    });


    app.delete('/todoApp/api/todos', function (req, res) {
      console.log("Got a DELETE request for /del_student");
      res.send('I am Deleted!');
    });

    app.get('/todoApp/api/health', function (req, res) {
      console.log("Got a POST request for the homepage");
      res.send('I am Impossible   Health !  ');
    });

  }

}

export default new App().express






