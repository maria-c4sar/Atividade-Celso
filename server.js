import express from "express";

import sql2 from "mysql2";

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
    console.log("Dados Recebidos: ", req.body);

    const { nomeProd, precoCompra, quantidade} = req.body;

    const sql = "INSERT INTO produtos (nomeProd, PrecoCompra, Quantidade) VALUES (?, ?, ?)";
    dados.query(sql, [nomeProd, precoCompra, quantidade], (err, result) => {
        if(err){
            console.error('Erro ao inserir dados: ', err);
            return res.status(500).send('Erro ao inserir dados.')
        }
        res.redirect('/');
    });
})

app.post('/deleti', (req, res) => {

    const { idProduto } = req.body;

    const sql = "DELETE FROM produtos WHERE id = ?"

    dados.query(sql, [idProduto], (err, result) => {
        if (err) throw err;
        if (result.affectedRows > 0){
            console.log(`Produto com ID: ${idProduto} deletado com sucesso!`, result);
        }else{
            res.status(404).send('Produto não encontrado.', result);
        }
        res.redirect('/')
    })

});

app.listen(3001, () => {
    console.log(`Server running on http://localhost:3001`)
})