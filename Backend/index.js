import express from "express";
const app = express();
import bodyParser from "body-parser";
import mongoose from "mongoose";
import usersRoute from "./route/Users.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";
import Info from "./db/schema.js"
import { OCRinfo } from "./ocr.js";


const PORTADD = process.env.PORT || 5000;

dotenv.config();
app.use(express.json());
app.use(bodyParser.json());
app.use(cors());
app.use(cookieParser());
app.use(express.static('public'))

app.use("/api/users", usersRoute);

const connectionParams = {
};

const db = "mongodb+srv://aaryagarg:fJ37ZV9T@F!W.2*@idocr.yvcgtev.mongodb.net/?retryWrites=true&w=majority";
mongoose.connect(db, connectionParams)
  .then(() => {
    console.log("Successfully Connected to database ");
  })
  .catch((err) => { 
    console.error(`Error connecting to the database. \n${err}`);
  });

mongoose.connection.on("disconnected", () => {
  console.log("Connection Disconnected");
});

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      return cb(null, "./public/Images");
    },
    filename: function (req, file, cb) {
      return cb(null, `${Date.now()}_${file.originalname}`);
    },
});
const upload = multer({
    storage,
});


app.post("/upload", upload.single("file"), async (req, res) => {
    console.log(req.file);
    const path = req.file.destination + "/" + req.file.filename;
    console.log(path);
    const data = await OCRinfo(path);
    console.log(data);
    Info.create({
      image : req.file.filename ,
      identificationNumber : data.identificationNumber,
      firstName : data.firstName , 
      lastName : data.lastName , 
      dateOfBirth : data.dateOfBirth ,
      dateOfExpiry : data.dateOfExpiry ,
      dateOfIssue : data.dateOfIssue
    })
    .then(result => res.json(result))
    .catch(err => {console.log(err)})
});

app.use("/", (req, res) => {
    return res.send("OCR-App backend");
});

app.listen(PORTADD, () => {
    console.log(`Listening to port ${PORTADD}`);
});
