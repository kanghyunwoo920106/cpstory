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

app.get("/getinfo", function (req, res, next) {
  db.query("SELECT * FROM app_info", function (err, data) {
    if (!err) {
      res.send({ status: 200, message: "success", app_info: data });
    }
  });
});

app.post("/updateinfo", (req, res) => {
  db.query(
    `UPDATE app_info SET app_name = '${req.body.appTitle}' WHERE idx=1`,

    (err, data) => {
      if (!err) res.send({ state: "200", message: "success", data: data });
      else res.send(err);
    }
  );
});

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
  try {
    const { title, description, startdate, enddate, address } = req.body;
    const images = req.files.map((file) => file.filename);

    for (let i = 0; i < images.length; i++) {
      db.query(
        `INSERT INTO data(title,description,image,startdate,enddate,address) VALUES('${title}','${description}','${images[i]}','${startdate}','${enddate}','${address}')`
      );
    }

    res.send({ status: 200, message: "success" });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Internal Server Error" });
  }
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
    if (!err) res.send({ state: "200", messsage: "success", result: data });
    else res.send(err);
  });
});

app.get("/reset", (req, res) => {
  db.query(`DELETE FROM data`, (err, data) => {
    if (!err) res.send({ state: "200", message: "success", result: data });
    else res.send(err);
  });
  db.query(`DELETE FROM diary`);
});

app.get("/get/diary", function (req, res) {
  db.query("SELECT * FROM diary order by date DESC", function (err, data) {
    if (!err) {
      res.send({ diarydata: data });
    } else {
      console.log(`err:` + err);
      res.send(err);
    }
  });
});

app.post("/insert/diary", (req, res) => {
  try {
    const { diaryKey, diary, date } = req.body;
    db.query(
      `INSERT INTO diary(diaryKey, one_write, date) VALUES(${diaryKey},'${diary}', '${date}')`,
      (err, data) => {
        if (!err) {
          res.send({ status: 200, message: "success", diarydata: data });
        } else res.send(err);
      }
    );
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Internal Server Error" });
  }
});

app.post("/update/diary", (req, res) => {
  const { diaryKey, diary } = req.body;

  db.query(
    `UPDATE diary SET one_write = '${diary}' WHERE diaryKey=${diaryKey}`,

    (err, data) => {
      if (!err) res.send({ state: "200", message: "success", data: data });
      else res.send(err);
    }
  );
});

app.post("/delete/diary", (req, res) => {
  const { diaryKey } = req.body;

  db.query(`DELETE FROM diary WHERE diaryKey = '${diaryKey}'`, (err, data) => {
    if (!err) res.send({ state: "200", messsage: "success", result: data });
    else res.send(err);
  });
});

module.exports = router;

app.listen(8000, function () {
  console.log("listening on 8000");
});
