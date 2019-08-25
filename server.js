let express = require('express');
let ejs = require('ejs');
let bodyParser = require('body-parser')

let app = express();
let db = [];

app.use(express.static('img'));
app.use(express.static('css'));

app.use(bodyParser.urlencoded({
    extended: false
}))

app.engine('html', ejs.renderFile);
app.set('view engine', 'html');

app.set('port', 8888);

app.post('/newTask', function(req,res){
    // console.log(req.body.taskName);
    let taskName = req.body.taskName;
    let taskDate = req.body.taskDate;
    let taskDesc = req.body.taskDesc;
    
    let rec = {
        taskName: taskName,
        taskDate: taskDate,
        taskDesc: taskDesc
    };
    db.push(rec);
    // res.send(listAll());
    res.render('listAll.html', {data: db});
});

app.get('/', function(req,res){
    res.render('index.html');
});

app.get('/newTask', function(req,res){
    res.render('newTask.html');
});

app.get('/listAll', function(req,res){
    // res.send(listAll());
    res.render('listAll.html', {data: db});
});

app.listen(app.get('port'));

function listAll() {
    let toOut = '<table style="width:100%"><tr><th>Task Name</th><th>Task Date</th><th>Task Description</th></tr>';
    for (let i = 0; i < db.length; i++) {
        toOut += '<tr><td>' + db[i].taskName + '</td><td>' + db[i].taskDate + '</td><td>' + db[i].taskDesc + '</td></tr>';
        if (i == db.length - 1) {
            toOut += '</table>';
        };
    }
    return toOut;
};