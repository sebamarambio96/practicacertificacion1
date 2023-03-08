import express from "express";
import htmlRoutes from "./src/routes/html.routes.js";
import userRoutes from "./src/routes/user.routes.js";
import cors from 'cors';
import path from 'path';
import { v4 } from 'uuid';
import multer from 'multer';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express()

//middlewares
//Multer
const storage = multer.diskStorage({
    destination: path.join(__dirname, './public/img/uploads'),
    filename: (req, file, cb ) => {
        cb(null, v4() + path.extname(file.originalname.toLocaleLowerCase()))
    }
})
app.use(multer({
    storage,
    dest: path.join(__dirname, './public/img/uploads'),
    limits: {fileSize: 10000000},
    fileFilter: (req, file,cb)=>{
        const filetypes = /jpeg|jpg|png|gif/
        const mimetype = filetypes.test(file.mimetype);
        const extname = filetypes.test(path.extname(file.originalname).toLowerCase())
        if (mimetype && extname) {
            return cb(null, true)
        }
        cb("error: el archivo debe ser una imagen")
    }
}).single('profileImg'))

app.use(express.static(path.join(__dirname,'public')))
app.use(express.static('public'))
app.use(cors())
app.use(express.json())
app.use(htmlRoutes)
app.use(userRoutes)

export default app
