import { Dialog, DialogTitle, DialogActions, Button, Box, TextField, FormControlLabel } from '@mui/material'
import React, { useState, useEffect } from 'react'
import 'react-quill-new/dist/quill.snow.css'
import ReactQuill from 'react-quill-new'
import InputAdornment from '@mui/material/InputAdornment';
const CreatePostModal = ({ isOpen, onClose, onSubmit, mode, handleDeletePost, selectedPost }) => {
  const [postData, setPostData] = useState({ body: '', title: '' })

  useEffect(() => {
    setPostData({ body: selectedPost?.body?.body, title: selectedPost?.title })
  }, [selectedPost])

  console.log(mode, selectedPost)
  if (!isOpen) return null

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit(postData)
    setPostData({ body: '', title: '' })
    onClose()
  }
  

  return (
    <>
        <Dialog
            open={isOpen}
            onClose={onClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            sx={{
                "& .MuiDialog-paper": {
                    width: "800px",
                    maxWidth: "90vw",
                },
            }}
        >
            {mode === 'create' && (
                <form onSubmit={handleSubmit}>
                    <DialogTitle id="alert-dialog-title">
                    {"What's on your mind?"}
                    </DialogTitle>
                    
                    {/* TODO: Get content from the modal below like textarea and save */}
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, padding: 2 }}>
                        <div>Give a title to your post</div>
                        <TextField
                            id="outlined-size-small"
                            size="small"
                            value={postData.title}
                            onChange={(e) => setPostData({ ...postData, title: e.target.value })}
                        />
                        <div>What's on your mind?</div>
                        <ReactQuill theme="snow" value={postData.body} onChange={(value) => setPostData({ ...postData, body: value })} />
                    </Box>
                
                <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                    <Button type="submit" autoFocus>
                        Post
                    </Button>
                </DialogActions>
            </form>)}
            {mode === 'edit' && (
                <form onSubmit={handleSubmit}>
                    <DialogTitle id="alert-dialog-title">
                    {"Edit your post"}
                    </DialogTitle>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, padding: 2 }}>
                        <div>Give a title to your post</div>
                        <TextField
                            id="outlined-size-small"
                            defaultValue="Small"
                            size="small"
                            value={postData.title}
                            onChange={(e) => setPostData({ ...postData, title: e.target.value })}
                        />
                        <div>What's on your mind?</div>
                        <ReactQuill theme="snow" value={postData.body} onChange={(value) => setPostData({ ...postData, body: value })} />
                    </Box>
                    <DialogActions>
                        <Button onClick={onClose}>Cancel</Button>
                        <Button type="submit" autoFocus>
                            Save
                        </Button>
                    </DialogActions>
                </form>
            )}
            {mode === 'delete' && (
                <>
                    <DialogTitle id="alert-dialog-title">
                        {"Are you sure you want to delete this post?"}
                    </DialogTitle>
                    <form onSubmit={handleDeletePost}>
                        <DialogActions>
                            <Button color="error" type="submit" autoFocus>
                                Delete
                            </Button>
                            <Button onClick={onClose}>Cancel</Button>
                        </DialogActions>
                    </form>
                </>
            )}
        </Dialog>
    </>
  )
}

export default CreatePostModal 