var express = require('express');
var cors = require('cors');
require('dotenv').config()

var app = express();
const multer = require('multer');
const upload = multer({ dest: '' }); // default dir for temporary files

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// /api/fineanalyse post req returns json response
app.post('/api/fileanalyse', upload.single("upfile"), (req, res) => {
  var fileName = req.file.originalname;
  var fileType = req.file.mimetype;
  var fileSize = req.file.size;

  res.json({
    name: fileName,
    type: fileType,
    size: fileSize
  });
});

const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});
