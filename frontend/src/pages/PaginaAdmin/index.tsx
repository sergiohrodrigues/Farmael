import { useState, useEffect } from 'react'
import styled from 'styled-components'
import Login from './Login'
import Oferta from './Oferta'
import ProdutoGeral from './ProdutoGeral'
import { IoMdAddCircleOutline } from 'react-icons/io'
import ModalProduto from './ModalProduto'
import { Produto } from '../../interface/Produto'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { produtosGeral } from '../../state/atom'

const HeaderAdmin = styled.header`
    background-color: #278a5b;
    padding: 1rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    span{
        margin-right: 2rem;
    }
    button{
        background-color: transparent;
        border: none;
    }
    button:hover{
        cursor: pointer;
    }
    svg{
        font-size: 2rem;
    }
    svg:hover{
        cursor: pointer;
    }
`
export default function PaginaAdmin(){
    const [loginSucess, setLoginSucess] = useState(false)
    const [opcaoSucess, setOpcaoSucess] = useState(false)
    const [opcao, setOpcao] = useState('')
    const [modalOpen, setModalOpen] = useState(false)
    const [operacao, setOperacao] = useState('')
    const [id, setId] = useState('')
    const [itemParaAtualizar, setItemParaAtualizar] = useState<Produto>()

    const listaProdutosGeral = useRecoilValue(produtosGeral)
    const setListaProdutosGeral = useSetRecoilState(produtosGeral)
    
    function chamarOpcaoClicada(opcao : string){
        setOpcao(opcao)
    }

    function abrirModal(oQueDesejaFazer: string){
        setModalOpen(true)
        disabledScrollBody(true)
        setOperacao(oQueDesejaFazer)
    }

    useEffect(() => {
        disabledScrollBody(false)
        fetchProduto()
    }, [])

    function disabledScrollBody(isDisable : boolean){
        if(typeof window !== undefined){
            document.body.style.overflow = isDisable ? 'hidden' : 'auto'
        }
    }

    function fetchProduto(){
        const url = 'http://localhost:8080/produtos'

        fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }) 
            .then(response => response.json())
            .then(resposta => setListaProdutosGeral(resposta))
            .catch(error => console.log('Authorization failed : ' + error.message));
    }
    
    return(
        <>
            {loginSucess 
            ? ''
            : <Login setOpcao={setOpcao} setLoginSucess={setLoginSucess} setOpcaoSucess={setOpcaoSucess}/>}

            {opcaoSucess
            ? <HeaderAdmin>
                <div>
                    <span>Pagina de Administrador</span>
                    <button style={{ borderBottom: opcao === 'produtos' ? '2px solid #000' : 'none'}} onClick={() => chamarOpcaoClicada('produtos')}>Produtos(geral)</button>
                    <button style={{ borderBottom: opcao === 'ofertas' ? '2px solid #000' : 'none' }} onClick={() => chamarOpcaoClicada('ofertas')}>Ofertas</button>
                </div>
                <IoMdAddCircleOutline className='add' onClick={() => abrirModal('criar')}/>
            </HeaderAdmin>
            : ''
            }

            <ModalProduto modalOpen={modalOpen} setModalOpen={setModalOpen} disabledScrollBody={disabledScrollBody} operacao={operacao} opcao={opcao} id={id} fetchProduto={fetchProduto} itemParaAtualizar={itemParaAtualizar} setItemParaAtualizar={setItemParaAtualizar}/>

            {opcao === 'produtos' ? <ProdutoGeral abrirModal={abrirModal} setItemParaAtualizar={setItemParaAtualizar} setId={setId} listaProdutosGeral={listaProdutosGeral} fetchProduto={fetchProduto}/> : ''}
            {opcao === 'ofertas' ? <Oferta abrirModal={abrirModal} setId={setId} fetchProduto={fetchProduto} setItemParaAtualizar={setItemParaAtualizar}/> : ''}
        </>
    )
}