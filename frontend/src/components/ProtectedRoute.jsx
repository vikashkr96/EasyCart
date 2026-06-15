import React from 'react'
import { useSelector } from 'react-redux'
import Loader from './Loader.jsx'
import { Navigate } from 'react-router-dom'

function ProtectedRoute({element}) {

    const {isAuthenticated, isLoadingUser} = useSelector(
        state => state.user
    )


    if(isLoadingUser){
        return <Loader/>
    }


    if(!isAuthenticated){
        return <Navigate to="/login" replace />
    }


    return element
}

export default ProtectedRoute