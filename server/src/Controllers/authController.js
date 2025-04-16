import User from "../Models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email })
        if (!user) return res.status(404).send("User not found")

        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return res.status(400).send('Invalid credentials')
        }

        const token = jwt.sign({ _id: user._id, role: user.role }, process.env.SECRET_KEY, { expiresIn: '24h' })
        res.status(200).json({
            status: true,
            user: user,
            token,
        })

    } catch (error) {
        res.status(500).send(error.message)
    }
}

const register = async (req, res) => {
    try {
        const { firstname, lastname, username, email, password, role, phoneNumber, birthdate, adharNumber } = req.body;
        console.log("Received data:", req.body);
        if (!password) {
            return res.status(400).send({ status: false, message: "Password is required" });
        }

        const existingUser = await User.findOne({ $or: [{ email }, { username }] })
        if (existingUser) {
            return res.status(200).send({
                status: false,
                message: "username or email already exists"
            })
        }
        const hashPassword = await bcrypt.hash(password, 10);

        const mewUser = new User({
            firstname, lastname, username, email, password: hashPassword, phoneNumber, birthdate,
            adharNumber: role === 'sub_admin' || role === 'user' ? adharNumber : undefined,
            role,
            avatar: req.body.avatar ? 'avatar/' + req.body.avatar : undefined
        });
        console.log(mewUser, "mewUser");

        await mewUser.save();
        res.status(200).send({
            status: true,
            message: 'Registration successful'
        })
    } catch (error) {
        console.log(error.message, "error from register");

        res.status(500).send(error.message)
    }
}

const superAdmin = async (req, res) => {
    try {
        const existingSuperAdmin = await User.findOne({ role: "super_admin" })
        if (existingSuperAdmin) {
            res.status(200).send({
                status: false,
                message: "super admin already exists"
            })
        }
        const hashedPassword = await bcrypt.hash("Super_admin@404", 10);
        const superAdmin = new User({
            username: "superadmin",
            email: "superadmin@example.com",
            password: hashedPassword,
            role: "super_admin",
        })
        await superAdmin.save();
        res.status(200).send({
            status: true,
            message: "super admin created successfully"
        })
    } catch (error) {
        res.status(500).send(error.message)
    }
}

export {
    login,
    register,
    superAdmin,
}
