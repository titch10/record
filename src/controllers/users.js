//const connection = require ('../connection')
const User = require('../models/users')
const Admin = require('../models/admin')
const Photo = require('../models/Photo')
const Msg = require('../models/msg')
const Task = require('../models/task')
const jwk = require ('jsonwebtoken')
const bcrypt = require ('bcrypt')
const nodemailer=require('nodemailer')
const {google} = require('googleapis')
const path=require('path')
let msn = false;
let tsk = false;
var Growth;
var metaArtist=35;
const cloudinary = require('cloudinary')
const fs=require('fs-extra')
cloudinary.config({
    cloud_name:'titch10a',
    api_key:'553915279492442',
    api_secret:'rxbr2AMHktBGNgyOUpgylsdVCaM'
});

//GET USER
const getUser=(req,res)=>{
    //const sql ='select * from users'
    User.find({}, (err, result)=>{
          if (err) {
              console.log('ha ocurrido un error')
          }else{
              console.log(result)
              res.render('users',{users:result})
          }
    })
}
const getCreateUser=(req,res)=>{
    res.render('create-user')
}
const getUpdateUser=(req,res)=>{
    const param = req.params.id
    //const sql= 'select * from users where id=?'
    User.find({_id:param} ,(err, result)=>{
           if (err) {
               console.log('ha ocurrido un error'+err)
           }else{
               console.log(result)
               res.render('update-user',{user:result})
           }
    })
}
const getDeleteUser=(req,res)=>{
    const param = req.params.id
    //const sql= 'select * from users where id=?'
    User.find({_id:param},(err, result)=>{
           if (err) {
               console.log('ha ocurrido un error'+err)
           }else{
               console.log(result)
               res.render('delete-user',{user:result})
           }
    })
}
const createUser = (req,res)=>{
    //const sql='insert into users SET ?'
    
    const data= req.body
    const user = new User({
        name: data.name,
        lugar: data.lugar,
        number:data.number,
    })

    user.save((err, result)=>{
            if (err) {
                console.log(err)
            }else{
                console.log('Usuario registrado')
                res.redirect('/users/all')
            }
    })
    //res.render('users',{users:users})
}
const updateUser = (req,res)=>{
    const param=req.params.id
    //const sql = `update users SET name='${req.body.name}', age='${req.body.age}' where id='${param}'`
    const data = req.body

    User.findOneAndUpdate({_id:param},data,(err,result)=>{
        if(err){
            console.log('ha ocurrido un error'+err)
        }else{
            console.log('usuario actualizado')
            res.redirect('/users/all')
        }
    })
}
const deleteUser = (req,res)=>{
    const param=req.params.id
    //const sql = `delete from users where id='${param}'`
    //aca va connection.query
    User.deleteOne({_id:param},(err,result)=>{
        if(err){
            console.log('ha ocurrido un error'+err)
        }else{
            console.log('usuario actualizado')
            res.redirect('/users/all')
        }
    })
}

//GET ADMIN

const getAdmin = (req, res)=>{
    Admin.find({}, (err, result)=>{
        if (err) {
            console.log('ha ocurrido un error')
        }else{
            console.log(result)
            res.render('admins',{admins:result})
        }
  })
}
const getcreateAdmin=(req,res)=>{
    res.render('create-admin')

}
const register = (req, res)=>{
    var prue = "aux";
     const admin= new Admin({
         name: prue,
         email: req.body.email,
         password: bcrypt.hashSync(req.body.password,10)
     })
     admin.save((err,result)=>{
         if(err)
         {
            res.send('Ha ocurrido un error'+err)
         }else{
            console.log('Usuario registrado')
            res.redirect('/users/admin')
         }
     })
}
const getUpdateAdmin=(req,res)=>{
    const param = req.params.ide
    //const sql= 'select * from users where id=?'
    Admin.find({_ide:param} ,(err, result)=>{
           if (err) {
               console.log('ha ocurrido un error'+err)
           }else{
               console.log(result)
               res.render('update-admin',{admin:result})
           }
    })
}
const getDeleteAdmin=(req,res)=>{
    const param = req.params.ide
    //const sql= 'select * from users where id=?'
    Admin.find({_id:param},(err, result)=>{
           if (err) {
               console.log('ha ocurrido un error'+err)
           }else{
               console.log(result)
               res.render('delete-admin',{admin:result})
           }
    })
}
const updateAdmin = (req,res)=>{
    const param=req.params.ide
    //const sql = `update users SET name='${req.body.name}', age='${req.body.age}' where id='${param}'`
    const data = req.body

    Admin.findOneAndUpdate({_ide:param},data,(err,result)=>{
        if(err){
            console.log('ha ocurrido un error'+err)
        }else{
            console.log('usuario actualizado')
            res.redirect('/users/admin')
        }
    })
}
const deleteAdmin = (req,res)=>{
    const param=req.params.ide
    //const sql = `delete from users where id='${param}'`
    //aca va connection.query
    Admin.deleteOne({_ide:param},(err,result)=>{
        if(err){
            console.log('ha ocurrido un error'+err)
        }else{
            console.log('usuario actualizado')
            res.redirect('/users/admin')
        }
    })
}


