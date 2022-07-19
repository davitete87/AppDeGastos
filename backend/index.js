const express = require('express')
const cors = require("cors");

const app = express()
app.use(cors())

const port = 3000


const transactions = [
    {
        "transactionType": "Egreso",
        "txtDesc": "Triple Mc",
        "txtMonto": "6",
        "txtCat": "Alimentos",
        "transactionId": 1
    },

    {
        "transactionType": "Ingreso",
        "txtDesc": "Sueldo",
        "txtMonto": "999",
        "txtCat": "Otros",
        "transactionId": 3
    }
];

app.get('/', (req, res) => {
    res.send('Ingresaron al localhost por get')
})

app.get('/transactions', (req, res) => {
    res.send(transactions)
})

app.get('/transactions/:id', (req, res) => {
    const transactionId = req.params.id
    const selectedTransaction = transactions.filter(transactions => transactions.transactionId == transactionId)
    res.send(selectedTransaction)
})

app.post('/transactions', (req, res) => {
    const transaction = "transaccion a enviar";
    transactions.push(transaction)
    res.send("Se guardo ok")
})

app.listen(port, () => {
    console.log(`Me estoy ejecutando en el puerto: ${port}`)
})