import { User } from "../models/User.js"
import jwt from 'jsonwebtoken'
const secret = 'esteeselsecreto'

//GET all user info
export async function getUsersInfo(req, res) {
    //Recorre todas las filas y genera un arreglo
    try {
        const users = await User.findAll()
        res.status(200).json(users)
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

//GET user info
export async function getUserInfo(req, res) {
    try {
        const token = req.headers['x-access-token']
        if (!token) {
            return res.status(401).json({
                auth: false,
                message: 'No estás autorizado'
            })
        }
        const decoded = jwt.verify(token, secret)
        console.log(decoded)
        const { id } = decoded
        const user = await User.findOne({
            where: {
                id
            }
        })
        if (!user) return res.status(404).json({ message: 'Usuario no existe' })

        res.status(200).json(user)
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

//ADD new user
export async function addUser(req, res) {
    console.log(req.file)
    /* console.log(JSON.parse(req.body.data)) */
    try {
        const { name, yearexp, specialty, email, password } = JSON.parse(req.body.data)
        //Validate email
        const user = await User.findOne({
            where: {
                email
            }
        })
        if (user) return res.status(401).json({
            auth: false,
            message: 'Email ya registrado'
        })
        if (!req.file) return res.status(404).json({ message: 'No hay archivos cargados' })
        const img = req.file.filename
        //Convert pass
        const encryptPass = await User.encryptPass(password)
        const newUser = await User.create({
            name,
            yearexp,
            specialty,
            email,
            status: false,
            admin: false,
            img,
            password: encryptPass
        })
        const { id } = newUser

        //Create token
        const token = jwt.sign({ id }, secret, {
            expiresIn: 60 * 60 * 24
        })

        res.status(201).json({ auth: true, token: token })
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

//Login
export async function login(req, res) {
    const { email, password } = req.body
    try {
        const user = await User.findOne({
            where: {
                email
            }
        })
        if (!user) return res.status(404).json({
            auth: false,
            message: 'Usuario no existe'
        })
        const passValid = await User.validatePass(password, user.password)
        if (!passValid) {
            return res.status(401).json({
                auth: false,
                message: 'Contraseña incorrecta'
            })
        }
        //Create token
        const token = jwt.sign({ id: user.id }, secret, {
            expiresIn: 60 * 60 * 24
        })
        res.status(201).json({ auth: true, token: token })
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

//Upload
export async function uploadIMG(req, res) {
    console.log(req.file)
    try {
        if (!req.file) return res.status(404).json({ message: 'No hay archivos cargados' })
        const token = req.headers['x-access-token']
        if (!token) {
            return res.status(401).json({
                auth: false,
                message: 'No estás autorizado'
            })
        }
        const decoded = jwt.verify(token, secret)
        const { id } = decoded
        const user = await User.findByPk(id)
        if (!user) return res.status(404).json({ message: 'Usuario no existe' })
        const imgUrl = req.file.filename
        user.img = imgUrl
        await user.save()
        res.status(201).json({ auth: true, message: "Imagen subida" })
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

//Change status
export async function changeStatus(req, res) {
    try {
        console.log(req.body)
        const user = await User.findByPk(req.params.id)
        user.status = req.body.status
        await user.save()
        res.status(201).json({ auth: true, message: "Estado cambiado" })
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

export async function modifyUserInfo(req, res) {
    try {
        const { name, yearexp, specialty, password } = req.body
        const token = req.headers['x-access-token']
        if (!token) {
            return res.status(401).json({
                auth: false,
                message: 'No estás autorizado'
            })
        }
        const decoded = jwt.verify(token, secret)
        console.log(decoded)
        const { id } = decoded
        const user = await User.findByPk(id)
        const encryptPass = await User.encryptPass(password)
        user.name = name
        user.encryptPass = req.body.encryptPass
        user.yearexp = yearexp
        user.specialty = specialty
        await user.save()
        res.status(201).json({ auth: true, message: "Perfil actualizado" })
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

//DELETE a car
export async function deleteUser(req, res) {
    try {
        const token = req.headers["x-access-token"]
        if (!token) {
            return res.status(401).json({
                auth: false,
                message: 'No estás autorizado'
            })
        }
        const decoded = jwt.verify(token, secret)
        const idUser = decoded.id
        const user = await User.findByPk(idUser)
        if (!user) return res.status(404).json({ message: 'Este usuario no existe'})
        //busca y elimina el dato deseado
        const deleteuser = await User.destroy({
            where: {
                id:idUser
            }
        })
        console.log(deleteuser)
        //204 no develve nada pero todo fue bien
        res.status(200).json({auth:true, deleteuser})
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}