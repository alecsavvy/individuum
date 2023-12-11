import http from "http";

http
  .createServer((req, res: http.ServerResponse) => {
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.write("hello world!");
    res.end();
  })
  .listen(8080);

console.log("Server running at port 8080");
