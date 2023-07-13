import { BsWhatsapp, BsInstagram, BsFacebook, BsFillTelephoneFill,  } from 'react-icons/bs'
import { AiOutlineMail, AiFillCreditCard } from 'react-icons/ai'
import { MdPix } from 'react-icons/md'
import styled from 'styled-components'

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
    return(
        <RodapeContainer>
            <div>
                <span>Categorias</span>
                <hr />
                <ul>
                    <li>Medicamentos</li>
                    <li>Linha infantil</li>
                    <li>Beleza</li>
                    <li>Cabelo</li>
                    <li>Higiene pessoal</li>
                </ul>
            </div>
            <div>
                <span>Redes Sociais</span>
                <hr />
                <ul className='redesepagamento'>
                    <li>
                        <BsWhatsapp />
                    </li>
                    <li>
                        <BsInstagram />
                    </li>
                    <li>
                        <BsFacebook />
                    </li>
                </ul>
            </div>
            <div>
                <span id='contato'>Contato</span>
                <hr />
                <ul>
                    <li>
                        <BsFillTelephoneFill /> Telefone: <br/>
                        43 3524-1790
                    </li>
                    <li>
                        <BsWhatsapp/> Whatsapp: <br/>
                        43 99999-9999
                    </li>
                    <li>
                        <AiOutlineMail /> E-mail: <br/>
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