import React, { useState } from 'react'
import { formatDistanceToNow } from 'date-fns'
import { Avatar, Card, CardContent, CardHeader, IconButton, Typography, CardActions, Button, Menu, MenuItem, ListItemIcon, ListItemText } from '@mui/material'
import FavoriteIcon from '@mui/icons-material/Favorite'
import ShareIcon from '@mui/icons-material/Share'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';    

const Post = ({ post, onLike, handleRepost, showEditModal, showDeleteModal, setSelectedPost }) => {
  const {
    body,
    title,
    created_at,
    likes_count,
    repost_count,
    user: { name, email, avatar_url }
  } = post
  

  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }


  const handleEditPost = () => {
    setSelectedPost(post)
    showEditModal()
  }

  const handleDeletePost = () => {
    setSelectedPost(post)
    showDeleteModal()
  }

  return (
    <>
        <Card sx={{ }}>
            <CardHeader
                avatar={
                <Avatar sx={{  }} src={avatar_url} aria-label="recipe">
                    {name.charAt(0).toUpperCase()}
                </Avatar>
                }
                action={
                <IconButton id="basic-button"
                    aria-controls={open ? 'basic-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                    onClick={handleClick}>
                            <MoreVertIcon />
                        </IconButton>
                    }
                    title={name}
                    subheader={formatDistanceToNow(new Date(created_at), { addSuffix: true })}
                />
                <Menu
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    MenuListProps={{
                    'aria-labelledby': 'basic-button',
                    }}>
                        <MenuItem onClick={handleEditPost}>
                        <ListItemIcon>
                            <EditIcon fontSize="small" />
                        </ListItemIcon>
                        <ListItemText>Edit</ListItemText>
                    </MenuItem>
                    <MenuItem onClick={handleDeletePost}>
                        <ListItemIcon>
                            <DeleteIcon fontSize="small" />
                        </ListItemIcon>
                        <ListItemText>Delete</ListItemText>
                    </MenuItem>
                </Menu>
           
            <CardContent>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  {title}
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }} dangerouslySetInnerHTML={{ __html: body.body }} />
            </CardContent>
            <CardActions disableSpacing sx={{ gap: 1 }}>
                <Button onClick={() => onLike(post.id)} variant="outlined" startIcon={<FavoriteIcon />}>
                {likes_count}
                </Button>
                <Button onClick={() => handleRepost(post.id)} variant="outlined" startIcon={<ShareIcon />}>
                {repost_count}
                </Button>
            </CardActions>
        </Card>
    </>
  )
}

export default Post 