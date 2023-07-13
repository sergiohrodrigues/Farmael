import { atom } from "recoil";
import { Produto } from "../interface/Produto";

export const produtosGeral = atom<Produto[]>({
    key:'produtosGeral',
    default: []
})

export const ofertas = atom<Produto[]>({
    key:'ofertas',
    default: []
})

export const produtoClicado = atom({
    key:'produtoClicado',
    default: ''
})

export const favoritos = atom<Produto[]>({
    key:'favoritos',
    default: []
})

export const carrinho = atom<Produto[]>({
    key: 'carrinho',
    default: []
})

export const itemParaAtualizar = atom<Produto>({
    key: 'itemParaAtualizar',
    default: {
        id: 0,
        titulo: '',
        descricao: '',
        valor: 0,
        categoria: '',
        urlImage: '',
        quantidade: 0
    }
})