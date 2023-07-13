import databaseConnection from "../utils/database"
import Produto from "../models/produto"

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
    await databaseConnection()
    // await Produto.findByIdAndDelete(id)
    await Produto.deleteOne({id})
}

export const updateProduto = async (id, newBody) => {
    await databaseConnection()
    // await Produto.findByIdAndUpdate(id, newBody)
    await Produto.updateOne({id}, newBody)
}