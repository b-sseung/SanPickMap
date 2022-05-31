const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.static(__dirname + "/js"));
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/html/main.html");
});

// 서버 실행
app.listen(PORT, function() {
  console.log(PORT);
});