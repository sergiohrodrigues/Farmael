import styled from "styled-components"
import { Produto } from "../../../interface/Produto"
import { useState } from "react"
import { BsTrashFill } from 'react-icons/bs'
import { GrAddCircle } from 'react-icons/gr'
import { MdRemoveCircleOutline } from 'react-icons/md'

const ProdutoContainer = styled.li`
  width: 200px;
  border: 1px solid #000;
  margin: 0 auto;
  padding: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 1rem;
  img{
    width: 100px;
  }
  svg{
    font-size: 1.5rem;
  }
  div{
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
  button:hover{
    cursor: auto;
  }
  @media screen and (min-width: 768px){
    width: 500px;
    flex-direction: row;
    justify-content: space-between;
    height: 50px;
    img{
      width: 10%;
      height: 100%;
    }
    h3{
      width: 40%;
    }
    span{
      width: 120px;
    }
    svg{
      width: 10%;
    }
    svg:hover{
      cursor: pointer;
    }
  }
  @media screen and (min-width: 768px){
    width: 700px;
    height: 70px;
    img{
      height: 100%;
    }
    h3{
      width: 300px;
    }
    svg{
      width: 1.2rem;
    }
  }
  @media screen and (min-width: 1024px){
  }
`

interface Props {
    item: Produto,
    removerItemDoCarrinho: (item: Produto) => void
}

export default function ProdutoCarrinho({item, removerItemDoCarrinho, }: Props){
    const [quantidade, setQuantidade] = useState(1)
    const [ valorInicial, setValorInicial] = useState(item.valor)
    const [ valorMaisQuantidade, setValorMaisQuantidade] = useState(item.valor)
    
    function aumentarQuantidade(){
      let quantidadeAumentada = quantidade + 1
      setQuantidade(quantidadeAumentada)
      const soma = valorInicial * quantidadeAumentada
      setValorMaisQuantidade(soma)
      // setItemEQuantidade(itemAntigo => [...itemAntigo, {item: item.titulo, quantidade: String(quantidadeAumentada)}])
    }
    
    function diminuirQuantidade(){
      let quantidadeAumentada = quantidade +-1
      if(quantidadeAumentada < 1){
        quantidadeAumentada = 1
      }
      setQuantidade(quantidadeAumentada)
      const soma = valorInicial * quantidadeAumentada
      setValorMaisQuantidade(soma)
      console.log(quantidadeAumentada)
      // setItemEQuantidade(itemAntigo => [...itemAntigo, {item: item.titulo, quantidade: String(quantidadeAumentada)}])
    }

    return(
        <ProdutoContainer>
            <img src={item.urlImage} alt={item.titulo} />
            <h3>{item.titulo}</h3>
            <div>
            <MdRemoveCircleOutline onClick={diminuirQuantidade}/>
            <button>{quantidade}</button>
            <GrAddCircle onClick={aumentarQuantidade}/>
            </div>
            <span>Valor: ${valorMaisQuantidade},00</span>
            <BsTrashFill onClick={() => removerItemDoCarrinho(item)}/>
        </ProdutoContainer>
    )
}