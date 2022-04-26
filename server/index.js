

const express = require("express")
const app = express();
const cors = require("cors");

app.use(cors());
app.use(express.json());

app.listen(3001, () => {
    console.log("rodando servidor");
});

app.get('/pdf/:params', (req, res) => {
    const { params } = req.params;
    console.log(params)
    console.log(JSON.parse(params))
    res.send(JSON.parse(params))
});

