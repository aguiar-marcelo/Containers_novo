import { Link } from "react-router-dom";
import style from "./Navbar.module.css";
import logo from "../../img/containerlogo.png";

function Navbar() {
  return (
    <div className={style.navbar}>
    <div className={style.conteudo}>
        <Link to="/">
          <img src={logo} alt="Logo" />
        </Link>
        <div className={style.list}>
          <div className={style.item}>
            <Link to="/">Containers</Link>
          </div>
          <div className={style.item}>
            <Link to="/relatorio">Relatório</Link>
          </div>
          </div>
        </div>
    </div>
  );
}

export default Navbar;
