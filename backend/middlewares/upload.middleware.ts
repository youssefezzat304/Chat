import multer from "multer";

const profilePicturesStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "../Database/Profile-Pictures");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "--" + file.originalname);
  },
});

export const uploadProfilePictureMiddleware = multer({
  storage: profilePicturesStorage,
});
