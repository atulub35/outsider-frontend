import React from 'react';
import { formatDistanceToNow } from 'date-fns';

const Post = ({ post, onLike, handleRepost }) => {
  const {
    body,
    created_at,
    likes_count,
    repost_count,
    user: { name, email, avatar_url }
  } = post;

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-4 hover:shadow-lg transition-shadow duration-200">
      <div className="flex items-start space-x-4">
        {/* User Avatar */}
        <div className="flex-shrink-0">
          {avatar_url ? (
            <img
              src={avatar_url}
              alt={name}
              className="w-12 h-12 rounded-full"
            />
          ) : (
            <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center">
              <span className="text-indigo-600 font-semibold text-lg">
                {name.charAt(0).toUpperCase()}
              </span>
            </div>
          )}
        </div>

        {/* Post Content */}
        <div className="flex-1">
          {/* User Info */}
          <div className="flex items-center space-x-2">
            <h3 className="font-semibold text-gray-900">{name}</h3>
            <span className="text-gray-500 text-sm">@{email.split('@')[0]}</span>
            <span className="text-gray-400">·</span>
            <span className="text-gray-500 text-sm">
              {formatDistanceToNow(new Date(created_at), { addSuffix: true })}
            </span>
          </div>

          {/* Post Body */}
          <p className="mt-2 text-gray-800 text-base">{body}</p>

          {/* Interaction Buttons */}
          <div className="mt-4 flex items-center space-x-6">
            <button className="flex items-center space-x-1 text-gray-500 hover:text-indigo-600 transition-colors duration-200" onClick={() => onLike(post.id)}>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              <span className="text-sm">{likes_count}</span>
            </button>

            <button className="flex items-center space-x-1 text-gray-500 hover:text-green-600 transition-colors duration-200" onClick={() => handleRepost(post.id)}>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
              </svg>
              <span className="text-sm">{repost_count}</span>
            </button>

            <button className="flex items-center space-x-1 text-gray-500 hover:text-blue-600 transition-colors duration-200">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              <span className="text-sm">Comment</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post; 