import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button, TextareaAutosize, TextField } from '@mui/material';
import React, { useState } from 'react';

const CreatePostModal = ({ isOpen, onClose, onSubmit }) => {
  const [postData, setPostData] = useState({
    body: ''
  });

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
            <form onSubmit={handleSubmit}>
                <DialogTitle id="alert-dialog-title">
                {"What's on your mind?"}
                </DialogTitle>
                <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    {/* TODO: Get content from the modal below like textarea and save */}
                    <TextField sx={{ width: "100%" }} onChange={(e) => setPostData({ ...postData, body: e.target.value })} id="outlined-basic" variant="outlined" />
                </DialogContentText>
                </DialogContent>
                <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                    <Button type="submit" autoFocus>
                        Post
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    </>
  );
};

export default CreatePostModal; 