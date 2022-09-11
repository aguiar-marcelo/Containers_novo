import styles from './Content.module.css'

function Container(props) {
  return (
    <div className={`${styles.content}`}>
      {props.children}
    </div>
  )
}

export default Container
