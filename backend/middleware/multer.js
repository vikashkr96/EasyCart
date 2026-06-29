import multer from "multer";
import path from "path";
import fs from "fs";

const uploadPath = path.join(process.cwd(), "uploads");

// Create uploads folder automatically if not exists
if (!fs.existsSync(uploadPath)) {
    fs.mkdirSync(uploadPath);
}


const storage = multer.diskStorage({

    destination: function(req, file, cb){
        cb(null, uploadPath);
    },

    filename: function(req, file, cb){
        cb(null, Date.now() + "-" + file.originalname);
    }

});


const upload = multer({
    storage
});


export default upload;