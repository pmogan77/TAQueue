const express = require('express');
const app = express();
const port = process.env.PORT || 5000;


app.use((req, res, next) => {
    console.log(`${req.method} request for '${req.url}'`);
    next();
});

app.get("/api/test", (req, res) => {
    res.send("Hello World!");
});

app.listen(port, () => console.log(`Listening on port ${port}`));