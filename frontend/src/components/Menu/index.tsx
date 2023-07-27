import { FaHeadset } from 'react-icons/fa'
import { AiOutlineUser, AiOutlineMail } from 'react-icons/ai'
import { BsCart2,BsFillTelephoneFill, BsWhatsapp } from 'react-icons/bs'
import styled from 'styled-components'
import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { carrinho, favoritos, produtoClicado } from '../../state/atom'
import { MdOutlineFavoriteBorder } from 'react-icons/md'
import { categoriasMenu } from '../../utilidade/categoriasMenu'
import { Badge } from '@mui/material'
import { GiHamburgerMenu } from 'react-icons/gi'
import { RiCloseFill } from 'react-icons/ri'
import { Produto } from '../../interface/Produto'

const HeaderContainer = styled.header`
    position: relative;
    @media screen and (min-width: 1024px){
        display: flex;
        flex-direction: column;
    }
`

const PrimeiroMenu = styled.section`
background-color: #278a5b;
display: flex;
flex-direction: column;
align-items: center;
justify-content: space-evenly;
padding: 0.5rem 0;
gap: 0.5rem;
position: relative;
img{
   width: 150px;
   height: 70px;
}
input{
    padding: 0.5rem;
    outline: none;
    order: 3;
}
.btn-menu-mobile{
    position: absolute;
    bottom: 5%;
    right: 5%;
}
div{
    display: flex;
    gap: 1rem;
    position: relative;
    svg{
        font-size: 1.5rem;
        color: #fff;
    }
    svg:hover{
        cursor: pointer;
    }
}
@media screen and (min-width: 768px){
    flex-direction: row;
    input{
        order: 0;
    }
    .btn-menu-mobile{
        display: none;
    }
}
@media screen and (min-width: 1024px){
    div{
        display: flex;
        gap: 1rem;
        position: relative;
        svg{
            font-size: 1.5rem;
            color: #fff;
        }
        svg:hover{
            cursor: pointer;
        }
    }
}
`

const UlIcones = styled.ul<Props>`
    display: none;
    @media screen and (min-width: 1024px){
        background-color: #fff;
        box-shadow: 0 0 20px #000;
        position: absolute;
        top: 120%;
        right: -240%;
        display: ${props => props.display};
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 1rem;
        padding: 1rem 1rem;
        text-align: center;
        z-index: 99;
        li{
            a{
                text-decoration: none;
                color: #000;
            }
            span{
                display: flex;
                align-items: center;
                justify-content: center;
                margin-bottom: 0.2rem;
                svg{
                    color: #000;
                }
            }
        }
        li:hover{
            cursor: pointer;
            text-decoration: underline;
        }
    }
`

const SegundoMenu = styled.nav<{display: string}>`
    width: 100%;
    background-color: #dedede;
    box-shadow: 0 0 10px #000;
    display: ${props => props.display};
    justify-content: center;
    flex-direction: column;
    padding: 2rem 0;
    position: absolute;
    gap: 2rem;
    span{
        text-transform: uppercase;
        font-size: 1.2rem;
        text-align: center;
    }
    span:hover{
        cursor: pointer;
    }
    
@media screen and (min-width: 768px){
    position: static;
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    padding: 0.5rem 0;
    box-shadow: 0 0 10px #000;
}
@media screen and (min-width: 1024px){
    background-color: #dedede;
    position: relative;
    span{
        text-transform: uppercase;
        font-size: 1.2rem;
    }
    span:hover{
        cursor: pointer;
    }
}
`

interface Props {
    display: string
}

const UlItens = styled.ul<Props>`
    display: none;
    @media screen and (min-width: 1024px){
        width: 90vw;
        display: ${props => props.display};
        position: absolute;
        background-color: #dedede;
        flex-direction: column;
        align-items: center;
        gap: 1rem;
        margin-top: 0.5rem;
        padding: 1rem 0;
        top: 79%;
        z-index: 99;
        li{
            padding: 0.5rem 0;
            font-size: 1.5rem;
        }
        li:hover{
            width: 90%;
            cursor: pointer;
            background-color: #278a5b;
            text-align: center;
        }
    }
`


