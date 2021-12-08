const express = require('express')
const app = express()
//const port=3000
const cors =require('cors')
const path = require('path')
const connection = require('./connection')
const user=require('./routes/users.js')
const jq=require('../node_modules/jquery/dist/jquery')
const loggedMiddleware = require('./middleware/logged.js')
const socketio = require('socket.io')
const http = require('http')
const server = http.createServer(app)
const io=socketio(server)
const fs=require('fs')
const multer = require('multer')
const { format } = require('timeago.js');
const opcionesMulter=multer.diskStorage({
    destination: function(req,file,cb){
         cb(null, path.join(__dirname,'canciones'));
    },
    filename: function(req,file,cb){
         cb(null, file.originalname)
    }
});
var upload = multer({storage: opcionesMulter});
var mediaserver=require('mediaserver')

require('./socket')(io)
app.use(express.json());
app.set('title', 'aplicacion hecha en node.js')
//3306
app.set('port',process.env.PORT || 3000 )
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname,'views'))
app.set('bootstrap', path.join(__dirname,'bootstrap'))
//seccion de middleware
app.use(loggedMiddleware.isLogged)
app.use(express.static(path.join(__dirname, 'public')))
app.use(cors())
app.use(express.urlencoded({extended:false}))
const storage = multer.diskStorage({
    destination: path.join(__dirname, 'public/uploads'),
    filename: (req,file,cb)=>{
         cb(null,path.extname(file.originalname));
    }
});

app.use(multer({storage}).single('image'));
//rutas
app.get('/',(req,res)=>{
    res.render('other-login')
})
app.use('/users',user)

server.listen(app.get('port'),()=>{
    console.log('mi'+ app.get('title')+ ' esta en el puerto ' + app.get('port'))
})

app.use('/jquery',jq)
//
   // app.use('/jquery',express.static(path.join(__dirname,'node_modules','jquery','dist')))
    app.get('/canciones',function(req,res){
        fs.readFile(path.join(__dirname,'canciones.json'),'utf8',function(err,canciones){
            if(err) throw err;
            res.json(JSON.parse(canciones));
        })
    })


    app.get('/canciones/:nombre',function(req,res){
        var cancion = path.join(__dirname,'canciones',req.params.nombre);
        mediaserver.pipe(req,res,cancion);
    })
    
    app.post('/canciones',upload.single('cancion'),function (req, res){
        var archivoCanciones=path.join(__dirname,'canciones.json');
        var nombre= req.file.originalname;
        fs.readFile(archivoCanciones,'utf8',function(err,archivo){
          if(err)throw err;
          var canciones = JSON.parse(archivo);
          canciones.push({nombre: nombre});
          fs.writeFile(archivoCanciones,JSON.stringify(canciones),function(err){
              if(err)throw err;
              res.render('tienda');
          })
        });
    });

//
app.use((req, res, next) => {
    app.locals.format = format;
    next();
});
app.post('/canciones')