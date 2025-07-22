const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send("<h1>Hello You! 0_0</h1>");  
});

const PORT = 3002;
app.listen(PORT, () => {
    console.log(`app running on port ${PORT}`);
});