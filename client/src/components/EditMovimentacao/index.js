import { useState } from 'react';
import Button from '../Button';
import Dialog from '@mui/material/Dialog';
import { useParams } from 'react-router-dom'
import style from './EditMovimentacao.module.css'
import Axios from 'axios';
import InputMask from 'react-input-mask';

export default function FormEditMovimentacao(props) {
    const [open, setOpen] = useState(false); //status do modal
    const [error, setError] = useState(""); //msg de erro

    const [newTipo, setNewTipo] = useState(props.movimentacao.tipo);
    const [newInicio, setNewInicio] = useState(props.movimentacao.inicio);
    const [newFim, setNewFim] = useState(props.movimentacao.fim);


    const regex = /[0-9]{2}$/;

    const validaDados = () => {
        if (!newTipo | !newInicio | !newFim) {//mensagem de erro caso nao preencha todos campos
            setError("*Preencha todos os campos*");
            return; //caso não tenha preenchido todos os campos
        }

        if (!regex.test(newFim) || !regex.test(newInicio)) {
            setError("Data e/ou horário incorreto");
            return;//caso nao tenha preenchido ATÉ o ultimo numero
        }

        updateMovi(); //envia dados por metodo POST
        handleClose(); //fecha o modal
    };

    const updateMovi = () => {
        Axios.put('http://localhost:8080/movimentacao/update',
            {
                id: props.movimentacao.id,
                tipo: newTipo,
                inicio: newInicio,
                fim: newFim

            })
    }

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setError("");
        setNewTipo(props.movimentacao.tipo);
        setNewInicio(props.movimentacao.inicio);
        setNewFim(props.movimentacao.fim);
    };

    return (
        <>
            <i class="fas fa-edit" title="Editar" onClick={handleClickOpen}></i>
            <Dialog open={open} onClose={handleClose}>
                <div className={style.modal}>
                    <div className={style.header}>Editar Movimentação</div>
                    <div className={style.formbox}>
                        <form>
                            <p>Tipo: {newTipo}</p>
                            <div className={style.radio_grid}>
                                <label className={style.radio_box}>Embarque
                                    <input
                                        type="radio"
                                        name="tipo"
                                        value={"Embarque"}
                                        onChange={(event) => {
                                            setNewTipo(event.target.value);
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
                                            setNewTipo(event.target.value);
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
                                            setNewTipo(event.target.value);
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
                                            setNewTipo(event.target.value);
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
                                            setNewTipo(event.target.value);
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
                                            setNewTipo(event.target.value);
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
                                            setNewTipo(event.target.value);
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
                                    setNewInicio(event.target.value);
                                }}>
                            </InputMask>

                            <p className={style.titulodata}>Fim</p>
                            <InputMask
                                className={style.inputdata}
                                mask='99/99/9999 99:99'
                                onChange={(event) => {
                                    setNewFim(event.target.value);
                                }}>
                            </InputMask>

                        </form>
                        <div className={style.msg}>{error}</div>
                        <button className={style.botao_submit} type="submit" onClick={validaDados}>Confirmar alterações</button>
                    </div>
                </div>
            </Dialog>
        </>
    );
}
