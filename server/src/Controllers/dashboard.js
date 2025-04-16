import User from "../Models/User.js";


const dashboardCount = async (req, res) => {
    try {
        const [adminCount, subAdminCount, userCount] = await Promise.all([
            User.aggregate([
                { $match: { isdelete: false, role: "admin" } },
                { $count: "count" }
            ]),
            User.aggregate([
                { $match: { isdelete: false, role: "sub_admin" } },
                { $count: "count" }
            ]),
            User.aggregate([
                { $match: { isdelete: false, role: "user" } },
                { $count: "count" }
            ])
        ]);
        console.log("counts", adminCount, subAdminCount, userCount);

        return res.status(200).json({
            message: "dashboard counts",
            count: { adminCount, subAdminCount, userCount }
        })

    } catch (error) {
        console.log(error.message, "error from dashboard count");
        res.status(500).send(error.message)
    }
}

export {
    dashboardCount,
}