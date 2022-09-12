const express = require('express');
const app = express();
const mysql = require('mysql')
const cors = require('cors')

app.use(cors())
app.use(express.json())

// CONEXÃO COM BANCO
const db = mysql.createConnection({
    user: 'root',
    host: 'localhost',
    password: 'password',
    database: 'db_container'
})

//TESTE DE CONEXÃO
db.connect(function (err) {
    if (err) { throw err }
    else {
        console.log("Conectado a base de dados!")
    }
})


/*-------------------------------CRUD CONTAINERS-----------------------------------*/

// CREATE
app.post('/container/criar', (req, res) => {
    const nome = req.body.nome
    const cliente = req.body.cliente
    const tipo = req.body.tipo
    const status = req.body.status
    const categoria = req.body.categoria

    db.query('INSERT INTO container (nome, cliente, tipo, status, categoria) VALUES (?,?,?,?,?)',
        [nome, cliente, tipo, status, categoria], (err, result) => {
            if (err) {
                console.log(err)
            } else{
                console.log('container adicionado!');
            }
        }
    )
})

//READ
app.get("/containers", (req, res) => {
    db.query("SELECT * FROM container", (err, result) => {
        if (err) {
            console.log(err)
        } else {
            res.send(result)
        }
    })
})

//UPDATE
app.put('/container/update', (req, res) => {
    const id = req.body.id;
    const nome = req.body.nome;
    const cliente = req.body.cliente;
    const tipo = req.body.tipo;
    const status = req.body.status;
    const categoria = req.body.categoria;
    //update container set cliente='fff', tipo='40' where id='ABCD3333333';
    db.query("UPDATE container SET nome=?, cliente = ?,tipo = ?,status = ?,categoria = ? WHERE id = ?",
        [nome, cliente, tipo, status, categoria, id],
        (err, result) => {
            if (err) {
                console.log(err)
            } else {
                res.send(result)
            }
        }
    )
})

//DELETE
app.delete('/container/delete/:id', (req, res) => {
    const id = req.params.id;
    db.query("DELETE FROM container WHERE id = ?", id, (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
            console.log('container DELETADO!');
        }
    })
})



/*-------------------------CRUD MOVIMENTAÇÕES---------------------------------------*/

/* CREATE - MOVIMENTAÇÃO*/
app.post('/movimentacao/criar', (req, res) => {
    const id_container = req.body.id
    const tipo = req.body.tipo
    const inicio = req.body.inicio
    const fim = req.body.fim

    db.query("INSERT INTO movimentacao (id_container, tipo, inicio, fim) VALUES (?, ?, ?, ?)",
        [id_container, tipo, inicio, fim], (err, result) => {
            if (err) {
                console.log(err)
            }
        }
    )
})

//READ- MOVIMENTAÇÃO select * from movimentacao where id_container = '4'
app.get("/movimentacao/:id", (req, res) => {
    const id = req.params.id;
    db.query(`SELECT * FROM movimentacao WHERE id_container = ?`, id ,(err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    })
})

// /*UPDATE- MOVIMENTAÇÃO*/
app.put('/movimentacao/update', (req, res) => {

    const tipo = req.body.tipo
    const inicio = req.body.inicio
    const fim = req.body.fim
    const id = req.body.id


    db.query(`UPDATE movimentacao SET tipo=?, inicio=?, fim=? WHERE id = ?`,
        [tipo, inicio, fim, id],
        (err, result) => {
            if (err) {
                console.log(err)
            } else {
                res.send(result)
            }
        }
    )
})

///*DELETE- MOVIMENTAÇÃO*/
app.delete('/movimentacao/delete/:id', (req, res) => {
    const id = req.params.id;
    db.query("DELETE FROM movimentacao WHERE id = ?", id, (err, result) => {
        if (err) {
            console.log(err)
        } else {
            res.send(result)
        }
    })
})

/*------------------------RELATORIO---------------------------*/
app.get("/relatorio/movimentacoes", (req, res) => {
     db.query(`
     select c.cliente, count(*) as total_mov, m.tipo
     from movimentacao m join container c
     on m.id_container = c.id
     group by c.cliente, m.tipo`, (err, result) => {
         if (err) {
             console.log(err)
         } else {
             res.send(result)
         }
     })
 })

 app.get("/relatorio/impexp", (req, res) => {
    db.query(`SELECT count(categoria) AS quantidades FROM container GROUP BY categoria`, (err, result) => {
        if (err) {
            console.log(err)
        } else {
            res.send(result)
        }
    })
})


//RODAR API
app.listen(8080, () => { console.log("servidor rodando na porta 8080...") });