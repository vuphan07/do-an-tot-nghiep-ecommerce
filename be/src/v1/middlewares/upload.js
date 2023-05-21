const cloudinary = require("../databases/init.cloudinary");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const { getFileName } = require("../utils/getFileName.js");
const multer = require("multer");

const storage = new CloudinaryStorage({
  cloudinary: cloudinary.v2,
  params: {
    folder: "clothing",
    public_id: (req, file) => {
      return `${Date.now()}-${getFileName(file.originalname)}`;
    },
  },
});

const upload = multer({ storage: storage });

module.exports = upload;