export default function Menu() {

    const [medicamentos, setMedicamentos] = useState(false)
    const [contato, setContato] = useState(false)

    const listaDeCarrinho = useRecoilValue(carrinho)
    const setListaDeCarrinho = useSetRecoilState(carrinho)
    const listaDeFavoritos = useRecoilValue(favoritos)
    const setListaDeFavoritos = useSetRecoilState(favoritos)

    useEffect(() => {
        const listaDeCarrinhoLocalStorage = localStorage.getItem('listaDeCarrinho');
        const listaDeFavoritosLocalStorage = localStorage.getItem('listaDeFavoritos');
        const listaDeCarrinhoLocalStorageConvertida = JSON.parse(listaDeCarrinhoLocalStorage || '[]');
        const listaDeFavoritosLocalStorageConvertida = JSON.parse(listaDeFavoritosLocalStorage || '[]');
        if(listaDeCarrinhoLocalStorageConvertida.length !== 0 || listaDeFavoritosLocalStorageConvertida.length !== 0){
          setListaDeCarrinho(listaDeCarrinhoLocalStorageConvertida);
          setListaDeFavoritos(listaDeFavoritosLocalStorageConvertida);
        }
      }, [setListaDeCarrinho, setListaDeFavoritos]);
    
    function abrirMenuContato(){
        setMedicamentos(false)
        setContato(true)
        setCategoriaAtiva('')
    }

    interface Categorias {
        opcao: string
    }

    const [categoriaAtiva, setCategoriaAtiva] = useState('')
    const [opcoesCategorias, setOpcoesCategorias] = useState<Categorias[]>([])

    useEffect(() => {
        if(!categoriaAtiva){
            return
        }
        const Medicamentos = [
            {opcao: 'Dor e Febre'},
            {opcao: 'Azia e Má Digestão'},
            {opcao: 'Gripe e Resfriado'}, 
            {opcao: 'Primeiros Socorros'},
            {opcao: 'Genéricos'},
            {opcao: 'Éticos'},
        ]

        const Infantil = [
            {opcao: 'Mamadeira'},
            {opcao: 'Fralda'},
            {opcao: 'Acessórios'}
        ]

        const Perfumaria = [
            {opcao: 'Perfume'},
            {opcao: 'Maquiagem'},
            {opcao: 'Shampoo'}, 
            {opcao: 'Condicionador'},
            {opcao: 'Desodorante'},
            {opcao: 'Antitranspirante'}
        ]

        switch(categoriaAtiva){
            case 'Medicamentos':
                setOpcoesCategorias(Medicamentos);
                break
            case 'Linha Infantil':
                setOpcoesCategorias(Infantil);
                break
            case 'Perfumaria':
                setOpcoesCategorias(Perfumaria);
                break
        }
    }, [categoriaAtiva])

    const navigate = useNavigate()

    const produto = useRecoilValue(produtoClicado)
    const setProduto = useSetRecoilState(produtoClicado)

    function mouseEmCategoria(item: string){
        setCategoriaAtiva(item)
        setMedicamentos(true)
        setContato(false)
    }
    
    function clickCategoriasEOpcoes(item: string){
        navigate(`${item}`)
        setMedicamentos(false)
        setCategoriaAtiva('')
        setProduto(item)
    }
    
    function tirarOMouseDasOpcoes(){
        setMedicamentos(false)
        setCategoriaAtiva('')
    }

    const limparPesquisa = () => {
        setProduto('')
    }
    
    return (
        <HeaderContainer>
            <PrimeiroMenu>
                <Link to='/'>
                    <img src='/imagens/logo.png' alt="" />
                </Link>
                <input type="search" id='inputPesquisa' placeholder='O que voce procura?' onKeyDown={(evento) => {
                    if(evento.key === 'Enter'){
                        const target = evento.target as HTMLInputElement
                        const itemPesquisado = target.value
                        
                        setMedicamentos(false)
                        setProduto(itemPesquisado)
                        navigate(`/${produto.toLowerCase()}`)
                    }
                }}/>
                {medicamentos
                ? <RiCloseFill onClick={() => setMedicamentos(false)} className='btn-menu-mobile' color='#fff' size={35}/>
                : <GiHamburgerMenu onClick={() => setMedicamentos(true)} className='btn-menu-mobile' color='#fff' size={35}/>}
                <div>
                    <div>
                        <a className='contato-mobile' href="#contato"><FaHeadset onMouseEnter={abrirMenuContato} onClick={() => setContato(false)}/></a>
                        <UlIcones display={contato ? 'flex' : 'none'} onMouseLeave={() => setContato(false)}>
                            {/* <li>
                                <BsFillTelephoneFill /> Telefone: <br/>
                                43 3524-1790
                            </li> */}
                            <li>
                                <a href="https://wa.me/5519998423814?text=Ol%C3%A1%2C+" target='_blank' rel="noreferrer">
                                    <span><BsWhatsapp/> Whatsapp: </span>
                                    (19) 99842-3814
                                </a>
                            </li>
                            <li>
                                <a 
                                    href="https://mail.google.com/mail/u/0/#inbox?compose=CllgCHrhVJcqVLNzPkwCsnZSttvKlSgmCHjGcrdqRMCBkbCxlnrHzLkSZQkLlrpcTKbktblTqsq"
                                    target='_blank' 
                                    rel="noreferrer"
                                >
                                    <span><AiOutlineMail /> E-mail:</span>
                                    drogaria.farmael@gmail.com
                                </a>
                            </li>
                        </UlIcones>
                    </div>

                    <Badge
                        badgeContent={listaDeFavoritos.length}
                        color="primary"
                    >
                        <MdOutlineFavoriteBorder onClick={() => navigate('/favoritos')}/>
                    </Badge>

                    <Badge
                        badgeContent={listaDeCarrinho.length}
                        color="primary"
                    >
                        <BsCart2 size={25} onClick={() => navigate('/carrinho')}/>
                    </Badge>

                </div>
            </PrimeiroMenu>
            <SegundoMenu display={medicamentos ? 'flex': 'none'}>
                    {categoriasMenu.map((itemCategoria, index) => (
                        <span 
                            key={index}
                            style={{ borderBottom: categoriaAtiva === itemCategoria.categoria ? '2px solid #278a5b' : 'none' }} 
                            onMouseEnter={() => mouseEmCategoria(itemCategoria.categoria)} 
                            onClick={() => clickCategoriasEOpcoes(itemCategoria.categoria)}
                        >
                            {itemCategoria.categoria}
                        </span>
                    ))}
                        <UlItens 
                            display={medicamentos ? 'flex' : 'none'} 
                            onMouseLeave={() => tirarOMouseDasOpcoes()}
                        >
                            {opcoesCategorias.map((itemOpcao, index) => (
                                <li 
                                    key={index} 
                                    onClick={() => clickCategoriasEOpcoes(itemOpcao.opcao)}
                                >
                                    {itemOpcao.opcao}
                                </li>
                            ))}
                        </UlItens>
            </SegundoMenu>
        </HeaderContainer>
    )
}