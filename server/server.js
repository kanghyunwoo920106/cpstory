const express = require("express");
const path = require("path");
const app = express();
const router = express.Router();
const db = require("./database/db_connect");
const multer = require("multer");
// const cors = require("cors");
app.use(express.json());
// app.use(cors());

// app.use(cors({
//   origin: ['http://localhost:3000','http://localhost:8000'],
//   credentials: true,
//   optionsSuccessStatus: 200
// }));

app.use(express.static(path.join(__dirname, "/build")));

// app.get("/", function (req, res, next) {
//   res.sendFile(path.join(__dirname, "/build/index.html"));
// });

app.get("/getdata", function (req, res) {
  db.query("SELECT * FROM data order by startdate DESC", function (err, data) {
    if (!err) {
      res.send({ photodata: data });
    } else {
      console.log(`err:` + err);
      res.send(err);
    }
  });
});

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // cb(null, "../client/public/upload/"); //로컬
    cb(null, "./build/upload/"); //서버

    // cb(null, "./upload/");
  },
  filename: (req, file, cb) => {
    const newFileName = file.originalname;
    cb(null, newFileName);
  },
});

const upload = multer({ storage: storage });

app.post("/insert", upload.array("image"), (req, res) => {
  console.log(req.body);
  for (let i = 0; i < req.files.length; i++) {
    db.query(
      `INSERT INTO data(title,description,image,startdate,enddate,address) VALUES('${req.body.title}','${req.body.description}','${req.files[i].filename}','${req.body.startdate}','${req.body.enddate}','${req.body.address}')`
    );
  }

  res.send({ state: "200", message: "success" });
});

app.post("/search", (req, res) => {
  db.query(
    `SELECT * FROM data WHERE title LIKE '%${req.body.keyword}%' OR description LIKE '%${req.body.keyword}%'`,
    (err, data) => {
      if (!err) res.send({ state: "200", message: "success", data: data });
      else res.send(err);
    }
  );
});

app.post("/delete", (req, res) => {
  db.query(`DELETE FROM data WHERE idx = '${req.body.idx}'`, (err, data) => {
    if (!err) res.send({ state: "200", message: "success" });
    else res.send(err);
  });
});

app.get("/reset", (req, res) => {
  db.query(`DELETE FROM data`, (err, data) => {
    if (!err) res.send({ state: "200", message: "success" });
    else res.send(err);
  });
});
// dd
module.exports = router;

app.listen(8000, function () {
  console.log("listening on 8000");
});
