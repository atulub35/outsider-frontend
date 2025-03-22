import React, { useEffect, useState } from "react"
import { createPost, getPosts, like } from "./api"
import Post from "./components/Post"
import CreatePostModal from "./components/CreatePostModal"
const Posts = ({}) => {
    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(false)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const handleLike = (postId) => {
        like(postId)
        .then(response => setData((prev) => prev.map(post => post.id === postId ? response : post)))
        // .then(data => setData(data?.posts))
    }
    useEffect(() => {
        if (data) return
        getPosts()
        .then(response => response.json())
        .then(response => response.data)
        .then(data => setData(data?.posts))
      }, [])

    const handleCreatePost = async (postData) => {
    try {
        const response = await createPost(postData)
        console.log('response create', response)
        setData([response, ...data])
        setIsModalOpen(false)
        

        // Refresh the posts list or add the new post to the state
        // You might want to implement this based on your state management solution
    } catch (error) {
        console.error('Error creating post:', error)
        // Handle error (show error message to user)
    }
    }

    if (loading) return <p>Loading...</p>
    console.log('data', data)
    return (
        <div className="space-y-6">
             <button 
            onClick={() => setIsModalOpen(true)}
            className="w-full bg-indigo-600 text-white rounded-lg py-3 px-4 hover:bg-indigo-700 transition-colors duration-200 font-medium">
            Create New Post
            </button>
            <h2>Posts</h2>
            <ul>
                {data?.map((post) => (
                    <Post key={post.id} post={post} setData={setData} onLike={handleLike} />
                ))}
            </ul>
            <CreatePostModal 
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSubmit={handleCreatePost} />
        </div>
    )
}

export default Posts
