var fs = require("fs");
var http = require("http");

http
  .createServer(function(req, res) {
    var newFile = fs.createWriteStream("uploadedFile");
    var fileBytes = req.headers["content-length"];
    var uploadedBytes = 0;

    req.on("readable", function() {
      var chunk = null;
      while (null !== (chunk = req.read())) {
        uploadedBytes += chunk.length;
        var progress = (uploadedBytes / fileBytes) * 100;
        res.write("Progress: " + parseInt(progress, 10) + "%\n");
        console.log("Progress: " + parseInt(progress, 10) + "%\n");
      }
    });

    req.pipe(newFile);
  })
  .listen(8080);
