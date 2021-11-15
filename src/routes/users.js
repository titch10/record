const express =require ('express')
const router=express.Router()
const userController=require('../controllers/users')
const verifyToken = require('../middleware/verifyToken')

router.get('/pregunta',userController.getPregunta)
router.get('/bye',userController.getBye)

router.get('/all',userController.getUser)
router.get('/create',userController.getCreateUser )
router.get('/update/:id', userController.getUpdateUser)
router.get('/delete/:id', userController.getDeleteUser)
router.post('/create',userController.createUser)
router.post('/update/:id',userController.updateUser)
router.post('/delete/:id',userController.deleteUser)
router.get('/createAdmin', userController.getcreateAdmin)
router.get('/allA',userController.getAdmin)
router.get('/admin',userController.getAdmin)
router.get('/updatea/:id', userController.getUpdateAdmin)
router.get('/deletea/:id', userController.getDeleteAdmin)

router.post('/register', userController.register)
router.post('/updatea/:id',userController.updateAdmin)
router.post('/deletea/:id',userController.deleteAdmin)
router.get('/store',userController.getStore)


//Rutas de Rada
router.get('/menu',userController.getIndex)
router.get('/tablero',userController.getTablero)
router.post('/login', userController.login)
router.get('/contact',userController.getContact)
router.post('/solicitud',userController.sendSupport)
router.get('/message',userController.getMessage)
router.get('/tarea',userController.getTarea)
router.get('/form',userController.getForm)
router.get('/tabla',userController.getTabla )
router.get('/graph',userController.getGraph)
router.get('/perfil',userController.getPerfil)
router.get('/artistas',userController.getArtistas)
router.post('/createartist',userController.createArtist)
router.post('/add',userController.subirImagen)

module.exports=router