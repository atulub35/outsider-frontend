import { API_URL } from './config';
import { getAuthToken } from './utils/auth';
export const login = async (formData) => {
  // const res = await fetch(`${API_URL}/users/sign_in.json`, {
  //   method: "POST",
  //   credentials: "include", // Important for session-based auth
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  //   body: JSON.stringify({ user: formData }),
  // });

  // return res.json();

  fetch(`${API_URL}/users/sign_in.json`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email: "atul612@gmail.com", password: "12345678" }),
  })
    .then((res) => res.json())
    .then((data) => {
      localStorage.setItem("authToken", data.token);
    })

}

export const getProfile = async () => {
  const res = await fetch(`${API_URL}/api/v1/users/1`, {
    headers: {
      "content-type": "application/json",
      "accept": "application/json",
      "authorization": getAuthToken()
    },
  })

  return res.json()
}

export const logout = async () => {
  await fetch(`${API_URL}/users/sign_out.json`, {
    method: "DELETE",
    headers: {
      "content-type": "application/json",
      "accept": "application/json",
      "authorization": getAuthToken()
    },
  });
};

export const getPosts = async () => {
  console.log('Token being used', getAuthToken());
  
  return await fetch(`${API_URL}/posts.json`, {
    method: "GET",  
    headers: {
     "content-type": "application/json",
      "accept": "application/json",
      "authorization": getAuthToken()
    }
  });
};

export const createPost = async (formData) => {
  const res =  await fetch(`${API_URL}/posts.json`, {
    method: "POST",
    headers: { 
      "content-type": "application/json",
      "accept": "application/json",
      "authorization": getAuthToken()
     },
    body: JSON.stringify({ post: formData }),
  });
  return res.json();
};
export const updatePost = async (formData) => {
  const res =  await fetch(`${API_URL}/posts.json`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "accept": "application/json",
      "authorization": getAuthToken()
    },
    body: JSON.stringify({ post: formData }),
  });
  return res.json();
};

export const deletePost = async (postId) => {
  const res =  await fetch(`${API_URL}/posts/${postId}.json`, {
    method: "DELETE",
    headers: {
      "content-type": "application/json",
      "accept": "application/json",
      "authorization": getAuthToken()
     }
  });
  return res.json();
};  
export const like = async (postId) => {
  const res =  await fetch(`${API_URL}/posts/${postId}/like.json`, {
    method: "get",
    headers: { 
      "content-type": "application/json",
      "accept": "application/json",
      "authorization": getAuthToken()
     }
  });
  return res.json();
};

export const repost = async (postId) => {
  const res =  await fetch(`${API_URL}/posts/${postId}/repost.json`, {
    method: "get",
    headers: { 
      "content-type": "application/json",
      "accept": "application/json",
      "authorization": getAuthToken()
     }
  });
  return res.json();
};
