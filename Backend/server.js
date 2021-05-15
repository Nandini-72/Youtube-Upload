const express = require("express");
const youtube = require("youtube-api");
const { v4: uuidv4 } = require("uuid");
const cors = require("cors");
const open = require("open");
const multer = require("multer");
const fs = require("fs");
const CREDENTIALS = require("./new.json");

const app = express();
app.use(express.json());
app.use(cors());
uuidv4();

let link = "Not uploaded yet"
const storage = multer.diskStorage({
  destination: "./",
  filename(req, file, cb) {
    const newFileName = `${uuidv4()}-${file.originalname}`;
    cb(null, newFileName);
  },
});
const uploadVideoFile = multer({
  storage: storage,
}).single("videoFile");

app.post("/upload", uploadVideoFile, (req, res) => {
  if (req.file) {
    const filename = req.file.filename;
    const { title, description } = req.body;
    open(
      oauth.generateAuthUrl({
        access_type: "offline",
        scope: ["https://www.googleapis.com/auth/youtube.upload"],
        state: JSON.stringify({
          filename,
          title,
          description,
        }),
      })
    );
  }
});
app.get("/oauth2callback", (req, res) => {
  const { filename, title, description } = JSON.parse(req.query.state);
  oauth.getToken(req.query.code, (err, tokens) => {
    if (err) {
      console.log(err);
      return;
    } else {
      oauth.setCredentials(tokens);
      youtube.videos.insert(
        {
          resource: {
            // Video title and description
            snippet: {
              title,
              description,
            },
            status: {
              privacyStatus: "private",
            },
          },
          // This is for the callback function
          part: "snippet,status",

          // Create the readable stream to upload the video
          media: {
            body: fs.createReadStream(filename),
          },
        },
        (err, re) => {
          console.log("Done");
          if(err === null){
            link = `your video is updated successfully https://youtu.be/${re.data.id}`
            res.redirect("http://localhost:3000/")
          }
          else{
            res.redirect("http://localhost:3000/fail")
          }
          console.log(err);
        }
      );
    }
  });
});
app.get("/link", (req, res) => {
  res.send(link);
});
let oauth = youtube.authenticate({
  type: "oauth",
  client_id: CREDENTIALS.web.client_id,
  client_secret: CREDENTIALS.web.client_secret,
  redirect_url: CREDENTIALS.web.redirect_uris[0],
});

app.listen(5000, (req, res) => {
  console.log("Server is running on port 5000");
});
