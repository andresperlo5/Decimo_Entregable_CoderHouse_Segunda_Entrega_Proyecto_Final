const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')
const moment = require('moment')
const toDay = moment().format('DD/MM/YYYY')
const { usuariosDao, carritosDao } = require('../daos/index')

exports.RegisterUser = async (req, res) => {

    try {

        const { usuario, contrasenia } = req.body

        const newUsers = await usuariosDao.newUser(req.body)

        const newCart = {
            userId: newUsers.id,
            timestamp: toDay,
            producto: []
        }

        const newCarts = await carritosDao.newCart(newCart)

        const newUser = {
            carritoID: newCarts.id,
            usuario: usuario,
            admin: false,
            token: []
        }

        const salt = await bcryptjs.genSalt(10);
        newUser.contrasenia = await bcryptjs.hash(contrasenia, salt);

        const userCreate = await usuariosDao.ModifyOneUser(newUsers.id, newUser)
        res.status(201).json({ userCreate })

    } catch (error) {
        console.log('error', error);
        res.status(500).json({ msg: 'Error', error })
    }
}

exports.LoginUser = async (req, res) => {

    try {

        const { usuario, contrasenia } = req.body
        const userLogin = await usuariosDao.findOneUser({ usuario });

        if (!userLogin) {
            return res.status(400).json({ msg: 'Usuario y/o Contraseña Incorrectos1' })
        }

        const passCheck = await bcryptjs.compare(contrasenia, userLogin.contrasenia);
        if (!passCheck) {
            return res.status(400).json({ msg: 'Usuario y/o Contraseña Incorrectos2' })
        }

        const jwt_payload = {
            user: {
                id: userLogin.id,
                username: userLogin.usuario,
                admin: userLogin.admin
            }
        }

        const token = jwt.sign(jwt_payload, process.env.JWT_SECRET, { expiresIn: process.env.TIME_EXP })
        userLogin.token = [token]
        await usuariosDao.ModifyUserToken(userLogin)
        res.json({ token, admin: userLogin.admin, id: userLogin.id, carritoID: userLogin.carritoID })

    } catch (error) {
        console.log('error', error);
        res.status(500).json({ msg: 'Error', error })
    }
}

exports.LogoutUser = async (req, res) => {
    try {

        await usuariosDao.LogoutUserRes(res.locals.user)
        res.json({ mensaje: 'Deslogueo ok' })

    } catch (error) {
        console.log('error', error);
        res.status(500).json({ msg: 'Error', error })
    }
}

exports.GetAllUsers = async (req, res) => {

    try {
        const usuarios = await usuariosDao.findAll()
        res.json({ usuarios })

    } catch (error) {
        console.log('error', error);
        res.status(500).json({ msg: 'Error', error })
    }
}

exports.GetOneUser = async (req, res) => {

    try {

        const id = req.params.id
        const oneUser = await usuariosDao.findOneId(id)

        res.json({ oneUser })

    } catch (error) {
        console.log('error', error);
        res.status(500).json({ msg: 'Error', error })
    }
}

exports.ModifyOneUser = async (req, res) => {

    try {

        const id = req.params.id
        const body = req.body

        const modUser = await usuariosDao.ModifyOneUser(id, body)
        res.json({ modUser })

    } catch (error) {
        console.log('error', error);
        res.status(500).json({ msg: 'Error', error })
    }
}

exports.DeleteOneUSer = async (req, res) => {

    try {

        const id = req.params.id

        const userSearch = await usuariosDao.findOneId(id)
        let idCart = await userSearch.carritoID
        let cartSearch = await carritosDao.findOneId(idCart)
        console.log('cartSearch', cartSearch);

        if (cartSearch.producto.length !== 0) {

            cartSearch.producto.splice(0, cartSearch.producto.length)
            cartSearch.save()

            cartSearch = await carritosDao.DeleteOneCart(idCart)
            const deleteUser = await usuariosDao.DeleteOneUser(id)

            res.json('eliminado')
        } else {

            cartSearch = await carritosDao.DeleteOneCart(idCart)
            const deleteUser = await usuariosDao.DeleteOneUser(id)

            res.json('eliminado')
        }

    } catch (error) {
        console.log('error', error);
        res.status(500).json({ msg: 'Error', error })
    }
}
