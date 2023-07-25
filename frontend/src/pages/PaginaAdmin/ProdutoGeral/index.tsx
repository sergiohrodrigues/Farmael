import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useState } from "react"
import styled from "styled-components"
import { useEffect } from 'react'
import { Produto } from '../../../interface/Produto';
import { FaRegEdit, FaTrash } from 'react-icons/fa'
import axios from 'axios';
import { type } from 'os';

const ContainerOferta = styled.section`
    min-height: 90vh;
    background-color: #fff;
    text-align: center;
    /* display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center; */
    gap: 1rem;
    h3{
        font-size: 1.5rem;
    }
    svg:hover{
        cursor: pointer;
    }
    h2{
        text-align: center;
        margin: 0 auto;
    }
    form{
        width: 20%;
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
        button{
            width: 30%;
            margin-left: 35%;
            padding: 0.5rem;
        }
        button:hover{
            cursor: pointer;
        }
        div{
            width: 100%;
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            label{
                font-size: 1.3rem;
            }
            input{
                width: 90%;
                padding: 0.5rem;
                outline: none;
            }
        }
        select{
            width: 100%;
            padding: 0.5rem;
            margin-top: 0.5rem;
        }
        /* #sucess{
            display: none;
        } */
    }
`

interface Props {
    abrirModal: (oQueDesejaFazer: string) => void,
    setId: React.Dispatch<React.SetStateAction<string>>,
    listaProdutosGeral: Produto[],
    fetchProduto: () => void,
    setItemParaAtualizar: React.Dispatch<React.SetStateAction<Produto | undefined>>
}

export default function ProdutoGeral({abrirModal, setId, listaProdutosGeral, fetchProduto, setItemParaAtualizar}: Props){

    function atualizarItem(item: Produto){
        setItemParaAtualizar(item)
        abrirModal('atualizar')
        fetchProduto()
        setId(item.id.toString())
    }

    console.log(listaProdutosGeral)
    
    const deletarItem = async (item: Produto) => {
        // const img = item.urlImage.substring(21, 50)
        // const path = 'public'
        // const pathImagem = path + img

        fetch(`http://localhost:8080/produtos/${item.id}`, {
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
                    {listaProdutosGeral.map((item) => (
                        <TableRow
                        key={item.titulo}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                        <TableCell component="th" scope="row" width={200} align='center'>
                            {item.titulo}
                        </TableCell>
                        <TableCell align="left" width={600}>{item.descricao}</TableCell>
                        <TableCell align="center">{item.categoria}</TableCell>
                        <TableCell align="center">R${item.valor},00</TableCell>
                        <TableCell align="center"><FaRegEdit size={20} onClick={() => atualizarItem(item)}/></TableCell>
                        <TableCell align="center"><FaTrash size={20} onClick={() => deletarItem(item)}/></TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </ContainerOferta>
    )
}