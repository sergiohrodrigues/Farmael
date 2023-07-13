import { useParams } from "react-router-dom"
import styled from "styled-components"
import { useRecoilValue, useSetRecoilState } from "recoil"
import { produtoClicado } from "../../state/atom"
import Card from "../../components/Card"
import { useEffect, useState } from 'react'
import { Produto } from "../../interface/Produto"

const PaginaProdutosContainer = styled.main`
    width: 90%;
    margin: auto;
    @media screen and (min-width: 768px){
        min-height: 61vh;
        display: flex;
        width: 90%;
        margin: 0 auto;
    }
    @media screen and (min-width: 1024px){
    }
`

const FiltroContainer = styled.section`
    display: none;
    @media screen and (min-width: 768px){
        width: 25%;
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
        padding: 0.5rem;
        margin-top: 2rem;
        details{
            summary{
                min-width: 185px;
                font-size: 1.3rem;
                padding: 0.5rem;
            }
            ul{
                margin: 0.5rem 0;
                display: flex;
                flex-direction: column;
                gap: 0.5rem;
                li{
                    font-size: 1.2rem;
                    padding: 0.5rem;
                }
                
            }
        }
    }
    @media screen and (min-width: 1024px){
        details{
            summary:hover{
                cursor: pointer;
                background-color: #9c9c9c;
                width: 80%;
            }
            li:hover{
                cursor: pointer;
                width: 80%;
                background-color: #9c9c9c;
            }
        }
    }
`

const ProdutosContainer = styled.section`
    margin-top: 2rem;
    text-align: center;
    h2{
        font-size: 2rem;
    }
    h2::first-letter{
        text-transform: uppercase;
    }
    @media screen and (min-width: 768px){
        text-align: left;
    }
    @media screen and (min-width: 1024px){
        width: 75%;
        margin-top: 2rem;
        h2{
            font-size: 2rem;
        }
        h2::first-letter{
            text-transform: uppercase;
        }
    }
`

const ListaProdutos = styled.ul`
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 2rem;
        margin: 2rem 0;
    @media screen and (min-width: 768px){
        flex-direction: row;
        flex-wrap: wrap;
        gap: 1rem;
    }
        
    @media screen and (min-width: 1024px){

    }
`

