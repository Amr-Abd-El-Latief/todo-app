"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const NoteDao_1 = __importDefault(require("./NoteDao"));
class App {
    constructor() {
        this.express = express_1.default();
        this.noteDao = NoteDao_1.default;
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
                console.log("Finished : " + res);
            });
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
            }
            else {
                console.log("%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%");
            }
            next();
        });
        this.express.use(function (req, res, next) {
            console.log('Time:', Date.now());
            next();
        });
        this.mountRoutes();
        this.mountApis();
    }
    mountRoutes() {
        const router = express_1.default.Router();
        // a middleware function with no mount path. This code is executed for every request to the router
        router.use((req, res, next) => {
            console.log("########");
            console.log('Time:', Date.now());
            next();
        });
        router.get('/', (req, res) => {
            res.json({
                message: 'Welcome to todo App ; '
            });
        });
        this.express.use('/', router);
    }
    mountApis() {
        const app = this.express;
        app.get('/todoApp/api/todos', function (req, res) {
            console.log("Got a POST request for the homepage");
            res.send(NoteDao_1.default.getNotes());
        });
        app.post('/todoApp/api/todos', function (req, res) {
            console.log("%% req : " + JSON.stringify(req.body));
            if (req.body.title && req.body.note) {
                let title = req.body.title;
                let note = req.body.note;
                NoteDao_1.default.addNote({ "title": title, "note": note });
                res.sendStatus(200);
            }
            else {
                res.sendStatus(422);
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
exports.default = new App().express;
//# sourceMappingURL=app.js.map