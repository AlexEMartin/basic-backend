const { request, response } = require('express');


const usuariosGet = (req = request, res = response) => {

    const { name, age, id = 'NO ID'} = req.query;

    res.json({
        msg: 'get API - controller',
        name,
        age, 
        id
    })
}

const usuariosPost = (req, res = response) => {

    const body = req.body;

    res.json({
        msg: 'post API - controller',
        body
    })
}

const usuariosPut = (req, res = response) => {

    const { id } = req.params;

    res.json({
        msg: 'put API - controller',
        id
    })
}

const usuariosPatch = (req, res = response) => {
    res.json({
        msg: 'patch API - controller'
    })
}

const usuariosDelete = (req, res = response) => {
    res.json({
        msg: 'delete API - controller'
    })
}





module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosPatch,
    usuariosDelete
}