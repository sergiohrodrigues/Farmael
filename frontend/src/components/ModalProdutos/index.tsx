import styled from "styled-components"
import { AiOutlineCloseCircle } from 'react-icons/ai'
import { Produto } from "../../interface/Produto"

const ModalContainer = styled.section`
    position: fixed;
    height: 100vh;
    width: 100vw;
    inset: 0;
    background-color: transparent;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    z-index: 999;
`

const Modal = styled.div`
    width: 90%;
    height: auto;
    margin: 0 auto;
    background-color: gray;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    gap: 1rem;
    padding: 2rem 0;
    position: relative;
    svg{
        position: absolute;
        right: 0.5%;
        top: 0.5%;
    }
    h2{
        padding: 0 2rem;
    }
    .imagem-modal{
        width: 150px;
        margin-top: 1rem;
    }
    p{
        font-size: 1.1rem;
        margin-top: 1rem;
        padding: 0 1rem;
    }
    span{
        display: block;
        margin-top: 1rem;
        font-size: 1.5rem;
        font-weight: 600;
    }
    @media screen and (min-width: 768px){
        height: auto;
        .imagem-modal{
            width: 150px;
        }
        p{
            padding: 0 10rem;
        }
    }
    @media screen and (min-width: 1024px){
        width: 50%;
        .imagem-modal{
            width: 160px;
        }
        svg:hover{
            cursor: pointer;
        }
    }
`

interface Props {
    disabledScrollBody: (isDisable: boolean) => void,
    setModalIsOpen: React.Dispatch<React.SetStateAction<boolean>>,
    item: Produto
}

export default function ModalProdutos ({disabledScrollBody, setModalIsOpen, item} : Props) {

    function fecharModal(){
        disabledScrollBody(false)
        setModalIsOpen(false)
    }
    return(
        <ModalContainer>
            <Modal>
                <AiOutlineCloseCircle size={40} onClick={fecharModal} />
                <h2>{item.titulo}</h2>
                <img className="imagem-modal" src={item.urlImage} alt="Imagem do produto" />
                <p>{item.descricao}</p>
                <span>Valor: R$ {item.valor},00</span>
            </Modal>
        </ModalContainer>
    )
}