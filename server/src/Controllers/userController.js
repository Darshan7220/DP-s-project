import User from "../Models/User.js"

import mongoose from "mongoose";

const getAllUsers = async (req, res) => {
    try {
        const admin = await User.find({ role: 'admin', isdelete: false })
        const sub_admin = await User.find({ role: 'sub_admin', isdelete: false })
        const users = await User.find({ role: 'user', isdelete: false })


        return res.status(200).send({ message: "all users ", users: users, admin: admin, sub_admin: sub_admin }
        )
    } catch (error) {
        res.status(500).send(error.message)
    }
}

const deleteUser = async (req, res) => {
    try {
        const { id } = req.params
        if (!id) {
            res.status(200).json({ status: false, message: "invalid user id " })
        }

        const deleteUser = await User.findByIdAndUpdate(
            id,
            { $set: { isdelete: true } },
            { new: true }
        )
        res.status(200).json({ message: "user deleted successfully", user: deleteUser })
    } catch (error) {
        res.status(500).send(error.message)
    }
}

const updateUser = async (req, res) => {
    try {
        const { firstname, lastname, username, email, phoneNumber, birthdate } = req.body
        const { id } = req.params;

        if (!id) {
            req.status(200).json({ status: false, message: "invalid user id" })
        }
        if (email && (await User.findOne({ email, _id: { $ne: id } }))) {
            req.status(200).json({ status: false, message: "Email is alredy taken" })
        }
        if (username && (await User.findOne({ username, _id: { $ne: id } }))) {
            req.status(200).json({ status: false, message: "invalid user id" })
        }

        let user = { firstname, lastname, username, email, phoneNumber, birthdate, }
        const updateUser = await User.findByIdAndUpdate(
            id,
            { $set: user },
            { new: true }
        )

        return res.status(200).json({
            status: true,
            message: "user updated successfully",
            user: updateUser
        })

    } catch (error) {
        console.log(error.message, "error in update user");
        res.status(500).send(error.message)
    }
}

const activeInactiveUser = async (req, res) => {
    const { id } = req.params;
    const { status } = req.body
    console.log(status, "activeInactiveUser");

    try {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ status: false, error: "Invalid user ID" });
        }

        const activeInactive = await User.findByIdAndUpdate(
            id,
            { $set: { isActive: status } },
            { new: true }
        )
        if (!activeInactive) {
            res.status(404).json({ status: false, error: "user not found" })
        }
        return res.status(200).json({ status: true, message: "User active/Inactive successfully", user: activeInactive })

    } catch (error) {
        console.log(error.message, "error in update user");
        res.status(500).send(error.message)
    }
}

export { getAllUsers, deleteUser, updateUser, activeInactiveUser }