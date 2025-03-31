import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button, TextareaAutosize, TextField } from '@mui/material';
import React, { useState } from 'react';

const CreatePostModal = ({ isOpen, onClose, onSubmit, mode, handleDeletePost, selectedPost }) => {
  const [postData, setPostData] = useState({
    body: ''
  });

  console.log(mode, selectedPost)
  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(postData);
    setPostData({ body: '' });
    onClose();
  };
  

  return (
    <>
        <Dialog
            open={isOpen}
            onClose={onClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            sx={{
                "& .MuiDialog-paper": {
                    width: "500px",
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
                    <TextField sx={{ width: "100%", padding: 2 }} onChange={(e) => setPostData({ ...postData, body: e.target.value })} id="outlined-basic" variant="outlined" />
                
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
                    <TextField sx={{ width: "100%", padding: 2 }} onChange={(e) => setPostData({ ...postData, body: e.target.value })} id="outlined-basic" variant="outlined" />
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
  );
};

export default CreatePostModal; 