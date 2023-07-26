import { Produto } from "../../interface/Produto"
import { MdOutlineFavoriteBorder, MdFavorite } from 'react-icons/md'
import { useRecoilValue, useSetRecoilState } from "recoil"
import { carrinho } from "../../state/atom"
import { useState, useEffect } from "react"
import {  favoritos } from "../../state/atom"
import { BsCartPlus, BsCartXFill } from 'react-icons/bs'
import styled from "styled-components"
import ModalProdutos from "../ModalProdutos"

const Item = styled.li`
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    gap: 0.5rem;
    width: 70%;
    max-width: 200px;
    padding: 0.5rem;
    position: relative;
    height: 300px;
    img{
        width: 50%;
        height: 150px;
    }
    .favorite{
        position: absolute;
        right: 0;
        font-size: 1.8rem;
    } 
    .favorite:hover{
        cursor: pointer;
        color: red;
    }
    .item-detalhes{
        text-align: center;
        height: 100px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        gap: 0.5rem;
    }
    button{
        width: 165px;
        margin: 0 auto;
    }
    @media screen and (min-width: 768px){
    }
    
    @media screen and (min-width: 1024px){
        max-width: 200px;
        &&:hover{
            border: 1px solid #000;
        }
        .detalhes{
            display: none;
        }
        .item-detalhes{
            height: 130px;
        }
        img:hover{
            cursor: pointer;
        }
        &:active{
            border: none;
        }
        button:hover{
            cursor: pointer;
        }
    }
`

interface Props {
    item: Produto
}

export default function Card({item}: Props){

    const [btnCarrinho, setBtnCarrinho] = useState(false)
    const [favorito, setFavorito] = useState(false)

    const listaDeCarrinho = useRecoilValue(carrinho)
    const setListaDeCarrinho = useSetRecoilState<Produto[]>(carrinho)

    const listaDeFavoritos = useRecoilValue(favoritos)
    const setListaDeFavoritos = useSetRecoilState<Produto[]>(favoritos)


    useEffect(() => {
        const listaDeCarrinhoLocalStorage = localStorage.getItem('listaDeCarrinho');
        const listaDeFavoritosLocalStorage = localStorage.getItem('listaDeFavoritos');
        const listaDeCarrinhoLocalStorageConvertida = JSON.parse(listaDeCarrinhoLocalStorage || '[]');
        const listaDeFavoritosLocalStorageConvertida = JSON.parse(listaDeFavoritosLocalStorage || '[]');
        if(listaDeCarrinhoLocalStorageConvertida.length > 0 || listaDeFavoritosLocalStorageConvertida.length > 0){
          const hasCarrinhoInList = listaDeCarrinhoLocalStorageConvertida.find((itemLista : Produto) => itemLista.id === item.id);
          setListaDeCarrinho(listaDeCarrinhoLocalStorageConvertida);
          setBtnCarrinho(hasCarrinhoInList);

          const hasFavoritosInList = listaDeFavoritosLocalStorageConvertida.find((itemLista : Produto) => itemLista.id === item.id);
          setListaDeFavoritos(listaDeFavoritosLocalStorageConvertida);
          setFavorito(hasFavoritosInList);
        } else {
          setListaDeCarrinho([]);
          setListaDeCarrinho([]);
        }
      }, [item.id, setListaDeCarrinho, setListaDeFavoritos]);


    function adicionarAosFavoritos(item: Produto){
        const itemSelecionado = listaDeFavoritos.some((itemLista) => itemLista.id === item.id)
        if(!itemSelecionado){
            const novaLista = [...listaDeFavoritos, item]
            setListaDeFavoritos(novaLista)
            setFavorito(true)
            localStorage.setItem('listaDeFavoritos', JSON.stringify(novaLista));
        } else {
            alert('Item já adicionado a lista')
        }
    }

    function removerDosFavoritos(item: number){
        const novaLista = listaDeFavoritos.filter((itemLista) => itemLista.id !== item)
        setListaDeFavoritos(novaLista)
        setFavorito(false)
        localStorage.setItem('listaDeFavoritos', JSON.stringify(novaLista));
    }
    
    function adicionarAoCarrinho(){
        const itemSelecionado = listaDeCarrinho.some((itemLista) => itemLista.id === item.id)
        if(!itemSelecionado){
            const novaLista = [...listaDeCarrinho, item]
            setListaDeCarrinho(novaLista)
            setBtnCarrinho(true)
            localStorage.setItem('listaDeCarrinho', JSON.stringify(novaLista));
        } else {
            alert('Item já adicionado a lista')
        }
    }
    
    function removerDoCarrinho(){
        const novaLista = listaDeCarrinho.filter((itemLista) => itemLista.id !== item.id)
        setListaDeCarrinho(novaLista)
        setBtnCarrinho(false)
        localStorage.setItem('listaDeCarrinho', JSON.stringify(novaLista));
    }

    useEffect(() => {
        const itemJaNoCarrinho: any = listaDeCarrinho.find((itemLista : Produto) => itemLista.id === item.id)
        setBtnCarrinho(itemJaNoCarrinho)
        const itemJaEmFavoritos: any = listaDeFavoritos.find((itemLista : Produto) => itemLista.id === item.id)
        setFavorito(itemJaEmFavoritos)
    }, [listaDeCarrinho, item.id, listaDeFavoritos])

    useEffect(() => {
        disabledScrollBody(false)
    }, [])

    function disabledScrollBody(isDisable : boolean){
        if(typeof window !== undefined){
            document.body.style.overflow = isDisable ? 'hidden' : 'auto'
        }
    }

    const [modalIsOpen, setModalIsOpen] = useState(false)

    function abrirModal(){
        disabledScrollBody(true)
        setModalIsOpen(true)
    }

    return(
        <>
        <Item key={item.id}>
            {favorito ? <MdFavorite className="favorite" color="red" onClick={() => removerDosFavoritos(item.id)}/> : <MdOutlineFavoriteBorder className="favorite" onClick={() => adicionarAosFavoritos(item)}/>}
            <img src={item.urlImage} alt="Imagem do produto" onClick={abrirModal}/>
            <div className="item-detalhes">
                <h3>{item.titulo}</h3>
                <span>R${item.valor},00</span>
                <button className="detalhes" onClick={abrirModal}>Mais detalhes</button>
                {btnCarrinho 
                ? <button onClick={() => removerDoCarrinho()}>
                    Remover do carrinho
                    <BsCartXFill size={25}/>
                </button> 
                : <button onClick={() => adicionarAoCarrinho()}>
                    Adicionar ao carrinho
                    <BsCartPlus size={25}/>
                </button>}
            </div>
        {modalIsOpen ? <ModalProdutos disabledScrollBody={disabledScrollBody} setModalIsOpen={setModalIsOpen} item={item}/> : null}
        </Item>
        </>
    )
}