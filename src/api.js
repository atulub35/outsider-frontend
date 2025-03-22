import { API_URL } from './config';
export const login = async (formData) => {
  const res = await fetch(`${API_URL}/users/sign_in.json`, {
    method: "POST",
    credentials: "include", // Important for session-based auth
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ user: formData }),
  });

  return res.json();
};

export const getProfile = async () => {
  const res = await fetch(`${API_URL}/api/v1/users/1`, {
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  });

  return res.json();
};

export const logout = async () => {
  await fetch(`${API_URL}/users/sign_out.json`, {
    method: "DELETE",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const getPosts = async () => {
  return await fetch(`${API_URL}/posts.json`, {
    method: "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const createPost = async (formData) => {
  const res =  await fetch(`${API_URL}/posts.json`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include", // Ensures cookies are sent
    body: JSON.stringify({ post: formData }),
  });
  return res.json();
};
export const updatePost = async (formData) => {
  const res =  await fetch(`${API_URL}/posts.json`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include", // Ensures cookies are sent
    body: JSON.stringify({ post: formData }),
  });
  return res.json();
};

export const deletePost = async (postId) => {
  const res =  await fetch(`${API_URL}/posts/${postId}.json`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    credentials: "include"
  });
  return res.json();
};  
export const like = async (postId) => {
  const res =  await fetch(`${API_URL}/posts/${postId}/like.json`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
    credentials: "include"
  });
  return res.json();
};

export const repost = async (postId) => {
  const res =  await fetch(`${API_URL}/posts/${postId}/repost.json`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
    credentials: "include"
  });
  return res.json();
};
