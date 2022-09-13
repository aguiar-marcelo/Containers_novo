import style from './Movimentacoes.module.css'
import Axios from 'axios';
import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import EditMovimentacao from '../../EditMovimentacao';
import NewMovimentacao from '../../NewMovimentacao';


function Movimentacoes() {
  let { id } = useParams();
  const [moviList, setMoviList] = useState([])

  useEffect(() => {
    getMovimentacoes(id);
  })

  //READ
  const getMovimentacoes = (id) => {
    Axios.get(`http://localhost:8080/movimentacao/${id}`).then((response) => {
      setMoviList(response.data);
    });
  }

  //DELETE
  const deleteMovimentacao = (id) => {
    Axios.delete(`http://localhost:8080/movimentacao/delete/${id}`)
  }

  return (
    <>
      <NewMovimentacao container={id}/>
      <div className={style.sumario}></div>
      <div className={style.table}></div>

      {moviList.length == 0 ? //operador ternario, caso nao tenha nenhum registro
        <div className={style.zeromovimentacoes}>
          Nenhuma movimentação registrada
        </div>
        :
        <div className={style.movimentacoes}>
          {moviList.map((val, key) => ( //caso retorne pelo menos um registro
            <div className={style.movimentacao}>
              <div className={style.tipo}>{val.tipo}</div>
              <div className={style.data}>
                <div>Inicio:</div>
                {val.inicio.replace(" ", " > ")}
              </div>
              <div className={style.data}>
                <div>Fim:</div>
                {val.fim.replace(" ", " > ")}
              </div>
              <div className={style.icons}>
                <i class="fas fa-trash-alt"
                  title="Deletar"
                  onClick={() => { deleteMovimentacao(val.id) }}>
                </i>
                <EditMovimentacao movimentacao={val} />
              </div>
            </div>
          ))}
        </div>
      }
    </>
  )
}

export default Movimentacoes;
