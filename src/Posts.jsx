import { useState,useEffect } from "react"
import { API_URL } from "./config"
import Post from "./components/Post"
import { createPost, getPosts, like, repost } from "./api"
import CreatePostModal from "./components/CreatePostModal"
const PrivateText=({ })=>{
    const [posts, setPosts]=useState([])
    const [loading, setLoading] = useState(false)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const handleLike = (postId) => {
        like(postId)
        .then(response => setPosts((prev) => prev.map(post => post.id === postId ? response : post)))
        // .then(data => setData(data?.posts))
    }

    const handleRepost = (postId) => {
        repost(postId)
        .then(response => setPosts((prev) => prev.map(post => post.id === postId ? response : post)))
    }

    useEffect(() => {
        if (posts.length > 0) return
        getPosts()
        .then(response => response.json())
        .then(response => response.data)
        .then(data => setPosts(data?.posts))
    }, [])

    const handleCreatePost = async (postData) => {
        try {
            const response = await createPost(postData)
            console.log('response create', response)
            setPosts([response, ...posts])
            setIsModalOpen(false)
            
    
            // Refresh the posts list or add the new post to the state
            // You might want to implement this based on your state management solution
        } catch (error) {
            console.error('Error creating post:', error)
            // Handle error (show error message to user)
        }
        }
    
        if (loading) return <p>Loading...</p>

    return(
        <div>
            <div className="mb-8">
                <button 
                    onClick={() => setIsModalOpen(true)}
                    className="w-full bg-indigo-600 text-white rounded-lg py-3 px-4 hover:bg-indigo-700 transition-colors duration-200 font-medium">
                    Create New Post
                    </button>
            </div>
            {posts.length ? posts.map((post)=> <Post key={post.id} post={post} onLike={handleLike} handleRepost={handleRepost} /> ) : 'No posts found' }
            <CreatePostModal 
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSubmit={handleCreatePost} />
        </div>
    )
}
export default PrivateText