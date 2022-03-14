import React from 'react'
import { useAuthState } from '../context/auth'
import { Route, Navigate } from 'react-router-dom'

export const UnprotectedRoute = ({children}) => {
    const { user } = useAuthState()

    // if(props.authenticated && !user){
    //     navigate('/login')
    // } else 
    if (!user){
        return <Navigate to="/login" replace />
    } 
    return children;
    
}
