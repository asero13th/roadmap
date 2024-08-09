import jwt from 'jsonwebtoken';
import { tokenBlackList } from './tokenBlackList';

const authMiddleware = (req, res, next) => {
    const token = req.header("Authorization")?.split(" ")[1];

    if (!token){
        res.status(401).json({message: "Unauthorized"});
    }

    if (tokenBlackList.isTokenBlackListed(token)){
        res.status(401).json({message: "Unauthorized"});
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).json({message: "Unauthorized"});
    }
}
export default authMiddleware;  