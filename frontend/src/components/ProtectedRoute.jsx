import React from 'react'
import { useSelector } from 'react-redux'
import Loader from './Loader.jsx'
import { Navigate } from 'react-router-dom'

function ProtectedRoute({element, adminOnly = false}) {

    const {isAuthenticated, isLoadingUser, user} = useSelector(
        state => state.user
    )

    if(isLoadingUser){
        return <Loader/>
    }

    if(!isAuthenticated){
        return <Navigate to="/login" replace />
    }

    if(adminOnly && user?.role !== 'admin'){
        return <Navigate to="/" replace />
    }

    return element
}

export default ProtectedRoute