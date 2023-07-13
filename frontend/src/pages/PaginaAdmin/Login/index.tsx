import { useState } from "react"
import { useNavigate } from "react-router-dom"
import styled from "styled-components"

const ContainerLogin = styled.section`
    min-height: 100vh;
    background-color: gray;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    form{
        width: 40%;
        padding: 4rem 0;
        background-color: #fff;
        display: flex;
        flex-direction: column;
        align-items: center;
        h3{
            font-size: 1.5rem;
        }
        input{
            width: 50%;
            padding: 0.5rem;
            margin-top: 0.5rem;
            outline: none;
        }
        button{
            margin-top: 1rem;
            padding: 0.5rem;
        }
        button:hover{
            cursor: pointer;
        }
    }
`

interface Props {
    setLoginSucess : React.Dispatch<React.SetStateAction<boolean>>,
    setOpcaoSucess: React.Dispatch<React.SetStateAction<boolean>>,
    setOpcao: React.Dispatch<React.SetStateAction<string>>
}
export default function Login({setLoginSucess, setOpcaoSucess, setOpcao}: Props){
    const [login, setLogin] = useState('')
    const [senha, setSenha] = useState('')
    const navigate = useNavigate()

    function loginAdmin(e: React.MouseEvent<HTMLButtonElement, MouseEvent>){
        e.preventDefault()
        if(login === '' || senha === ''){
            alert('Por favor preencha os campos corretamente')
        } else {
            if(login === 'admin' && senha === 'Farmael123**'){
                alert('Login efeutado com sucesso!')
                setLoginSucess(true)
                setOpcaoSucess(true)
                setOpcao('produtos')
            } else {
                alert('Dados incorretos, tente novamente.')
            }
        }
    }

    return(
        <ContainerLogin>
            <form>
                <h3>Login</h3>
                <input type="text" placeholder="Login" onChange={(evento) => setLogin(evento.target.value)}/>
                <input type='password' placeholder="Senha" onChange={(evento) => setSenha(evento.target.value)}/>
                <button onClick={(evento) => loginAdmin(evento)}>Enviar</button>
                <button onClick={() => navigate('/')}>Inicio</button>
            </form>
        </ContainerLogin>
    )
}