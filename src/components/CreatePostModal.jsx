import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button, TextareaAutosize } from '@mui/material';
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
        >
            <form onSubmit={handleSubmit}>
                <DialogTitle id="alert-dialog-title">
                {"What's on your mind?"}
                </DialogTitle>
                <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    {/* TODO: Get content from the modal below like textarea and save */}
                    <TextareaAutosize
                        aria-label="minimum height"
                        onChange={(e) => setPostData({ ...postData, body: e.target.value })}
                        minRows={3}
                        placeholder="Minimum 3 rows"
                        />
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