export default function PaginaProdutos(){

    const params = useParams()
    const categorias = ['Medicamentos', 'Linha Infantil', 'Beleza', 'Cabelo', 'Higiene Pessoal']

    const produto = useRecoilValue(produtoClicado)
    const setProduto = useSetRecoilState(produtoClicado)

    const [itens, setItens] = useState<Produto[]>([])

    useEffect(() => {
        const url = 'http://localhost:8080/produtos'

        fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }) 
            .then(response => response.json())
            .then(resposta => setItens(resposta))
            .catch(error => console.log('Authorization failed : ' + error.message));
    }, [])

    useEffect(() => {
        setProduto(String(params.produto))
    }, [setProduto, params.produto])

    const itensFiltrados = itens.filter(itemDaLista => {
        if(categorias.includes(produto)){
            const itensFiltradosPorCategorias = itemDaLista.categoria.includes(produto)
            return itensFiltradosPorCategorias
        } else {
            const itemFiltrado = itemDaLista.titulo.includes(produto)
            return itemFiltrado
        }
    })

    const categoriaMedicamentos = [
        {
            categoria: 'Medicamentos',
            opcoesCategoria: [
                {
                    opcao: 'Dipirona'
                },
                {
                    opcao: 'Buscopan'
                },
                {
                    opcao: 'Dipirona'
                },
                {
                    opcao: 'Buscopan'
                }
            ],
        }
    ]

    const categoriaInfantil = [
        {
            categoria: 'Linha Infantil',
            opcoesCategoria: [
                {
                    opcao: 'Mamadeira'
                },
                {
                    opcao: 'Fralda'
                },
                {
                    opcao: 'Mamadeira'
                },
                {
                    opcao: 'Fralda'
                }
            ],
        }
    ]

    const categoriaBeleza = [
        {
            categoria: 'Beleza',
            opcoesCategoria: [
                {
                    opcao: 'Perfume'
                },
                {
                    opcao: 'Maquiagem'
                },
                {
                    opcao: 'Perfume'
                },
                {
                    opcao: 'Maquiagem'
                }
            ],
        }
    ]

    const categoriaCabelo = [
        {
            categoria: 'Cabelo',
            opcoesCategoria: [
                {
                    opcao: 'Shampoo'
                },
                {
                    opcao: 'Condicionador'
                },
                {
                    opcao: 'Shampoo'
                },
                {
                    opcao: 'Condicionador'
                }
            ],
        }
    ]

    const categoriaHigiene = [
        {
            categoria: 'Higiene Pessoal',
            opcoesCategoria: [
                {
                    opcao: 'Desodorante'
                },
                {
                    opcao: 'Antitranspirante'
                },
                {
                    opcao: 'Desodorante'
                },
                {
                    opcao: 'Antitranspirante'
                }
            ],
        }
    ]

    return(
        <PaginaProdutosContainer>
            <FiltroContainer>
                    {categoriaMedicamentos.map((itemCategoria, index) => (
                        <details key={index}>
                            <summary >{itemCategoria.categoria}</summary>
                            {categoriaMedicamentos.map((itensOpcoes) => (
                                <ul>
                                    {itensOpcoes.opcoesCategoria.map((itemOpcao) => (
                                        <li onClick={() => setProduto(itemOpcao.opcao)}>{itemOpcao.opcao}</li>
                                    ))}
                                </ul>
                            ))}
                        </details>
                    ))}

                    {categoriaInfantil.map((itemCategoria, index) => (
                        <details key={index}>
                            <summary>{itemCategoria.categoria}</summary>
                            {categoriaInfantil.map((itensOpcoes) => (
                                <ul>
                                    {itensOpcoes.opcoesCategoria.map((itemOpcao) => (
                                        <li onClick={() => setProduto(itemOpcao.opcao)}>{itemOpcao.opcao}</li>
                                    ))}
                                </ul>
                            ))}
                        </details>
                    ))}

                    {categoriaBeleza.map((itemCategoria, index) => (
                        <details key={index}>
                            <summary>{itemCategoria.categoria}</summary>
                            {categoriaBeleza.map((itensOpcoes) => (
                                <ul>
                                    {itensOpcoes.opcoesCategoria.map((itemOpcao) => (
                                        <li onClick={() => setProduto(itemOpcao.opcao)}>{itemOpcao.opcao}</li>
                                    ))}
                                </ul>
                            ))}
                        </details>
                    ))}

                    {categoriaCabelo.map((itemCategoria, index) => (
                        <details key={index}>
                            <summary>{itemCategoria.categoria}</summary>
                            {categoriaCabelo.map((itensOpcoes) => (
                                <ul>
                                    {itensOpcoes.opcoesCategoria.map((itemOpcao) => (
                                        <li onClick={() => setProduto(itemOpcao.opcao)}>{itemOpcao.opcao}</li>
                                    ))}
                                </ul>
                            ))}
                        </details>
                    ))}

                    {categoriaHigiene.map((itemCategoria, index) => (
                        <details key={index}>
                            <summary>{itemCategoria.categoria}</summary>
                            {categoriaHigiene.map((itensOpcoes) => (
                                <ul>
                                    {itensOpcoes.opcoesCategoria.map((itemOpcao) => (
                                        <li onClick={() => setProduto(itemOpcao.opcao)}>{itemOpcao.opcao}</li>
                                    ))}
                                </ul>
                            ))}
                        </details>
                    ))}
            </FiltroContainer>

            <ProdutosContainer>
                <h2>{produto.length === 0 ? params.produto : produto}</h2>
                <ListaProdutos>
                    {itensFiltrados.map((item) => (
                        <Card item={item}/>
                    ))}
                </ListaProdutos>
            </ProdutosContainer>

        </PaginaProdutosContainer>
    )
}