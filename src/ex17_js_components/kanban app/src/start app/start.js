const path = require('path');
const express = require('express');
const open = require('open');

const app = express();
app.use(express.static(path.join(__dirname, '../../')));
app.listen(3000);

(async () => {
  await open('http://localhost:3000/', { app: 'chrome' });
})();