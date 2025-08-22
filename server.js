import express from "express";

import sql2 from "mysql2";;;;

import path from "path";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true })); 
app.use(express.static(path.join(process.cwd(), 'client')));

const dados = sql2.createConnection({
    host: "localhost", 
    user: "root",
    database: "loja",
    port: "3309"
})

app.get('/', (req, res) => {
    res.sendFile(path.join(process.cwd(), "client", "loja.html"))
})

app.post("/cadastrar", (req, res) => {

})

app.listen(3001, () => {
    console.log(`Server running on http://localhost:3001`)
})