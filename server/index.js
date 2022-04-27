import { mainTable } from '../server/db/main_table2.js'
import { generatePdf } from '../server/modules/jspdf.js'
import  express from "express"
import cors from "cors"

const app = express();

app.use(cors());
app.use(express.json());

app.listen(3001, () => {
    console.log("rodando servidor");
});

app.get('/pdf/:params', (req, res) => {
    const { answers } = req.params;
    const table = mainTable;
    const grouped_content = generatePdf({ table, answers })
    res.send(grouped_content)
});

