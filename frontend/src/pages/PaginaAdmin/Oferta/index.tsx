import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody } from "@mui/material"
import { useState, useEffect } from "react"
import { FaRegEdit, FaTrash } from "react-icons/fa"
import styled from "styled-components"
import { Produto } from "../../../interface/Produto"

const ContainerOferta = styled.section`
    min-height: 90vh;
    width: 100%;
    background-color: #fff;
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    gap: 1rem;
    h3{
        font-size: 1.5rem;
    }
    svg:hover{
        cursor: pointer;
    }
`

interface Props {
    abrirModal: (oQueDesejaFazer: string) => void,
    setId: React.Dispatch<React.SetStateAction<string>>,
    fetchProduto: () => void,
    setItemParaAtualizar: React.Dispatch<React.SetStateAction<Produto | undefined>>
}

export default function Oferta({abrirModal, setId, fetchProduto, setItemParaAtualizar}: Props){

    const [produtosOfertas, setProdutosOfertas] = useState<Produto[]>([])

    useEffect(() => {
        const url = 'http://localhost:8080/ofertas'

        fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }) 
        .then(response => response.json())
        .then(resposta => setProdutosOfertas(resposta))
        .catch(error => console.log('Authorization failed : ' + error.message));
    }, [produtosOfertas])

    function atualizarItem(item: Produto){
        setItemParaAtualizar(item)
        abrirModal('atualizar')
        fetchProduto()
        setId(item.id.toString())
    }

    function deletarItem(id: number){
        fetch(`http://localhost:8080/ofertas/${id}`, {
            method: 'DELETE'
        })
        fetchProduto()
    }

    return(
        <ContainerOferta>
            <TableContainer component={Paper}>
                <Table aria-label="simple table">
                    <TableHead>
                    <TableRow>
                        <TableCell align='center'>Produtos</TableCell>
                        <TableCell align="left">Descrição</TableCell>
                        <TableCell align="center">Categoria</TableCell>
                        <TableCell align="center">Valor</TableCell>
                        <TableCell align="center">Atualizar</TableCell>
                        <TableCell align="center">Deletar</TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {produtosOfertas.map((item) => (
                        <TableRow
                        key={item.id}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                        <TableCell component="th" scope="row" width={200} align='center'>
                            {item.titulo}
                        </TableCell>
                        <TableCell align="left" width={600}>{item.descricao}</TableCell>
                        <TableCell align="center">{item.categoria}</TableCell>
                        <TableCell align="center">R${item.valor},00</TableCell>
                        <TableCell align="center"><FaRegEdit size={20} onClick={() => atualizarItem(item)}/></TableCell>
                        <TableCell align="center"><FaTrash size={20} onClick={() => deletarItem(item.id)}/></TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </ContainerOferta>
    )
}