import style from './Relatorio.module.css'
import { Link, useNavigate } from "react-router-dom";
import Axios from 'axios';
import { useEffect, useState } from 'react';

function Containers() {

    const [relatorioList, seRelatorioList] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        getContainers();
    })

    //READ
    const getContainers = () => {
        Axios.get('http://localhost:8080/containers').then((response) => {
            seRelatorioList(response.data)
        });
    }

    //DELETE
    const deleteContainer = (id) => {
        Axios.delete(`http://localhost:8080/container/delete/${id}`)
    }

    const Direction = (id) => {
        navigate(`/movimentacoes/${id}`);
    }

    return (
        <>
            <div className={style.totais}>
                <div className={style.impexp}>
                    <div>3</div>
                    Importações
                </div>
                <div className={style.impexp}>
                    <div>5</div>
                    Exportações
                </div>

            </div>
            <div className={style.sumario}>
            </div>
            <div className={style.table}>
                <div className={style.table_item}>
                    <div className={style.empresa}>Company Tech International LTDA</div>
                    <div className={style.movimentacoes}>
                        <div className={style.movimentacoes_item}>
                            Embarque
                            <div>5</div>
                        </div>
                        <div className={style.movimentacoes_item}>
                            Descarga
                            <div>5</div>
                        </div>
                        <div className={style.movimentacoes_item}>
                            Gate in
                            <div>5</div>
                        </div>
                        <div className={style.movimentacoes_item}>
                            Gate
                            <div>5</div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Containers;
