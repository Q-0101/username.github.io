const http = require("http");
const url = require("url");

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);

  if (parsedUrl.pathname === "/alert") {
    const level = parsedUrl.query.level;
    console.log("Water level:", level);

    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end("OK");
  } else {
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end("Server running");
  }
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, "0.0.0.0", () => {
  console.log("Server listening on port", PORT);
});
