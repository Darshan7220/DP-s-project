import httpStatus from 'http-status';
import jwt from 'jsonwebtoken';


const Auth = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];

        if (!token) {
            return res.status(httpStatus.UNAUTHORIZED).send({
                status: false,
                message: 'Please authenticate.'
            })
        }

        const decoded = jwt.verify(token, process.env.SECRET_KEY)

        req.authUser = decoded;
        next();

    } catch (error) {
        return res.status(500).json({ status: false, message: error.message })
    }
}

export default Auth