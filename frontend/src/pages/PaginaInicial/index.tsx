import styled from "styled-components"
import { useEffect, useState } from "react"
import { Produto } from "../../interface/Produto"
import Card from "../../components/Card"

const ContainerInicio = styled.section`
    min-height: 30vh;
    width: 90%;
    margin: 4rem auto;
`

const Oferta = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    span{
        display: block;
        background-color: #000;
        width: 30%;
        height: 1px;
    }
    h2{
        font-size: 2rem;
        padding: 0 1rem;
    }
`

const ContainerItem = styled.ul`
    display: flex;
    justify-content: center;
    gap: 0.5rem;
    margin-top: 1rem;
    overflow-x: auto;
    li{
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 0.5rem;
        width: 150px;
        img{
            width: 70%;
            height: 150px;
        }
        div{
            min-height: 55px;
            text-align: center;
            display: flex;
            flex-direction: column;
            gap: 1rem;
            justify-content: space-between;
        }
    }
    h2{
        width: 100%;
        text-align: center;
        margin: 2rem 0;
        font-size: 2rem;
    }
`

export default function PaginaInicial(){
    const [listaItensOfertas, setListaItensOfertas] = useState<Produto[]>([])

    useEffect(() => {
        const url = 'http://localhost:8080/ofertas'
        fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(r => r.json())
        .then(res => setListaItensOfertas(res))
        .catch(err => console.log('Authorization failed : ' + err.message))
    }, [])

    return(
        <ContainerInicio>
                <Oferta>
                    <span /> <h2>Ofertas</h2> <span />
                </Oferta>
                <ContainerItem>
                    {listaItensOfertas.length === 0
                    ? <h2>Sem ofertas no momento </h2>
                    : listaItensOfertas.map((item) => (
                        <Card key={item.id} item={item}/>
                    ))}
                </ContainerItem>
        </ContainerInicio>
    )
}