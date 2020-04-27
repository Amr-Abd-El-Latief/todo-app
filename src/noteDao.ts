"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let fs = require("fs");



class NoteDao {
    private jsonContent: object;  // json file contents

    constructor() {
        let self = this;
        let testDataObject = {
            "data": [{ "id": 1, "title": "note 1", "note": "my first note" },
                {
                    "id": 2, "title": "note 2",
                    "note": "my second note"
                }]
        };


        const fd = fs.openSync('data2.json', 'w+');


        fs.writeSync(fd, 'FOOBAR'); // ISSUE: readFileSync(fd) will not read content
        //this.jsonContent = JSON.parse(simpleReadFileAsync(fd));
        this.jsonContent = this.simpleReadFileAsync(fd);
        console.log("self.jsonContent : " + JSON.stringify(this.jsonContent));
        const buf = Buffer.alloc(20);
        fs.readSync(fd, buf, 0, 20, 0);
        console.log('read with fd:', buf.toString())
        
        // always reads content (no issue)
        console.log('readFileSync with filepath:', fs.readFileSync('data2.json', { encoding: 'utf8' }));
        
        // ISSUE: does not read content if previously writeSync(fd, 'foo bar')
        console.log('readFileSync with fd:', fs.readFileSync(fd, { encoding: 'utf8' }));
        
        fs.closeSync(fd);

    }

     simpleReadFileAsync(filePath) {
        var options = {encoding: 'utf-8', flag: 'r'};
    
        fs.readFile(filePath, options, function (err, data) {
    
            if(err)
            {
                console.error(err);
            }else
            {
                console.log("File content : " + data);
            }
        });
    }

    addNote(noteData) {
        this.jsonContent["data"].push(noteData);
        this.writeToFile();
    }
    addNotes(notesData) {
        // this.jsonContent["data"] = .push(noteData);
    }
    deleteNote(noteId) {
        this.jsonContent["data"] = this.jsonContent["data"].filter((note) => {
            return note['id'] != noteId;
        });
    }
    getNotes() {
        return (JSON.parse(fs.readFileSync('data.json', 'utf8')))['data'];
    }
    writeToFile() {
        let writeData = { "data": this.jsonContent };
        fs.writeFile('data.json', JSON.stringify(writeData), function (err) {
            if (err)
                return console.log(err);
            console.log('Error : cannot write to file, please make sure that file : data.json exists');
        });
    }
}
exports.default = new NoteDao();
//# sourceMappingURL=NoteDao.js.map