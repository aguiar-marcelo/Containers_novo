import style from './Containers.module.css'
import { useNavigate } from "react-router-dom";
import Axios from 'axios';
import { useEffect, useState } from 'react';
import NewContainer from '../../NewContainer';
import EditContainer from '../../EditContainer';

function Containers() {

  const [containerList, setContainerList] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    getContainers();
  })

  //READ
  const getContainers = () => {
    Axios.get('http://localhost:8080/containers').then((response) => {
      setContainerList(response.data)
    });
  }

  //DELETE
  const deleteContainer = (id) => {
    Axios.delete(`http://localhost:8080/container/delete/${id}`)
  }

  const Direction = (id) => {
    navigate(`/movimentacoes/${id}`);
  }

  const [busca, setBusca] = useState("");


  return (
    <>
      <div className={style.flex}>
        <NewContainer />
        <input
          className={style.busca}
          maxLength="11"
          type="text"
          placeholder='Pesquisar...'
          onChange={(event) => {
            setBusca(event.target.value);
          }} />
        
      </div>
      <div className={style.sumario}>
        <div>Nome</div>
        <div>Cliente</div>
        <div className={style.center}>Tipo</div>
        <div className={style.center}>Status</div>
        <div className={style.center}>Categotia</div>
        <div></div>
      </div>
      {/* //operador ternario, caso nao tenha nenhum registro */}
      {containerList.length == 0 ?
        <div className={style.zerocontainer}>Nenhum container registrado</div>

        :

        <div className={style.table}>

          {containerList.filter((val) => {
            if (busca == "") {
              return val
            } else if (val.nome.toLowerCase().includes(busca.toLowerCase()) || val.cliente.toLowerCase().includes(busca.toLowerCase()) || val.tipo.toLowerCase().includes(busca.toLowerCase()) || val.status.toLowerCase().includes(busca.toLowerCase()) || val.categoria.toLowerCase().includes(busca.toLowerCase())) {
              return val
            }
          }).map((val, key) => {

            return (
              <div className={style.table_item}>
                <div>{val.nome}</div>
                <div>{val.cliente}</div>
                <div className={style.center}>{val.tipo}</div>
                <div className={style.center}>{val.status}</div>
                <div className={style.center}>{val.categoria}</div>
                <div className={style.icons}>

                  <i class="fas fa-trash-alt"
                    title="Deletar"
                    onClick={() => { deleteContainer(val.id) }}>
                  </i>

                  <EditContainer container={val} />

                  <i class="fas fa-retweet"
                    title="Movimentações"
                    onClick={() => { Direction(val.id) }}>
                  </i>
                </div>
              </div>
            )
          })}

        </div>
      }

    </>
  )
}

export default Containers;
