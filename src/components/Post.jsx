import React from 'react';
import { formatDistanceToNow } from 'date-fns';
import { Avatar, Card, CardContent, CardHeader, IconButton, Typography, CardActions, Button } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';

const Post = ({ post, onLike, handleRepost }) => {
  const {
    body,
    created_at,
    likes_count,
    repost_count,
    user: { name, email, avatar_url }
  } = post;

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
                <IconButton aria-label="settings">
                    <MoreVertIcon />
                </IconButton>
                }
                title={name}
                subheader={formatDistanceToNow(new Date(created_at), { addSuffix: true })}
            />
           
            <CardContent>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    {body}
                </Typography>
            </CardContent>
            <CardActions disableSpacing className='flex gap-3'>
                <Button onClick={() => onLike(post.id)} variant="outlined" startIcon={<FavoriteIcon />}>
                {likes_count}
                </Button>
                <Button onClick={() => handleRepost(post.id)} variant="outlined" startIcon={<ShareIcon />}>
                {repost_count}
                </Button>
            </CardActions>
        </Card>
    </>
  );
};

export default Post; 