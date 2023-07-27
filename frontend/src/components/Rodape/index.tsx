import { BsWhatsapp, BsInstagram, BsFacebook, BsFillTelephoneFill,  } from 'react-icons/bs'
import { AiOutlineMail, AiFillCreditCard } from 'react-icons/ai'
import { MdPix } from 'react-icons/md'
import styled from 'styled-components'
import { categoriasMenu } from '../../utilidade/categoriasMenu'
import { useSetRecoilState } from 'recoil'
import { produtoClicado } from '../../state/atom'
import { useNavigate } from 'react-router-dom'

const RodapeContainer = styled.footer`
    background-color: #278a5b;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    color: #fff;
    padding: 1rem 0;
    gap: 4rem;
    div{
        text-align: center;
        span{
            text-transform: uppercase;
        }
        hr{
            width: 50%;
            border: 0.5px solid #000;
        }
        ul{
            margin-top: 1rem;
            display: flex;
            flex-direction: column;
            gap: 0.5rem;
        }
    }
    .redesepagamento{
        display: flex;
        flex-direction: row;
        justify-content: center;
        gap: 1rem;
        svg{
            font-size: 1.5rem;
        }
    }

    @media screen and (min-width: 768px){
        flex-direction: row;
        ul{
            li:hover{
                cursor: pointer;
                text-decoration: underline;
            }
        }
    }
`

export default function Rodape(){
    const navigate = useNavigate()
    const setProduto = useSetRecoilState(produtoClicado)

    function abrirLink(link: string){
        window.open(link, '_blank')
    }

    function mostrarProdutos(categoria: string){
        setProduto(`${categoria}`)
        navigate(categoria)
    }

    return(
        <RodapeContainer>
            <div>
                <span>Categorias</span>
                <hr />
                <ul>
                    {categoriasMenu.map((item, index) => {
                        return <li key={index} onClick={() => mostrarProdutos(item.categoria)}>{item.categoria}</li>
                    })}
                </ul>
            </div>
            <div>
                <span>Redes Sociais</span>
                <hr />
                <ul className='redesepagamento'>
                    <li>
                        <BsWhatsapp onClick={() => abrirLink('https://wa.me/5519998423814?text=Ol%C3%A1%2C+')}/>
                    </li>
                    <li>
                        <BsInstagram onClick={() => abrirLink('https://www.instagram.com/drogaria.farmael/')}/>
                    </li>
                    <li>
                        <BsFacebook onClick={() => abrirLink('https://www.instagram.com/drogaria.farmael/')}/>
                    </li>
                </ul>
            </div>
            <div>
                <span id='contato' style={{display:'flex', alignItems:'center', justifyContent:'center', gap:'0.5rem'}}><AiOutlineMail /> E-mail</span>
                <hr />
                <ul>
                    <li onClick={() => abrirLink('https://mail.google.com/mail/u/0/#inbox?compose=CllgCHrhVJcqVLNzPkwCsnZSttvKlSgmCHjGcrdqRMCBkbCxlnrHzLkSZQkLlrpcTKbktblTqsq')}>
                        farmael@gmail.com
                    </li>
                </ul>
            </div>
            <div>
                <span>Formas de pagamento</span>
                <hr />
                <ul className='redesepagamento'>
                    <li><MdPix /></li>
                    <li><AiFillCreditCard /></li>
                </ul>
            </div>
        </RodapeContainer>
    )
}