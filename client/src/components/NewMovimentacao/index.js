import { useState } from 'react';
import Button from '../Button';
import Dialog from '@mui/material/Dialog';
import { useParams } from 'react-router-dom'
import style from './NewMovimentacao.module.css'
import Axios from 'axios';
import InputMask from 'react-input-mask';

export default function FormDialog(props) {
    let { id } = useParams();
    const [open, setOpen] = useState(true); //status do modal
    const [error, setError] = useState(""); //msg de erro

    const [tipo, setTipo] = useState("");
    const [inicio, setInicio] = useState("");
    const [fim, setFim] = useState("");


    const regex = /[0-9]{2}$/;


    const validaDados = () => {
        if (!tipo | !inicio | !fim) {//mensagem de erro caso nao preencha todos campos
            setError("*Preencha todos os campos*");
            return; //caso não tenha preenchido todos os campos
        }

        if (!regex.test(fim) || !regex.test(inicio)) {
            setError("Data e/ou horário incorreto");
            return;//caso nao tenha preenchido ATÉ o ultimo numero
        }

        addMovimentacao(id); //envia dados por metodo POST
        handleClose(); //fecha o modal
    };

    const addMovimentacao = (id) => {
        Axios.post('http://localhost:8080/movimentacao/criar', {
            id: id,
            tipo: tipo,
            inicio: inicio,
            fim: fim
        })

    }

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setError("");
        setTipo("");
        setInicio("");
        setFim("");
    };

    return (
        <div>
            <Button func={handleClickOpen}>
                Add Movimentação
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <div className={style.modal}>
                    <div className={style.header}>Nova Movimentação</div>
                    <div className={style.formbox}>
                        <form>
                            <p>Tipo</p>
                            <div className={style.radio_grid}>
                                <label className={style.radio_box}>Embarque
                                    <input
                                        type="radio"
                                        name="tipo"
                                        value={"Embarque"}
                                        onChange={(event) => {
                                            setTipo(event.target.value);
                                        }}
                                    />
                                    <span className={style.checkmark}></span>
                                </label>
                                <label className={style.radio_box}>Descarga
                                    <input
                                        type="radio"
                                        name="tipo"
                                        value={"Descarga"}
                                        onChange={(event) => {
                                            setTipo(event.target.value);
                                        }}
                                    />
                                    <span className={style.checkmark}></span>
                                </label>
                                <label className={style.radio_box}>Gate-In
                                    <input
                                        type="radio"
                                        name="tipo"
                                        value={"Gate-In"}
                                        onChange={(event) => {
                                            setTipo(event.target.value);
                                        }}
                                    />
                                    <span className={style.checkmark}></span>
                                </label>
                                <label className={style.radio_box}>Gate-Out
                                    <input
                                        type="radio"
                                        name="tipo"
                                        value={"Gate-Out"}
                                        onChange={(event) => {
                                            setTipo(event.target.value);
                                        }}
                                    />
                                    <span className={style.checkmark}></span>
                                </label>
                                <label className={style.radio_box}>Reposicionamento
                                    <input
                                        type="radio"
                                        name="tipo"
                                        value={"Reposicionamento"}
                                        onChange={(event) => {
                                            setTipo(event.target.value);
                                        }}
                                    />
                                    <span className={style.checkmark}></span>
                                </label>
                                <label className={style.radio_box}>Pesagem
                                    <input
                                        type="radio"
                                        name="tipo"
                                        value={"Pesagem"}
                                        onChange={(event) => {
                                            setTipo(event.target.value);
                                        }}
                                    />
                                    <span className={style.checkmark}></span>
                                </label>
                                <label className={style.radio_box}>Scanner
                                    <input
                                        type="radio"
                                        name="tipo"
                                        value={"Scanner"}
                                        onChange={(event) => {
                                            setTipo(event.target.value);
                                        }}
                                    />
                                    <span className={style.checkmark}></span>
                                </label>
                            </div>
                            <p className={style.titulodata}>Inicio </p>
                            <InputMask
                                className={style.inputdata}
                                mask='99/99/9999 99:99'
                                onChange={(event) => {
                                    setInicio(event.target.value);
                                }}>
                            </InputMask>

                            <p className={style.titulodata}>Fim</p>
                            <InputMask
                                className={style.inputdata}
                                mask='99/99/9999 99:99'
                                onChange={(event) => {
                                    setFim(event.target.value);
                                }}>
                            </InputMask>

                        </form>
                        <div className={style.msg}>{error}</div>
                        <button className={style.botao_submit} type="submit" onClick={validaDados}>Adicionar</button>
                    </div>
                </div>
            </Dialog>
        </div>
    );
}
