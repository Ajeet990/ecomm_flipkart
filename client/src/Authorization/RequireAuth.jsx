import React from 'react'
import { useAuth } from './Auth'
import { Navigate, useLocation } from 'react-router-dom'
// import { useNavigate } from 'react-router-dom'

export const RequireAuth = ({children}) => {
    const auth = useAuth()
    const location = useLocation()
    // const history = useNavigate()
    // console.log(children)

    // if (!auth.user) {
    //     return <Navigate to="/" state={{path:location.pathname}}/>
    //     // return <Navigate to="/login"/>
    // }
    if (!auth.user) {
        return <Navigate to="/login" state={{path:location.pathname}}/>
        // return <Navigate to="/login"/>
        // return history('/')
    }

    return children
}
