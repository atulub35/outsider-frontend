const API_URL = process.env.NODE_ENV === "production" 
  ? "https://your-rails-api.herokuapp.com" 
  : "http://localhost:3001";

export const getAuthToken = () => {
  return localStorage.getItem('jwt_token');
};

export const setAuthToken = (token) => {
  localStorage.setItem('jwt_token', token);
};

export const removeAuthToken = () => {
  localStorage.removeItem('jwt_token');
};

export const isAuthenticated = () => {
  return !!getAuthToken();
};

export const getAuthHeaders = () => {
  const token = getAuthToken();
  return {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  };
};

export const fetchWithAuth = async (endpoint, options = {}) => {
  const headers = {
    ...getAuthHeaders(),
    ...options.headers
  };

  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers
  });

  if (response.status === 401) {
    // Token expired or invalid
    removeAuthToken();
    window.location.href = '/users/sign_in';
    throw new Error('Authentication failed');
  }

  return response;
}; 