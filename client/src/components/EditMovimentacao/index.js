import { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import style from './EditContainer.module.css'
import Axios from 'axios';

export default function FormEditMovimentacao(props) {
    const [open, setOpen] = useState(false); //status do modal
    const [error, setError] = useState(""); //msg de erro

    const [newNome, setNewNome] = useState(props.container.nome);
    const [newCliente, setNewCliente] = useState(props.container.cliente);
    const [newTipo, setNewTipo] = useState(props.container.tipo);
    const [newStatus, setNewStatus] = useState(props.container.status);
    const [newCategoria, setNewCategoria] = useState(props.container.categoria);


    const regex = /[a-zA-Z]{4}[0-9]{7}/; // 4 letras iniciais e 7 numeros

    const validaDados = () => {
        if (!newNome | !newCliente | !newTipo | !newStatus | !newCategoria) {//mensagem de erro caso nao preencha todos campos
            setError("*Preencha todos os campos*");
            return; //caso não tenha preenchido todos os campos
        }

        if (!regex.test(newNome)) {
            setError("*O nome deve conter 4 letras e 7 numeros*");
            return;//caso o nome não esteja no formato correto
        }

        updateContainer(); //envia dados por metodo POST
        handleClose(); //fecha o modal
    };

    const updateContainer = (id) => {
        Axios.put('http://localhost:8080/container/update',
            {
                id: props.container.id,
                nome: newNome,
                cliente: newCliente,
                tipo: newTipo,
                status: newStatus,
                categoria: newCategoria,

            })
    }

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setError("");
        setNewNome(props.container.nome);
        setNewCliente(props.container.cliente);
        setNewTipo(props.container.tipo);
        setNewStatus(props.container.status);
        setNewCategoria(props.container.categoria);
    };

    return (
        <>
            <i class="fas fa-edit" title="Editar" onClick={handleClickOpen}></i>
            <Dialog open={open} onClose={handleClose}>
                <div className={style.modal}>
                    <div className={style.header}>Editar Container</div>
                    <div className={style.formbox}>
                        <form>
                            <p>Nome</p>
                            <input
                                type="text"
                                placeholder="ex: ABDC1234567"
                                value={newNome}
                                maxLength={11}
                                onChange={(e) => [setNewNome(e.target.value), setError("")]}
                            />

                            <p>Cliente</p>
                            <input
                                type="text"
                                value={newCliente}
                                onChange={(e) => [setNewCliente(e.target.value), setError("")]}
                            />

                            <p>Tipo</p>
                            <div className={style.radio_grid}>
                                <label className={style.radio_box}>20 pés
                                    <input
                                        type="radio"
                                        name="tipo"
                                        value={"20"}
                                        onChange={(e) => [setNewTipo(e.target.value), setError("")]}
                                    />
                                    <span className={style.checkmark}></span>
                                </label>

                                <label className={style.radio_box}>40 pés
                                    <input
                                        type="radio"
                                        name="tipo"
                                        value={"40"}
                                        onChange={(e) => [setNewTipo(e.target.value), setError("")]}
                                    />
                                    <span className={style.checkmark}></span>
                                </label>
                            </div>
                            <p>Status</p>
                            <div className={style.radio_grid}>
                                <label className={style.radio_box}>Cheio
                                    <input
                                        type="radio"
                                        name="status"
                                        value={'cheio'}
                                        onChange={(e) => [setNewStatus(e.target.value), setError("")]}
                                    />
                                    <span className={style.checkmark}></span>
                                </label>

                                <label className={style.radio_box}>Vazio
                                    <input
                                        type="radio"
                                        name="status"
                                        value={'vazio'}
                                        onChange={(e) => [setNewStatus(e.target.value), setError("")]}
                                    />
                                    <span className={style.checkmark}></span>
                                </label>
                            </div>

                            <p>Categoria</p>
                            <div className={style.radio_grid}>
                                <label className={style.radio_box}>Importação
                                    <input
                                        type="radio"
                                        name="categoria"
                                        value={'importacao'}
                                        onChange={(e) => [setNewCategoria(e.target.value), setError("")]}
                                    />
                                    <span className={style.checkmark}></span>
                                </label>
                                <label className={style.radio_box}>Exportação
                                    <input
                                        type="radio"
                                        name="categoria"
                                        value={'exportacao'}
                                        onChange={(e) => [setNewCategoria(e.target.value), setError("")]}
                                    />
                                    <span className={style.checkmark}></span>
                                </label>
                            </div>
                        </form>
                        <div className={style.msg}>{error}</div>
                        <button className={style.botao_submit} type="submit" onClick={validaDados}>Confirmar alterações</button>
                    </div>
                </div>
            </Dialog>
        </>
    );
}
