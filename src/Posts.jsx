import { useState, useEffect } from "react"
import Post from "./components/Post"
import CreatePostModal from "./components/CreatePostModal"
import { Box, Button } from "@mui/material"
import { useApi } from "./hooks/useApi"
import { useAuth } from "./contexts/AuthContext"
const PrivateText = () => {
    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(false)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const api = useApi()
    const { token } = useAuth()
    const handleLike = async (postId) => {
        try {
            const response = await api.like(postId)
            setPosts((prev) => prev.map(post => 
                post.id === postId ? response : post
            ))
        } catch (error) {
            console.error('Error liking post:', error)
        }
    }

    const handleRepost = async (postId) => {
        try {
            const response = await api.repost(postId)
            setPosts((prev) => prev.map(post => 
                post.id === postId ? response : post
            ))
        } catch (error) {
            console.error('Error reposting:', error)
        }
    }

    useEffect(() => {
        const fetchPosts = async () => {
            if (posts.length > 0) return
            setLoading(true)
            try {
                const response = await api.getPosts()
                setPosts(response.data?.posts || [])
            } catch (error) {
                console.error('Error fetching posts:', error)
            } finally {
                setLoading(false)
            }
        }

        fetchPosts()
    }, [])

    const handleCreatePost = async (postData) => {
        try {
            const response = await api.createPost(postData)
            setPosts([response, ...posts])
            setIsModalOpen(false)
        } catch (error) {
            console.error('Error creating post:', error)
        }
    }

    if (loading) return <p>Loading...</p>

    return(
        <div>
            <div className="mb-8">
                <Button
                    onClick={() => setIsModalOpen(true)}>
                    Create New Post
                </Button>
            </div>
            <Box className="flex flex-col gap-4">
                {posts.length ? posts.map((post)=> 
                    <Post 
                        key={post.id} 
                        post={post} 
                        onLike={handleLike} 
                        handleRepost={handleRepost} 
                    />
                ) : 'No posts found' }
            </Box>
            <CreatePostModal 
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSubmit={handleCreatePost} 
            />
        </div>
    )
}

export default PrivateText