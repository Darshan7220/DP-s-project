
import util from 'util';
import multer from "multer"
import { v4 as createUUID } from 'uuid';

const maxsize = 2 * 1024 * 1024 * 1024;
const base = process.cwd()
console.log(base, "base for upload avatar");

const storage = multer.diskStorage({
    destination: (req, file, cd) => {
        const path = `${base}/upload/${req.body.folder ?? "avatar"}`
        Fs.mkdirsSync(path);
        cd(null, path);
    },
    filename: (req, file, cd) => {
        const ext = path.extname(file.originalname);
        const virtual_image = `av-${new Date().valueOf()}${ext}`
        cd(null, req.body.folder ? `${createUUID()}${ext}` : virtual_image)
        req.body.avatar = virtual_image;
    }
})

const uploadFile = multer({
    storage: storage,
    limits: { fileSize: maxsize }
})

export const uploadAvatar = util.promisify(uploadFile.single('avatar'));