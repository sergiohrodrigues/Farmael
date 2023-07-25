import databaseConnection from "../utils/database"
import Produto from "../models/produto"
import { unlink } from 'node:fs'

export const listaProduto = async () => {
    await databaseConnection()
    const produtos = await Produto.find()
    const cloneProdutos = JSON.parse(JSON.stringify(produtos))
    const modifyProdutos = cloneProdutos.map((produto) => {
        //.env prod/dev
        const path = 'http://localhost:8080/uploads/'
        produto.urlImage = path + produto.fileNameImage
        return produto
    })
    return modifyProdutos
}

export const createProduto = async (user) => {
    await databaseConnection()
    const createdUser = await Produto.create(user)
    return createdUser
}

export const deleteProduto = async (id) => {
    const produtos = await Produto.find()
    const produtoSelecionado = produtos.filter(prod => prod.id === id)
    const pathImagem = produtoSelecionado[0].fileNameImage

    await databaseConnection()
    // await Produto.findByIdAndDelete(id)
    await Produto.deleteOne({id})
    
    unlink(`public/uploads/${pathImagem}`, (err) => {
      if (err) throw err;
      console.log('path/file.txt was deleted');
    });
}

export const updateProduto = async (id, newBody) => {
    await databaseConnection()
    // await Produto.findByIdAndUpdate(id, newBody)
    await Produto.updateOne({id}, newBody)
}