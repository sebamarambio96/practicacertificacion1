import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";
import bcrypt from "bcryptjs";


export const User = sequelize.define('users', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    yearexp: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    specialty: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    status: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    img: {
        type: DataTypes.STRING
    },
    admin: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
    }
}, {
    timestamps: true
}
)

// Class Method
User.encryptPass = async function (password) {
    const salt = await bcrypt.genSalt(10)
    return bcrypt.hash(password, salt)
};

User.validatePass = async function (pass, passDB) {
    return bcrypt.compare(pass, passDB)
};