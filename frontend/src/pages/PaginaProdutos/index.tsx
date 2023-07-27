import { useParams } from "react-router-dom"
import styled from "styled-components"
import { useRecoilValue, useSetRecoilState } from "recoil"
import { produtoClicado } from "../../state/atom"
import Card from "../../components/Card"
import { useEffect, useState } from 'react'
import { Produto } from "../../interface/Produto"
import { categoriasMenu } from "../../utilidade/categoriasMenu"

const PaginaProdutosContainer = styled.main`
    width: 90%;
    margin: auto;
    @media screen and (min-width: 768px){
        min-height: 61vh;
        display: flex;
        width: 95%;
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
            summary:hover{
                cursor: pointer;
                background-color: #9c9c9c;
                width: 100%;
            }
            li:hover{
                cursor: pointer;
                width: 100%;
                background-color: #9c9c9c;
            }
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
                    width: 100%;
                    font-size: 1.2rem;
                    padding: 0.5rem;
                }
                
            }
            details{
                margin-left: 1rem;
                min-width: 218px;
                summary{
                    font-size: 1rem;
                }
                ul{
                    li{
                        font-size: 1rem;
                    }
                }
            }
        }
    }
    @media screen and (min-width: 1024px){
        width: 21%;
        details{
            summary:hover{
                cursor: pointer;
                background-color: #9c9c9c;
                width: 95%;
            }
            li:hover{
                cursor: pointer;
                width: 95%;
                background-color: #9c9c9c;
            }
            details{
                margin-left: 2rem;
                summary{
                    font-size: 1.3rem;
                }
                ul{
                    li{
                        font-size: 1.2rem;
                    }
                }
            }
        }
    }
`

const ProdutosContainer = styled.section`
    margin-top: 2rem;
    text-align: center;
    h2{
        font-size: 2rem;
        text-transform: lowercase;
    }
    h2::first-letter{
        text-transform: uppercase;
    }
    @media screen and (min-width: 768px){
        text-align: left;
    }
    @media screen and (min-width: 1024px){
        width: 79%;
        margin-top: 2rem;
        h2{
            font-size: 2rem;
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

    const medicamentos = ['Dor e Febre', 'Azia e Má Digestão', 'Gripe e Resfriado', 'Primeiros Socorros', 'Genéricos', 'Éticos']
    const infantil = ['Mamadeira', 'Fralda', 'Acessórios']
    const perfumaria = ['Perfume', 'Maquiagem', 'Shampoo', 'Condicionador', 'Desodorante','Antitranspirante']

    const um = medicamentos.concat(infantil)
    const categorias = um.concat(perfumaria)

    const params = useParams()

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
    }, [])

    const itensFiltrados = itens.filter(itemDaLista => {
        if(categorias.includes(produto)){
            const itensFiltradosPorCategorias = itemDaLista.categoria.includes(produto)
            return itensFiltradosPorCategorias
        } else {
            switch(produto){
                case 'Medicamentos': return medicamentos.includes(itemDaLista.categoria)
                case 'Linha Infantil': return infantil.includes(itemDaLista.categoria)
                case 'Perfumaria': return perfumaria.includes(itemDaLista.categoria)
            }
        }
    })

    return(
        <PaginaProdutosContainer>
            <FiltroContainer>
                {categoriasMenu.map((item) => (
                    <details key={item.categoria}>
                        <summary>{item.categoria}</summary>
                        <ul>
                            {item.subcategorias.map((sub, index) => (
                                <li key={index} onClick={() => setProduto(sub.item)}>{sub.item}</li>
                            ))}
                        </ul>
                    </details>
                ))}
            </FiltroContainer>

            <ProdutosContainer>
                <h2>{produto.length === 0 ? params.produto : produto}</h2>
                <ListaProdutos>
                    {itensFiltrados.map((item, index) => (
                        <Card key={index} item={item}/>
                    ))}
                </ListaProdutos>
            </ProdutosContainer>

        </PaginaProdutosContainer>
    )
}