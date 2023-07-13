import databaseConnection from "../utils/database"
import Oferta from "../models/oferta"

export const listaOferta = async () => {
    await databaseConnection()
    const ofertas = await Oferta.find()
    const cloneOfertas = JSON.parse(JSON.stringify(ofertas))
    const modifyOfertas = cloneOfertas.map((produto) => {
        //.env prod/dev
        const path = 'http://localhost:8080/uploads/'
        produto.urlImage = path + produto.fileNameImage
        return produto
    })
    return modifyOfertas
}

export const createOferta = async (user) => {
    await databaseConnection()
    const createdOferta = await Oferta.create(user)
    return createdOferta
}

export const deleteOferta = async (id) => {
    await databaseConnection()
    await Oferta.deleteOne({id})
}

export const updateOferta = async (id, newBody) => {
    await databaseConnection()
    await Oferta.updateOne({id}, newBody)
}