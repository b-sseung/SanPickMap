const express = require('express');
const app = express();
const PORT = 5500;

app.use(express.static(__dirname + "/src", {
  extensions: ['html', 'htm'],
}));
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/src/main.html");
});

// 서버 실행
app.listen(PORT, function() {
  console.log(PORT);
});