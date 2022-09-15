import style from './Relatorio.module.css'
import Axios from 'axios';
import { useEffect, useState } from 'react';

function Relatorio() {

    const [relatorioMovi, setRelatorioMovi] = useState([]);
    const [relatorioImpexp, setRelatorioImpexp] = useState([]);


    useEffect(() => {
        getRelatorio()
    }, [])

    const getRelatorio = () => {
        Axios.get('http://localhost:8080/relatorio/movi').then((response) => {
            setRelatorioMovi(response.data)
        });

        Axios.get('http://localhost:8080/relatorio/impexp').then((response) => {
            setRelatorioImpexp(response.data)
        });
    }

    const importacao = relatorioImpexp[0]?.quantidade;
    const exportacao = relatorioImpexp[1]?.quantidade;

    return (
        <>
            <div className={style.totais}>
                <div className={style.impexp}>
                    {/* caso nao exista nenhum container desta categoria = 0 */}
                    <div>{importacao ? importacao : 0}</div>
                    Importações
                </div>
                <div className={style.impexp}>
                    <div>{exportacao ? exportacao : 0}</div>
                    Exportações
                </div>
            </div>
            <div className={style.sumario}>
            </div>
            <div className={style.table}>
                {relatorioMovi.map((val, key) => ( //caso retorne pelo menos um registro
                    <div className={style.table_item}>
                        <div className={style.cliente}>{val.cliente}</div>
                        <div className={style.movimentacoes}>
                            <div className={style.movimentacoes_item}>
                                Embarques
                                <div>{val.Embarque ? val.Embarque : 0}</div>
                            </div>
                            <div className={style.movimentacoes_item}>
                                Descargas
                                <div>{val.Descarga ? val.Descarga : 0}</div>
                            </div>
                            <div className={style.movimentacoes_item}>
                                Gate in
                                <div>{val.GateIn ? val.GateIn : 0}</div>
                            </div>
                            <div className={style.movimentacoes_item}>
                                Gate out
                                <div>{val.GateOut ? val.GateOut : 0}</div>
                            </div>
                            <div className={style.movimentacoes_item}>
                                Reposicionamentos
                                <div>{val.Reposicionamento ? val.Reposicionamento : 0}</div>
                            </div>
                            <div className={style.movimentacoes_item}>
                                Pesagens
                                <div>{val.Pesagem ? val.Pesagem : 0}</div>
                            </div>
                            <div className={style.movimentacoes_item}>
                                Scanner
                                <div>{val.Scanner ? val.Scanner : 0}</div>
                            </div>
                        </div>
                    </div>
                ))}
                
            </div>
        </>
    )
}

export default Relatorio;
