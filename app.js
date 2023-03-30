import express from "express";
import session from "express-session";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import getTemplate from "./public/util/getTemplate.js";

const app = express();

app.use(cookieParser());
app.use(
  session({
    secret: "secret-key",
    resave: false,
    saveUninitialized: false,
  })
);
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("public"));

app.get("/", function (req, res) {
  getTemplate
    .getPage("FRONT_PAGE")
    .then(function (frontpage) {
      res.send(frontpage);
    })
    .catch(function (error) {
      console.log(error);
      res.status(500).send("Server Error");
    });
});

const handleNotepadRequest = async (req, res) => {
  const type = req.params.type;
  const notepad = await getTemplate.getPage("NOTEPAD", type);
  res.send(notepad);
};

app.get("/notepad/:type", handleNotepadRequest);

app.get("/create-note", async (req, res) => {
  res.send(await getTemplate.getPage("CREATE_NOTE"));
});

app.post("/create-note", async (req, res) => {
  const type = req.body.notetype;
  const content = req.body.noteinput;
  if (
    ["terminal-commands", "code-snippets", "theory", "tools"].includes(type)
  ) {
    createNote(type, content);
    res.redirect(`http://localhost:8080/notepad/${type}`);
  } else {
    res.send("Invalid type");
  }
});

const requireLogin = (req, res, next) => {
  if (!req.session.user) {
    res.redirect("/login");
  } else {
    next();
  }
};

app.get("/admin", requireLogin, async (req, res) => {
  const adminPage = await getTemplate.getPage("ADMIN");
  res.send(adminPage);
});

app.get("/login", async (req, res) => {
  const login = await getTemplate.getPage("LOGIN");
  res.send(login);
});

app.get("/logout", (req, res) => {
  req.session.destroy();
  res.redirect("/login");
});

app.get("/getLogin", (req, res) => {
  const username = req.session.user;
  res.send(`${username}`);
});

const PORT = 8080;
app.listen(PORT, (error) => {
  if (error) {
    console.log(error);
  }
  console.log("Server running on", PORT);
});