//GET
const getTablero=async (req,res)=>{
    const photos = await Photo.find();
    res.render('activity',{photos,msn});
}
const getStore=(req,res)=>{
    res.render('tienda',{msn})
}
const getContact =(req,res)=>{
    res.render('cont-us',{msn})
}
const getMessage= async(req,res)=>{
    msn = false;
    var aux=1;
    Msg.find({}, async (err, result)=>{
    if (err) {
        console.log('ha ocurrido un error')
    }else{
        console.log(result)
        await Msg.countDocuments({},function(err,count){
        res.render('message',{msgs:result,count,aux,msn})
    })
    }
})

}
const getTarea=(req,res)=>{
    var aux=1;
    Task.find({}, async (err, result)=>{
    if (err) {
        console.log('ha ocurrido un error')
    }else{
        console.log(result)
        await Task.countDocuments({},function(err,count){
           res.render('task',{tasks:result,count,aux,msn})
        })
    }
    })
}
const getCreateTask=(req,res)=>{
    res.render('task_create',{msn})
}
const getForm=(req,res)=>{
    res.render('form',{msn})
}
const getTabla=(req,res)=>{
    res.render('table',{msn})
}
const getGraph=(req,res)=>{
    res.render('charts',{msn})
}
const getArtistas=(req,res)=>{
    res.render('other-user-profile',{msn})
}
const getPerfil=(req,res)=>{
    res.render('other-user-listing',{msn})
}
const getIndex=async(req,res)=>{
    try{  
        await User.countDocuments({}, function (err, count) {
            //console.log('there are %d users', count);
            Growth= (count*100)/metaArtist;
            Growth=Growth.toFixed(2);
            res.render('index',{count,Growth,msn})
          });
    }catch(e){
        console.log(e)
    }
}
const getUpdateTask=async(req,res)=>{
    const {id} = req.params;
    const task = await Task.findById(id);
    res.render('task-edit',{task,msn});
}

