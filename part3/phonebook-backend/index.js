const express = require('express');
const app = express();

app.use(express.json());

app.get('/api/persons', (req, res) => {
  console.log(req);
});

const PORT = 3002;
app.listen(PORT, () => {
    console.log(`app running on port ${PORT}`);
});