import { useState } from 'react';
import Button from '../Button';
import Dialog from '@mui/material/Dialog';
import style from'./NewContainer.module.css'
import Axios from 'axios';

export default function FormDialog() {
    const [open, setOpen] = useState(false); //status do modal
    const [error, setError] = useState(""); //msg de erro

    const [nome, setNome] = useState("");
    const [cliente, setCliente] = useState("");
    const [tipo, setTipo] = useState("");
    const [status, setStatus] = useState("");
    const [categoria, setCategoria] = useState("")


    const regex = /[a-zA-Z]{4}[0-9]{7}/; // 4 letras iniciais e 7 numeros

    const validaDados = () => {
        if (!nome | !cliente | !tipo | !status | !categoria) {//mensagem de erro caso nao preencha todos campos
            setError("*Preencha todos os campos*");
            return; //caso não tenha preenchido todos os campos
        }

        if (!regex.test(nome)) {
            setError("*O nome deve conter 4 letras e 7 numeros*");
            return;//caso o nome não esteja no formato correto
        }

        addConteiner(); //envia dados por metodo POST
        handleClose(); //fecha o modal
    };

    const addConteiner = () => {
        Axios.post('http://localhost:8080/container/criar', {
          nome: nome,
          cliente: cliente,
          tipo: tipo,
          status: status,
          categoria: categoria,
        })
      }

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setError("");
        setNome("");
        setCliente("");
        setTipo("");
        setStatus("");
        setCategoria("");
    };

    return (
        <div>
            <Button func={handleClickOpen}>
                Novo container
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <div className={style.modal}>
                    <div className={style.header}>Novo Container</div>
                    <div className={style.formbox}>
                        <form>
                            <p>Nome</p>
                            <input
                                type="text"
                                placeholder="ex: ABDC1234567"
                                maxLength={11}
                                onChange={(e) => [setNome(e.target.value), setError("")]}
                            />

                            <p>Cliente</p>
                            <input
                                type="text"
                                onChange={(e) => [setCliente(e.target.value), setError("")]}
                            />

                            <p>Tipo</p>
                            <div className={style.radio_grid}>
                                <label className={style.radio_box}>20 pés
                                    <input
                                        type="radio"
                                        name="tipo"
                                        value={"20"}
                                        onChange={(e) => [setTipo(e.target.value), setError("")]}
                                    />
                                    <span className={style.checkmark}></span>
                                </label>

                                <label className={style.radio_box}>40 pés
                                    <input
                                        type="radio"
                                        name="tipo"
                                        value={"40"}
                                        onChange={(e) => [setTipo(e.target.value), setError("")]}
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
                                        onChange={(e) => [setStatus(e.target.value), setError("")]}
                                    />
                                    <span className={style.checkmark}></span>
                                </label>

                                <label className={style.radio_box}>Vazio
                                    <input
                                        type="radio"
                                        name="status"
                                        value={'vazio'}
                                        onChange={(e) => [setStatus(e.target.value), setError("")]}
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
                                        onChange={(e) => [setCategoria(e.target.value), setError("")]}
                                    />
                                    <span className={style.checkmark}></span>
                                </label>
                                <label className={style.radio_box}>Exportação
                                    <input
                                        type="radio"
                                        name="categoria"
                                        value={'exportacao'}
                                        onChange={(e) => [setCategoria(e.target.value), setError("")]}
                                    />
                                    <span className={style.checkmark}></span>
                                </label>
                            </div>
                        </form>
                        <div className={style.msg}>{error}</div>
                        <button className={style.botao_submit} type="submit" onClick={validaDados}>Adicionar</button>
                    </div>
                </div>
            </Dialog>
        </div>
    );
}
