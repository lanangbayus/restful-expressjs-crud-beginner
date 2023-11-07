const path = require("path");
const { v4: uuidv4 } = require("uuid");
const express = require("express");
const methodOverride = require("method-override");
const app = express();
const port = 8080;

app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(methodOverride("_method"));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

let comments = [
  // sebelumnya menggunakan const tapi diganakan let agar bisa di ubah
  {
    id: uuidv4(),
    username: "Sugeng",
    text: "Setiap hari aku selalu sehat, karena aku anak sehat!",
  },
  {
    id: uuidv4(),
    username: "Budi",
    text: "Aku adalah anak paling sopan, karena aku anak yang berbudi!",
  },
  {
    id: uuidv4(),
    username: "Andri",
    text: "Aku tidak ingat apa-apa!",
  },
  {
    id: uuidv4(),
    username: "Keceng",
    text: "Kenapa aku susah sekali gemuk!",
  },
  {
    id: uuidv4(),
    username: "Lemu",
    text: "Ingin sekali aku kurus tapi aku sudah terlanjut keenakan dengan keadaanku yang sekarang!",
  },
];

app.get("/comments", (req, res) => {
  res.render("comments/index", { comments });
});

app.get("/comments/create", (req, res) => {
  res.render("comments/create");
});

app.post("/comments", (req, res) => {
  const { username, text } = req.body;
  comments.push({ username, text, id: uuidv4() });
  res.redirect("/comments");
});

app.get("/comments/:id", (req, res) => {
  const { id } = req.params;
  const comment = comments.find((c) => c.id === id);
  res.render("comments/show", { comment });
});

app.get("/comments/:id/edit", (req, res) => {
  const { id } = req.params;
  const comment = comments.find((c) => c.id === id);
  res.render("comments/edit", { comment });
});

app.patch("/comments/:id", (req, res) => {
  const { id } = req.params;
  const newComment = req.body.text;
  const foundComment = comments.find((c) => c.id === id);
  foundComment.text = newComment;
  res.redirect("/comments");
});

app.delete("/comments/:id", (req, res) => {
  const { id } = req.params;
  comments = comments.filter((c) => c.id !== id);
  res.redirect("/comments");
});

app.get("/order", (req, res) => {
  res.send("GET order response");
});

app.post("/order", (req, res) => {
  const { item, qty } = req.body;
  res.send(`Item : ${item}, Qty : ${qty}`);
});

app.listen(port, () => {
  console.log(`Server is running on: http://localhost:${port}`);
});
