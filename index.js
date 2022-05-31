const express = require('express')
const multer = require("multer");
const {getConnection, showArticles, createArticle} = require("./db");

const app = express()
app.set('view engine', 'ejs')
app.use('/public/', express.static('public'))
app.use('/uploads/', express.static('uploads'))
// app.use(express.urlencoded({ extended: true}))

const storageConfig = multer.diskStorage({
    destination: (req, file, cb) =>{
        cb(null, "uploads");
    },
    filename: (req, file, cb) =>{
        const date = new Date();
        const img_path = `${date.getFullYear()}${date.getMonth()}${date.getDay()}${date.getSeconds()}${date.getMilliseconds()}`;
        let file_name = img_path + file.originalname.match(/\.\w+$/)[0]
        console.log(file_name)
        cb(null, file_name);
    }
});

const upload = multer({storage: storageConfig})

app.get('/', (req, res)=> {
    res.sendFile(__dirname + '/index.html')
})

app.post('/', upload.single('uploaded_file'), function (req, res) {
    try{
        console.log(req.file.path)
    }
    catch (e){
        console.log(e.message)
    }
    console.log(req.body.headline)
    console.log(req.body.full_text)

    createArticle(getConnection(), req.body.headline, req.body.full_text, req.file.path.replace('\\', '/'))

    res.sendFile(__dirname + '/index.html')
});

app.get('/article/', function (req, res){
    showArticles(getConnection()).then((result) => {
        res.render('template.ejs', {news: result});
    });
})

app.listen(8080, () => console.log('Server working on http://localhost:8080'))
