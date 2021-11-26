//const connection = require ('../connection')

const User = require('../models/users')
const Admin = require('../models/admin')
const Photo = require('../models/Photo')
const jwk = require ('jsonwebtoken')
const bcrypt = require ('bcrypt')
const nodemailer=require('nodemailer')
const {google} = require('googleapis')
var contador =0
var bandera=0
var aqui;
const cloudinary = require('cloudinary')
const fs=require('fs-extra')
cloudinary.config({
    cloud_name:'titch10a',
    api_key:'553915279492442',
    api_secret:'rxbr2AMHktBGNgyOUpgylsdVCaM'
});



//funciones variadas
/*function contarUsers(){
    var parrafo = document.getElementById("parrafo");
    User.countDocuments({}, function (err, count) {
        console.log('there are %d jungle adventures', count);
        
      });
      parrafo.innerHTML=count;
      await User.find({}).then((err,result)=>{
            res.status(200).json({count: result.length()})
            console.log('prueba')
        })
 }

*/

//funciones para users 

const getCount = async(req, res)=>{
    
    try{  
        await User.countDocuments({}, function (err, count) {
            console.log('there are %d jungle adventures', count);
            //res.status(200).json(count)
            res.send(count);
          });
    }catch(e){
        console.log(e)
        res.send(e);
    }
};


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
const getIndex=(req,res)=>{
    res.render('index')
}
const getTablero=async (req,res)=>{
    const photos = await Photo.find();
    res.render('activity',{photos});
}
const getCreateUser=(req,res)=>{
        res.render('create-user')
}
const getPregunta=(req,res)=>{
    res.render('pregunta')
}
const getStore=(req,res)=>{
    res.render('tienda')
}
const getBye=(req,res)=>{
    res.render('despedida')
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



//Funciones para Admin Rutas

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
    Admin.find({_ide:param},(err, result)=>{
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
const getContact =(req,res)=>{
    res.render('cont-us')
}
const getMessage=(req,res)=>{
    res.render('message')
}
const getTarea=(req,res)=>{
    res.render('task')
}
const getForm=(req,res)=>{
    res.render('form')
}
const getTabla=(req,res)=>{
    res.render('table')
}
const getGraph=(req,res)=>{
    res.render('charts')
}
const getArtistas=(req,res)=>{
    res.render('other-user-profile')
}
const getPerfil=(req,res)=>{
    res.render('other-user-listing')
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

const createArtist = (req,res)=>{
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
        ingreso:data.ingreso,
        locacion:data.locacion,
        modo:data.optionsRadios,
        spotify:data.chbx1,
        youtube:data.chbx2,
        itunes:data.chbx3,
        deezer:data.chbx4,
    })

    user.save((err, result)=>{
            if (err) {
                console.log(err)
            }else{
                console.log('Usuario registrado')
                res.redirect('/users/form')
            }
    })
    //res.render('users',{users:users})
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

module.exports= {getCount,subirImagen,createArtist,getPerfil,getArtistas,getGraph,getTabla,getForm,getTarea,getMessage,getTablero,getContact,getIndex,getStore, getBye,getUser,getPregunta, 
    getCreateUser, getUpdateUser,getUpdateAdmin, getDeleteUser, getDeleteAdmin, 
    createUser, updateUser, updateAdmin, deleteUser, deleteAdmin, getAdmin, login, register, 
    getcreateAdmin, sendSupport}