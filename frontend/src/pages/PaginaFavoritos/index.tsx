import { useRecoilValue, useSetRecoilState } from "recoil"
import { favoritos } from "../../state/atom"
import Card from "../../components/Card"
import styled from "styled-components"
import { useEffect } from 'react'

const FavoritosContainer = styled.section`
    text-align: center;
    min-height: 20vh;
    h4{
        font-size: 2rem;
        margin-top: 1rem;
    }
`

const ListaFavoritos = styled.section`
    width: 90%;
    margin: 2rem auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    h2{
        font-size: 2rem;
        margin: 1rem 0;
    }
    @media screen and (min-width: 768px){}
    @media screen and (min-width: 1024px){
        width: 90%;
        margin: 2rem auto;
        display: flex;
        flex-direction: column;
        align-items: center;
        h2{
            font-size: 2rem;
            margin: 1rem 0;
        }
    }
`

const ListaItem = styled.ul`
    width: 90%;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2rem;
    @media screen and (min-width: 768px){
        flex-direction: row;
    }
    @media screen and (min-width: 1024px){}

`  

export default function PaginaFavoritos(){

    const listaFavoritos = useRecoilValue(favoritos)
    const setListaDeFavoritos = useSetRecoilState(favoritos)

    useEffect(() => {
        const listaDeFavoritosLocalStorage = localStorage.getItem('listaDeFavoritos');
        console.log(listaDeFavoritosLocalStorage)
        const listaDeFavoritosLocalStorageConvertida = JSON.parse(listaDeFavoritosLocalStorage || '[]');
          setListaDeFavoritos(listaDeFavoritosLocalStorageConvertida);
      }, [setListaDeFavoritos]);
    
    return(
        <FavoritosContainer>
            {listaFavoritos.length === 0
            ? <h4>Lista de favoritos vazia</h4>
            : <ListaFavoritos>
                <h2>Favoritos</h2>
                <ListaItem>
                    {listaFavoritos.map((item, index) => (
                        <Card key={index} item={item}/>
                    ))}
                </ListaItem>
            </ListaFavoritos>}
        </FavoritosContainer>
    )
}