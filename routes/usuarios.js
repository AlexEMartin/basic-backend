
const { Router } = require('express');
const { check } = require('express-validator');
const { usuariosGet, 
        usuariosPost, 
        usuariosPut, 
        usuariosPatch, 
        usuariosDelete } = require('../controllers/usuarios');
const { esRolValido, existeEmail, existeUsuarioPorId } = require('../helpers/db-validators');

const {
        validarCampos,
        validarJWT,
        esAdminRole,
        tieneRole
} = require('../middlewares')

const router = Router();


router.get('/', usuariosGet)

router.post('/', [
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('password', 'Password debe tener al menos 6 caracteres').isLength({ min: 6 }),
        check('correo', 'El correo no es valido').isEmail(),
        check('correo').custom( existeEmail ),
        // check('rol', 'No es un rol valido').isIn(['ADMIN_ROLE','USER_ROLE']),
        check('rol').custom( esRolValido ),
        validarCampos
],usuariosPost)

router.put('/:id', [
        check('id', 'No es un ID valido').isMongoId(),
        check('id').custom( existeUsuarioPorId ),
        check('rol').custom( esRolValido ),
        validarCampos
], usuariosPut)

router.patch('/', usuariosPatch)

router.delete('/:id', [
        validarJWT,
        // esAdminRole,
        tieneRole('ADMIN_ROLE','VENTAS_ROLE', 'USER_ROLE'),
        check('id', 'No es un ID valido').isMongoId(),
        check('id').custom( existeUsuarioPorId ),
        validarCampos
],usuariosDelete)







module.exports = router;