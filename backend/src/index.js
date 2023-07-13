import express from 'express'
import bodyParser from 'body-parser'
import produtoController from './controllers/produto'
import ofertaController from './controllers/oferta'
import cors from 'cors'

const app = express()
const port = 8080

// require("./utils/database")

app.use(bodyParser.json())
app.use(express.static('public'));

app.use(cors())

app.get('/', (req, res) => {
  res.send('GET!')
})

app.use('/produtos', produtoController)

app.use('/ofertas', ofertaController)

app.listen(port, () => {
  console.log(`App rodando em http://localhost:${port}`)
})