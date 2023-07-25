import { useState, useEffect, useRef, ChangeEvent } from "react"
import { useNavigate } from "react-router-dom"
import styled from "styled-components"
import { AiOutlineCloseCircle } from 'react-icons/ai'
import ImageUploading from 'react-images-uploading';
import { ImageListType } from 'react-images-uploading'
import axios from 'axios';
import { Produto } from "../../../interface/Produto";
import { useRecoilValue } from "recoil";
import { produtoClicado, produtosGeral } from "../../../state/atom";

const ModalContainer = styled.section<{display : string}>`
background-color: transparent;
height: 100vh;
width: 100vw;
position: fixed;
inset: 0;
display: ${props => props.display};
flex-direction: column;
justify-content: center;
align-items: center;
`

const FormContainer = styled.form`
background-color: gray;
padding: 5rem;
display: flex;
flex-direction: column;
position: relative;
gap: 0.5rem;
svg{
    position: absolute;
    top: 2%;
    right: 2%;
}
svg:hover{
    cursor: pointer;
}
div{
    width: 500px;
    display: flex;
    flex-direction: column;
    label{
        width: 100px;
        font-size: 1.5rem;
    }
    input{
        font-size: 1.2rem;
        width: 100%;
        padding: 0.5rem;
        outline: none;
    }
}
select{
    width: 100%;
    padding: 0.5rem;
    font-size: 1.5rem;
    margin: 0.5rem 0;
    option{
        font-size: 1.5rem;
        padding: 0.5rem;
    }
}
button{
    width: 30%;
    margin: 2rem auto 0 auto;
    padding: 0.5rem;
}
button:hover{
    cursor: pointer;
}
`

const CategoriaContainer = styled.fieldset`
    display: flex;
    flex-direction: column;
    margin: 1rem 0;
    legend{
        font-size: 1.5rem;
        margin-bottom: 1rem;
    }
    div{
        width: auto;
        display: flex;
        flex-direction: row;
        align-items: center;
        input{
            width: auto;
        }
        label{
            width: auto;
        }
    }
`

interface Props {
    modalOpen: boolean,
    setModalOpen: React.Dispatch<React.SetStateAction<boolean>>,
    disabledScrollBody: (isDisable: boolean) => void,
    operacao: string,
    opcao: string,
    id: string,
    fetchProduto: () => void,
    itemParaAtualizar: Produto | undefined,
    setItemParaAtualizar: React.Dispatch<React.SetStateAction<Produto | undefined>>
}

