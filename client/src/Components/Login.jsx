import React, {useState} from 'react'
import {toast} from 'react-toastify'
import { useLogInMutation } from '../Services/authApi'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../Authorization/Auth'

const Login = () => {
    const auth = useAuth()
    const navigate = useNavigate()
    const [makeUserLogin] = useLogInMutation()
    const [userEmail, setUserEmail] = useState('')
    const [userPass, setUserPass] = useState('')
    const handleSubmit = async(e) => {
        e.preventDefault()
        if (!userEmail || !userPass) {
            toast.warning("Please enter all fields.")
        } else {
            // console.log(userEmail, userPass)
            const loginRst = await makeUserLogin({email:userEmail, password:userPass})
            // console.log("login rst",loginRst)
            if (loginRst.data.success) {
                toast.success("Login success.")
                const loggedInUserDetail = {
                    user_name:loginRst.data.data.username,
                    user_email:loginRst.data.data.email
                }
                localStorage.setItem('flipUserToken',loginRst.data.data.loginToken)
                auth.login(loggedInUserDetail)
                navigate('/')
            } else {
                toast.error(loginRst.data.message)
            }

        }
    }
  return (
    <div>
        <div className='container bg-info my-1 col-lg-5'>
            <h1>Login page</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                    <input type="email" name='user_email' onChange={(e)=>{setUserEmail(e.target.value)}} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <input type="password" name='user_pass' onChange={(e)=>{setUserPass(e.target.value)}} className="form-control" id="exampleInputPassword1" />
                </div>
                <button type="submit" className="btn btn-primary">Log In</button>
                {/* <NavLink to={'/addUser'} className="btn btn-primary mx-1">Sign Up</NavLink> */}
            </form>
        </div>
    </div>
  )
}

export default Login