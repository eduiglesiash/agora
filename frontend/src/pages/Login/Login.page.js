import './Login.css'



export default function LoginPage() {

  return (
    <section className="Login">
      <form className="Login__form">
        <fieldset>
          <legend className="sr-only">Login</legend>
          <div className="Login__group">
            <label htmlFor="user">Usuario</label>
            <input type="text"/>
          </div>
          <div>
            <label htmlFor="pass">Password</label>
            <input type="password"/>
          </div>
        </fieldset>
        <button type="submit" className="a-btn a-btn__action">Acceso a la biblioteca</button>
      </form>
    </section>
  )
}
