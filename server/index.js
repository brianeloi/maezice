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
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type'); // If needed
    res.setHeader('Access-Control-Allow-Credentials', true); // If needed

    res.send('cors problem fixed:)');

    const { params } = req.params;
    const table = mainTable;
    const answers = JSON.parse(params)
    const grouped_content = generatePdf({ table, answers })
    //console.log(grouped_content)
    res.send(grouped_content)
});

