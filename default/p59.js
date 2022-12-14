var http = require("http");

var srv = http.createServer(function (req, res) {
  res.writeHead(200, { "Content-Type": "text/plain" });
  res.end("okay");
});

srv.on("upgrade", function (req, socket, head) {
  socket.write(
    "HTTP/1.1 101 Web Socket Protocol Handshake\r\n" +
      "Upgrade: WebSocket\r\n" +
      "Connection: Upgrade\r\n" +
      "\r\n"
  );

  socket.pipe(socket);
});

srv.listen(1337, "127.0.0.1", function () {
  var options = {
    port: 1337,
    hostname: "127.0.0.1",
    headers: {
      Connection: "Upgrade",
      Upgrade: "websocket",
    },
  };

  var req = http.request(options);
  req.end();

  req.on("upgrade", function (res, socket, upgradeHead) {
    console.log("got upgraded!");
    socket.end();
    process.exit(0);
  });
});
