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
    let taskName = req.body.taskName;
    let taskDate = req.body.taskDate;
    let taskDesc = req.body.taskDesc;
    
    let rec = {
        taskName: taskName,
        taskDate: taskDate,
        taskDesc: taskDesc
    };
    db.push(rec);
    res.render('listAll.html', {data: db});
});

app.get('/', function(req,res){
    res.sendFile(__dirname + '/views/index.html');
});

app.get('/newTask', function(req,res){
    res.sendFile(__dirname + '/views/newTask.html');
});

app.get('/listAll', function(req,res){
    res.render('listAll.html', {data: db});
});

app.listen(app.get('port'));