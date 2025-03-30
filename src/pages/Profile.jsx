import React, { useEffect, useState } from 'react'
import Posts from '../Posts'
import { useAuth } from '../contexts/AuthContext'
import { useApi } from '../hooks/useApi'
const Home = ({  currentUser }) => {
    const { token } = useAuth()
    const [profile, setProfile] = useState(null)
    const api = useApi()

    useEffect(() => {
        const fetchProfile = async () => {
            const response = await api.getProfile()
            setProfile(response.data.user)
        }
        fetchProfile()
    }, [])
    
    return (
        <div>
            <h1>Profile</h1>
            <p>{profile?.name}</p>
            <p>{profile?.email}</p>
        </div>
    )
}

export default Home 