export default function ModalProduto({modalOpen, setModalOpen, disabledScrollBody, operacao, opcao, id, fetchProduto, itemParaAtualizar, setItemParaAtualizar}: Props){

    const navigate = useNavigate()
    const [produto, setProduto] = useState('')
    const [descricao, setDescricao] = useState('')
    const [valor, setValor] = useState(0)
    const [categoria, setCategoria] = useState('')

    // const categorias = [       
    //     {id: 1 , categoria: 'Medicamentos'},
    //     {id: 2 , categoria: 'Linha Infantil'},
    //     {id: 3 , categoria: 'Beleza'},
    //     {id: 4 , categoria: 'Cabelo'},
    //     {id: 5 , categoria: 'Higiene Pessoal'}
    // ]

    const [selectedImage, setSelectedImage] = useState<File | null>(null);

    const handleImageUpload = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault()
        if(operacao === 'criar'){
            const formData = new FormData();
            formData.append('image', Object(selectedImage));
            formData.append('titulo', produto);
            formData.append('descricao', descricao);
            formData.append('valor', valor.toString());
            formData.append('categoria', categoria);
            try {
                const response = await axios.post(`http://localhost:8080/${opcao}`, formData, {
                    headers: {
                    'Content-Type': 'multipart/form-data'
                    }
                });
                console.log(response.data);
            } catch (error) {
                console.error(error);
            }

            fecharModal()
            fetchProduto()
        }

        if(operacao === 'atualizar'){
            const formDataAtualizada = new FormData();
            formDataAtualizada.append('titulo', produto);
            formDataAtualizada.append('descricao', descricao);
            formDataAtualizada.append('valor', valor.toString());
            formDataAtualizada.append('categoria', categoria);

            try {
                const response = await axios.put(`http://localhost:8080/${opcao}/${id}`, formDataAtualizada, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                console.log(response.data);
                } catch (error) {
                console.error(error);
            }

            fecharModal()
            fetchProduto()
        }
    }

    // const inputsCategoria = document.querySelector('input[name="categoria"]:checked')
    // console.log(document.querySelector('input[name="categoria"]:checked')?.value!)

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
          setSelectedImage(event.target.files[0]);
        }
    };

    const zerarInputs = () => {
        const inputs = document.querySelectorAll('input');
        for (let i = 0; i < inputs.length; i++) {
            inputs[i].value = '';
        }
    }

    useEffect(() => {
        if(itemParaAtualizar !== undefined){
            setProduto(itemParaAtualizar.titulo)
            setDescricao(itemParaAtualizar.descricao)
            setValor(itemParaAtualizar.valor)
            setCategoria(itemParaAtualizar.categoria)
        } else {
            setProduto('')
            setDescricao('')
            setValor(0)
            setCategoria('')
            setSelectedImage(null)
        }
    }, [itemParaAtualizar, setItemParaAtualizar])


    function fecharModal(){
        setModalOpen(false)
        disabledScrollBody(false)
        zerarInputs()
        setCategoria('')
        setItemParaAtualizar(undefined)
    }

    interface Categorias {
        opcao: string
    }

    const [categoriaSelecinada, setCategoriaSelecionada] = useState('Medicamentos')
    const [subcategorias, setSubcategorias] = useState<Categorias[]>([])

    useEffect(() => {
        if(!categoriaSelecinada){
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

        switch(categoriaSelecinada){
            case 'Medicamentos':
                setSubcategorias(Medicamentos);
                break
            case 'Linha Infantil':
                setSubcategorias(Infantil);
                break
            case 'Perfumaria':
                setSubcategorias(Perfumaria);
                break
        }
    }, [categoriaSelecinada])

    return(
        <ModalContainer display={modalOpen ? 'flex' : 'none'}>
            <FormContainer action="">
            <AiOutlineCloseCircle size={40} onClick={fecharModal} />
                <div>
                    <label htmlFor="produto">Produto: </label>
                    <input type="text" id="produto" value={produto} onChange={(event) => setProduto(event.target.value)}/> 
                </div>
                <div>
                    <label >Descrição: </label>
                    <input type="text" id="descricao" value={descricao} onChange={(event) => setDescricao(event.target.value)}/> 
                </div>
                <div>
                    <label htmlFor="valor">Valor: </label>
                    <input type="number" id="valor" value={valor} onChange={(event) => setValor(event.target.valueAsNumber)}/> 
                </div>
                <CategoriaContainer>
                    <legend>Qual categoria deseja adicionar o produto?</legend>
                    <div>
                        <input type="radio" name="categoria" value="Medicamentos" defaultChecked onChange={e => setCategoriaSelecionada(e.target.value)}/>
                        <label>Medicamentos</label>
                    </div>
                    <div>
                        <input type="radio" name="categoria" value="Linha Infantil" onChange={e => setCategoriaSelecionada(e.target.value)}/>
                        <label>Linha Infantil</label>
                    </div>
                    <div>
                        <input type="radio" name="categoria" value="Perfumaria" onChange={e => setCategoriaSelecionada(e.target.value)}/>
                        <label>Perfumaria</label>
                    </div>
                </CategoriaContainer>
                <select value={categoria} onChange={(e) => setCategoria(e.target.value)}>
                    <option defaultChecked>Selecione uma categoria</option>
                    {subcategorias.map((item, index) => (
                        <option key={index} value={item.opcao}>{item.opcao}</option>
                    ))}
                </select>
                {operacao === 'criar' && <div>
                    <input type="file" accept="image/*" onChange={handleImageChange} />
                </div>}
                <button onClick={handleImageUpload}>Enviar</button>
            </FormContainer>
        </ModalContainer>
    )
}