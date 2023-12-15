
const { Router } = require('express');
const { check } = require('express-validator');
const { validarJWT, validarCampos, esAdminRole } = require('../middlewares');
const { 
    crearProducto,
    obtenerProductos,
    obtenerProducto,
    actualizarProducto, 
    borrarProducto} = require('../controllers/productos');
const { existeCategoriaPorId, existeProductoPorId } = require('../helpers/db-validators');


const router = Router();

// Obtener todas las categorias
router.get('/', obtenerProductos)

// Obtener una categoria por id
router.get('/:id', [
    check('id', 'No es un id de Mongo válido').isMongoId(),
    check('id').custom( existeProductoPorId ),
    validarCampos
],obtenerProducto)

// Crear categoria - cualquier persona con un token valido
router.post('/', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('categoria', 'No pertenece a un ID de Mongo').isMongoId(),
    check('categoria').custom( existeCategoriaPorId ),
    validarCampos
], crearProducto)

// Actualizar categoria
router.put('/:id', [
    validarJWT,
    // check('categoria', 'No pertenece a un ID de Mongo').isMongoId(),
    check('id').custom( existeProductoPorId ),
    validarCampos
],actualizarProducto)

// Borrar categoria - Solo para Admin
router.delete('/:id', [
    validarJWT,
    esAdminRole,
    check('id', 'No es un id de Mongo válido').isMongoId(),
    check('id').custom( existeProductoPorId ),
    validarCampos
],borrarProducto)


module.exports = router;