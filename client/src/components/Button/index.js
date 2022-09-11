import styles from './Button.module.css'

function Button(props) {
  return (
    <button className={styles.btn} onClick={props.func}>
     <span className={styles.span}>+</span> {props.children}
    </button>
  )
}

export default Button
