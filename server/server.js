const express = require("express");
const path = require("path");
const app = express();
const router = express.Router();
const db = require("./database/db_connect");
const multer = require("multer");
const bodyParser = require("body-parser");
app.use(express.json());
app.use(bodyParser.json());

const jwt = require("jsonwebtoken");
const secretKey = "mysecretkey";

app.use(express.static(path.join(__dirname, "/build")));

app.get("/", function (req, res, next) {
  // res.sendFile(path.join(__dirname, "/build/index.html"));
  res.send({ message: "ok" });
});

app.post("/insert/signup", (req, res) => {
  try {
    const { firstName, lastName, id, password } = req.body;

    db.query(
      `INSERT INTO member(firstName,lastName, id, password) VALUES('${firstName}','${lastName}','${id}','${password}')`,
      function (err, data) {
        if (!err) {
          res.send({ memberData: data });
        } else {
          console.log(err);
        }
      }
    );
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Internal Server Error" });
  }
});

app.post("/login", function (req, res) {
  const { id, password } = req.body;
  db.query(
    `SELECT * FROM member WHERE id = '${id}' AND password = '${password}'`,
    function (err, data) {
      if (err) {
        res.status(500).send({ status: 500, message: "internal server error" });
      } else if (data.length === 0) {
        res.status(401).send({ status: 401, message: "unauthorized" });
      } else {
        // JWT 발급
        const accessToken = jwt.sign({ id: data[0].id }, secretKey, {
          expiresIn: "1h",
        });
        res.cookie("access_token", accessToken, {
          httpOnly: true,
          secure: true,
        });
        res.send({
          status: 200,
          message: "success",
          accessToken: accessToken,
          member: data,
        });
      }
    }
  );
});

app.get("/auth", function (req, res) {
  // JWT 검증
  const accessToken = req.cookies.access_token;
  try {
    const decoded = jwt.verify(accessToken, secretKey);
    const userId = decoded.id;

    // 사용자 정보 반환
    db.query(
      `SELECT * FROM member WHERE id = '${userId}'`,
      function (err, data) {
        if (!err) {
          res.send({ status: 200, message: "success", user: data });
        }
      }
    );
  } catch (err) {
    res.status(401).send({ status: 401, message: "unauthorized" });
  }
});

app.get("/get/info", function (req, res, next) {
  db.query("SELECT * FROM app_info", function (err, data) {
    if (!err) {
      res.send({ status: 200, message: "success", app_info: data });
    }
  });
});

app.post("/update/info", (req, res) => {
  db.query(
    `UPDATE app_info SET app_name = '${req.body.appTitle}' WHERE idx=1`,

    (err, data) => {
      if (!err) res.send({ state: "200", message: "success", data: data });
      else res.send(err);
    }
  );
});

app.get("/get/data", function (req, res) {
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
    // cb(null, "../client/public/upload");

    cb(null, "./upload/");
  },
  filename: (req, file, cb) => {
    const newFileName = file.originalname;
    cb(null, newFileName);
  },
});

const upload = multer({ storage: storage });

app.post("/insert/post", upload.array("image"), (req, res) => {
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
