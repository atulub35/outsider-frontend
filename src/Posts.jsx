import { useState, useEffect, useRef, useMemo } from "react"
import Post from "./components/Post"
import CreatePostModal from "./components/CreatePostModal"
import { Box, Button } from "@mui/material"
import { useApi } from "./hooks/useApi"
import { useAuth } from "./contexts/AuthContext"
import { isTokenSet } from "./utils/axios"

const PrivateText = () => {
    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(false)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const api = useApi()
    const { token } = useAuth()
    const [mode, setMode] = useState(null)
    const [selectedPost, setSelectedPost] = useState(null)
    const lastPostElementRef = useRef(null)
    const [pageInfo, setPageInfo] = useState({
        currentPage: 1,
        totalPages: 1,
        hasNextPage: false
    })

    const handleLike = async (postId) => {
        try {
            const response = await api.like(postId)
            const updatedPost = response?.data?.data
            
            setPosts((prev) => prev.map(post => 
                post.id === postId ? updatedPost : post
            ))
        } catch (error) {
            console.error('Error liking post:', error)
        }
    }

    const handleRepost = async (postId) => {
        try {
            const response = await api.repost(postId)
            const updatedPost = response?.data?.data
            setPosts((prev) => prev.map(post => 
                post.id === postId ? updatedPost : post
            ))
        } catch (error) {
            console.error('Error reposting:', error)
        }
    }
    
    
    const fetchPosts = async (page = 1) => {
        setLoading(true)
        try {
            const response = await api.getPosts(page)
            
            const { data: { posts: newPosts, pagination } } = response?.data || {}
            
            setPosts((prev) => page === 1 ? newPosts : [...prev, ...newPosts])
            setPageInfo({
                currentPage: pagination.current_page,
                totalPages: pagination.total_pages,
                hasNextPage: pagination.next_page !== null
            })
        } catch (error) {
            console.error('Error fetching posts:', error)
        } finally {
            setLoading(false)
        }
    }


    useEffect(() => {
        if (!isTokenSet()) return
        
        fetchPosts()
    }, [token])

    useEffect(() => {
        const currentObserver = new IntersectionObserver(
            entries => {
                if (entries[0].isIntersecting && pageInfo.hasNextPage && !loading) {
                    const nextPage = pageInfo.currentPage + 1
                    fetchPosts(nextPage)
                }
            },
            { threshold: 1.0 }
        )

        if (lastPostElementRef.current) {
            currentObserver.observe(lastPostElementRef.current)
        }

        return () => {
            if (lastPostElementRef.current) {
                currentObserver.unobserve(lastPostElementRef.current)
            }
        }
    }, [pageInfo.hasNextPage, pageInfo.currentPage, loading])

    const createPost = async (postData) => {
        try {
            const response = await api.createPost(postData)
            setPosts([response?.data?.data, ...posts])
            setIsModalOpen(false)
        } catch (error) {
            console.error('Error creating post:', error)
        }
    }

    const showCreatePostModal = () => {
        setIsModalOpen(true)
        setMode('create')
        setSelectedPost(null)
    }

    const showEditModal = (postId) => {
        setIsModalOpen(true)
        setMode('edit')
    }

    const showDeleteModal = (postId) => {
        setIsModalOpen(true)
        setMode('delete')
    }

    const handleDeletePost = async () => {
        try {
            await api.deletePost(selectedPost.id)
            setPosts((prev) => prev.filter(post => post.id !== selectedPost.id))
        } catch (error) {
            console.error('Error deleting post:', error)
        }
        
    }


    const handleUpdatePost = async (postData) => {
        try {
            const response = await api.updatePost(selectedPost.id, postData)
            const updatedPost = response?.data?.data
            setPosts((prev) => prev.map(post => 
                post.id === selectedPost.id ? updatedPost : post
            ))
        } catch (error) {
            console.error('Error updating post:', error)
        }
    }

    // Memoize posts to prevent unnecessary re-renders
    const memoizedPosts = useMemo(() => posts, [posts])

    return(
        <div>
            <Box sx={{ justifyContent: "end", display: "flex", mb: 4 }}>
                <Button
                    variant="outlined"
                    onClick={showCreatePostModal}>
                    Create New Post
                </Button>
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                {memoizedPosts.length ? <>
                    {memoizedPosts.map((post, index) => (
                        <div
                            key={post.id}
                            ref={index === memoizedPosts.length - 1 ? lastPostElementRef : null}
                        >
                            <Post 
                                post={post} 
                                onLike={handleLike} 
                                handleRepost={handleRepost} 
                                showEditModal={showEditModal}
                                showDeleteModal={showDeleteModal}
                                setSelectedPost={setSelectedPost}
                            />
                        </div>
                    ))}
                </> : 'No posts found' }
            </Box>
            <CreatePostModal 
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSubmit={mode === 'create' ? createPost : handleUpdatePost} 
                mode={mode}
                selectedPost={selectedPost}
                handleDeletePost={handleDeletePost}
                handleUpdatePost={handleUpdatePost}
            />
        </div>
    )
}

export default PrivateText