// FUNCIONES
const getCount = async(req, res)=>{
    
    try{  
        await User.countDocuments({}, function (err, count) {
            console.log('there are %d jungle adventures', count);
            res.render()
          });
    }catch(e){
        console.log(e)
        res.send(e);
    }
}
const login = (req, res)=>{
    Admin.findOne({email:req.body.email} ,(err, result)=>{
        if (err) {
            console.log('ha ocurrido un error'+err)
        }else{
            if(result){
               if(bcrypt.compareSync(req.body.password, result.password)){
                          //console.log('Contraseña correcta')
                          //jwk.sign({Admin:result},'secret-key',(err,token)=>{
                            res.redirect('/users/menu')
                   }
                   
                   else{
                          
                          res.redirect('/')
                          console.log('Contraseña incorrecta')
                   }
            }else{
                console.log('Usuario no encontrado')
            }
        }
 })
}
const sendSupport =(req,res)=>{
    const {fullname, email, phone, affair, message} =req.body;
    const contentHTML=`
    <h1>User information</h1>
    <ul>
        <li>Username:${fullname}</li>
        <li>Useremail:${email}</li>
        <li>Userphone:${phone}</li>
        <li>Useraffair:${affair}</li>
    </ul>
        <p>${message}</p>
    `;

    const CLIENTD_ID="330807305382-nnrslo8a2ra07ocrob6jhoj8d0iivvg5.apps.googleusercontent.com";
    const CLIENTD_SECRET="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";
    const REDIRECT_URI="https://developers.google.com/oauthplayground";
    const REFRESH_TOKEN="1//04vwpitvPoaZXCgYIARAAGAQSNwF-L9IripmKWUU5oQREkdfzdmwDHerDjoms-lXwGOiqXQNB_w37P-p5f0d6XPj4NUJyA8hrSHc";
    
    const oAuth2Client= new google.auth.OAuth2(
        CLIENTD_ID,
        CLIENTD_SECRET,
        REDIRECT_URI
    );
    
    oAuth2Client.setCredentials({refresh_token: REFRESH_TOKEN});
    
    async function sendMail(){
         try{
            const accessToken = await oAuth2Client.getAccessToken(); 
            const transporter = nodemailer.createTransport({
                service: "gmail",
                auth:{
                    type:"OAuth2",
                    user:"cesarspidera1s@gmail.com",
                    clientId:CLIENTD_ID,
                    clientSecret:CLIENTD_SECRET,
                    refreshToken:REFRESH_TOKEN,
                    accessToken: accessToken,
                },
             });
            const mailOptions={
                from: "Pagina web rada-record <cesarspidera1s@gmail>",
                to:"cesarspidera1s@gmail.com",
                subject:"Nodemailer prueba",
                html:contentHTML,
            };

            const result = await transporter.sendMail(mailOptions);
            return result;
         }catch(err){
             console.log(err);
         }
    }
        sendMail()
        .then(result=>res.status(200).redirect('/users/menu'))
        .catch(err=>console.log(error.message));
}
const createArtist = async(req,res)=>{
    //const sql='insert into users SET ?'
    const data= req.body
    const user = new User({
        grupo: data.grupo,
        correo: data.correo,
        numero: data.numero,
        ide: data.ide,
        fecha: data.fecha,
        name1: data.name1,
        name2: data.name2,
        name3: data.name3,
        name4: data.name4,
        name5: data.name5,
        locacion:data.locacion,
        modo:data.optionsRadios,
        spotify:data.chbx1,
        youtube:data.chbx2,
        itunes:data.chbx3,
        deezer:data.chbx4,
    })

    await user.save();
    res.redirect('/users/form')
}
const subirImagen= async(req,res)=>{
    const {title,descripcion}=req.body;
    const result = await cloudinary.v2.uploader.upload(req.file.path)
    const newPhoto = new Photo({
        title,
        descripcion,
        imageURL: result.url,
        public_id: result.public_id
    })
    await newPhoto.save();
    await fs.unlink(req.file.path)
    res.send('ok');
}
const getSendmsg=async(req,res)=>{
    try{
        var fechahora=new Date()
        console.log(fechahora.getDate())
        res.render('sendmsg')    
    }catch(e){

    }

}
const msgEnvio = (req,res)=>{
    //const sql='insert into users SET ?'
    msn=true
    var fechahora=new Date()
    const data= req.body
    const msg = new Msg({
        title: data.title,
        descripcion: data.descripcion,
        time: fechahora.getDay()+"/"+ fechahora.getMonth()+" - "+fechahora.getHours()+":"+fechahora.getMinutes()
    })

    msg.save((err, result)=>{
            if (err) {
                console.log(err)
            }else{
                console.log('Mensaje enviado')
                res.redirect('/')
            }
    })
    //res.render('users',{users:users})
}
const deleteMsg = async (req,res)=>{
    const {id}=req.params
    await Msg.remove({_id:id})
    res.redirect('/users/message')
}
const crearTask=(req,res)=>{
    tsk=true
    var fechahora=new Date()
    const data= req.body
    const task = new Task({
        tarea: data.tarea,
        time: fechahora.getDate()+"/"+ fechahora.getMonth() +" - "+fechahora.getHours()+":"+fechahora.getMinutes()
    })

    task.save((err, result)=>{
            if (err) {
                console.log(err)
            }else{
                console.log('Mensaje enviado')
                res.redirect('/users/tarea')
            }
    })
}
const deleteTask = async (req,res)=>{
    const {id}=req.params
    await Task.remove({_id:id})
    res.redirect('/users/tarea')
}
const cambiarBoton = async (req,res)=>{
    const {id}=req.params
    const task = await Task.findById(id);
    task.status =!task.status
    await task.save();
    res.redirect('/users/tarea')
} 
const updateTask= async(req,res)=>{
   const {id}=req.params;
   await Task.update({_id:id},req.body);
   res.redirect('/users/tarea')
}  

module.exports= {updateTask,getUpdateTask,cambiarBoton,deleteTask,crearTask,getCreateTask,deleteMsg,msgEnvio,getSendmsg,getCount,subirImagen,createArtist,getPerfil,getArtistas,getGraph,getTabla,getForm,getTarea,getMessage,getTablero,getContact,getIndex,getStore,getUser, 
    getCreateUser, getUpdateUser,getUpdateAdmin, getDeleteUser, getDeleteAdmin, 
    createUser, updateUser, updateAdmin, deleteUser, deleteAdmin, getAdmin, login, register, 
    getcreateAdmin, sendSupport}