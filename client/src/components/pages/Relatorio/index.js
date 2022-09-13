import style from './Relatorio.module.css'
import Axios from 'axios';
import { useEffect, useState } from 'react';

function Containers() {

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
    console.log(exportacao)
    return (
        <>
            <div className={style.totais}>
                <div className={style.impexp}>
                    {/* caso nao exista nenhum container desta categoria = 0 */}
                    <div>{importacao? importacao : 0}</div>
                    Importações
                </div>
                <div className={style.impexp}>
                    <div>{exportacao? exportacao : 0}</div>
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
                            Gate out
                            <div>5</div>
                        </div>
                        <div className={style.movimentacoes_item}>
                            Reposicionamento
                            <div>5</div>
                        </div>
                        <div className={style.movimentacoes_item}>
                            Pesagem
                            <div>5</div>
                        </div>
                        <div className={style.movimentacoes_item}>
                            Scanner
                            <div>5</div>
                        </div>
                    </div>
                </div>
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
                            Gate out
                            <div>5</div>
                        </div>
                        <div className={style.movimentacoes_item}>
                            Reposicionamento
                            <div>5</div>
                        </div>
                        <div className={style.movimentacoes_item}>
                            Pesagem
                            <div>5</div>
                        </div>
                        <div className={style.movimentacoes_item}>
                            Scanner
                            <div>5</div>
                        </div>
                    </div>
                </div>
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
                            Gate out
                            <div>5</div>
                        </div>
                        <div className={style.movimentacoes_item}>
                            Reposicionamento
                            <div>5</div>
                        </div>
                        <div className={style.movimentacoes_item}>
                            Pesagem
                            <div>5</div>
                        </div>
                        <div className={style.movimentacoes_item}>
                            Scanner
                            <div>5</div>
                        </div>
                    </div>
                </div>
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
                            Gate out
                            <div>5</div>
                        </div>
                        <div className={style.movimentacoes_item}>
                            Reposicionamento
                            <div>5</div>
                        </div>
                        <div className={style.movimentacoes_item}>
                            Pesagem
                            <div>5</div>
                        </div>
                        <div className={style.movimentacoes_item}>
                            Scanner
                            <div>5</div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Containers;
