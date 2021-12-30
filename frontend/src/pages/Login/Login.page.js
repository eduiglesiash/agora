import './Login.css'
import { useFormik } from 'formik'
import { useAuth } from '../../hooks/useAuth'
import { toast } from 'react-toastify';
import { config } from '../../config/config';
import { useNavigate } from 'react-router-dom';


export default function LoginPage() {
  const auth = useAuth();
  const navigate = useNavigate();

  const loginUser = useFormik({
    initialValues: {
      identifier: '',
      password: ''
    },
    onSubmit: async (values) => {
      console.log({ values })
      
      // Request 
      const statusRequest = await auth.signin({ ...values })
      
      console.log({login: statusRequest})

      if (statusRequest.user) {
        toast.success(config.toastMessage.loginSuccess)
        navigate(config.paths.dashboard)
      } else {
        toast.error(config.toastMessage.loginError, {
          position: toast.POSITION.TOP_CENTER
        })
      }
    }
  })
  return (
    <section className="Login">
      <form className="Login__form" onSubmit={loginUser.handleSubmit}>
        <fieldset>
          <legend className="sr-only">Login</legend>
          <div className="Login__group">
            <label htmlFor="identifier">Email</label>
            <input id="identifier" type="text" placeholder="username"
              onChange={loginUser.handleChange}
              value={loginUser.values.user} required />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input id="password" type="password" placeholder="password"
              onChange={loginUser.handleChange}
              values={loginUser.values.email} required />
          </div>
        </fieldset>
        <button type="submit" className="a-btn a-btn__action">Acceso a la biblioteca</button>
      </form>
    </section>
  )
}
