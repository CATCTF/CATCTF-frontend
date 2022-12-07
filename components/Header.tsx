import styles from '../styles/Header.module.scss'
import variables from '../styles/Variables.module.scss'

function $(...classes: string[]) {
  return classes.join(" ");
}

export default function Header() {
  return (
    <div className={$(styles.header, variables.default_padding)}>
      <div className={variables.default_title}>
        <h1>CATCTF</h1>
      </div>
      <div className={styles.header_btns}>
        <a href="/challenge">Challenge</a>
        <a href="/scoreboard">Scoreboard</a>
        <a href="/users">Users</a>
      </div>
      <div className={$(styles.header_auth, styles.header_btns)}>
        <a href="/login">Login</a>
        <a href="/register">Register</a>
      </div>
    </div>
  )
}