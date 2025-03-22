import React, { useState } from 'react';
import Post from '../components/Post';
import CreatePostModal from '../components/CreatePostModal';
import { createPost, deletePost, updatePost } from '../api';
import Posts from '../Posts';
const Home = ({ posts, currentUser }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      {/* Create Post Button */}
      <div className="mb-8">
        <button 
          onClick={() => {
            setEditingPost(null);
            setIsModalOpen(true);
          }}
          className="w-full bg-indigo-600 text-white rounded-lg py-3 px-4 hover:bg-indigo-700 transition-colors duration-200 font-medium"
        >
          Create New Post
        </button>
      </div>

      {/* Posts List */}
      <div className="space-y-6">
        {posts?.map(post => (
          <Post
            key={post.id}
            post={post}
            currentUser={currentUser}
            onEdit={handleEditPost}
            onDelete={handleDeletePost}
          />
        ))}
      </div>

      {/* Create/Edit Post Modal */}
      <Posts />
    </div>
  );
};

export default Home; 