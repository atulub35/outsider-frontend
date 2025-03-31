import React, { useState } from 'react'
import Posts from '../Posts'
import Theme from '../components/Theme'
const Home = ({  currentUser }) => {

    return (
        <>
            <Theme />
            <Posts />
        </>
    )
}

export default Home 