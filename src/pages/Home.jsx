import React, { useState } from 'react'
import Posts from '../Posts'
const Home = ({  currentUser }) => {

    return (
        <div className="max-w-2xl mx-auto px-4 py-8">
        {/* Create Post Button */}
        <Posts />
        {/* Create/Edit Post Modal */}
        {/* <Posts /> */}
        </div>
    )
}

export default Home 