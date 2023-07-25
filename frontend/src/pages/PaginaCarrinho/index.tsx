import { useEffect, useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { carrinho } from "../../state/atom";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { Produto } from "../../interface/Produto";
import ProdutoCarrinho from "./ProdutoCarrinho";

const ContainerProdutos = styled.section`
  margin: 2rem 0;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  min-height: 12vh;
  h2{
    font-size: 1.5rem;
  }
  span{
    font-weight: 600;
  }
  button{
    padding: 0.5rem;
  }
  @media screen and (min-width: 768px){
    h2{
      font-size: 2rem;
    }
    button:hover{
      cursor: pointer;
    }
  }
  @media screen and (min-width: 1024px){

  }
`

export default function PaginaCarrinho() {
  const navigate = useNavigate()
  const [compraFinalizada, setCompraFinalizada] = useState(false)

  const listaCarrinho = useRecoilValue(carrinho)
  const setListaCarrinho = useSetRecoilState(carrinho)
  
  useEffect(() => {
    const listaLocalStorage = localStorage.getItem('listaDeCarrinho');
    const listaLocalStorageConvertida = JSON.parse(listaLocalStorage || '[]');
    if(listaLocalStorageConvertida.length){
      setListaCarrinho(listaLocalStorageConvertida);
    } else {
      setListaCarrinho([]);
    }
  }, [setListaCarrinho]);
  
  
  function removerItemDoCarrinho(item: Produto){
    const novaLista = listaCarrinho.filter((itemLista) => itemLista.id !== item.id)
    setListaCarrinho(novaLista)
    localStorage.setItem('listaDeCarrinho', JSON.stringify(novaLista))
  }

  function finalizarCompra(){
    setCompraFinalizada(true)
    setListaCarrinho([])
    localStorage.setItem('listaDeCarrinho', JSON.stringify([]))

    const mandarIssoParaOWhats = listaCarrinho.map((item) => {
      const mensagem = `Produto: ${item.titulo}, quantidade: ${item.quantidade}, valor: ${item.valor},00 reais. %0A`
      return mensagem
    })

    const linkWhats = `https://api.whatsapp.com/send?phone=5543998343648&text=${mandarIssoParaOWhats.map((item => item))}`

    function abrirLinkWhats(){
      window.open(linkWhats, '_blank')
    }

    abrirLinkWhats()
  }

  return (
    <ContainerProdutos>
      {compraFinalizada 
            ? <><h2>Compra finalizado com sucesso!! <br/>Enviaremos um e-mail com mais detalhes.</h2> <button onClick={() => navigate('/')}>Inicio</button></>
            : listaCarrinho.length === 0
            ? <h2>Nao existe itens no carrinho</h2>
            : listaCarrinho.map((item, index) => (
              <ProdutoCarrinho key={index} item={item} removerItemDoCarrinho={removerItemDoCarrinho} />
            ))
          }
          
        {listaCarrinho.length !== 0 && 
        <>
          {/* <span className="total">Valor total: R${soma},00 reais.</span> */}
          <button onClick={finalizarCompra}>Finalizar compra</button>
        </>
      }
    </ContainerProdutos>
  )
}