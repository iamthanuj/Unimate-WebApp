import axios from "axios";

const API_URL = "http://localhost:5000/api/posts/";

// Create new post
const createPost = async (postData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data',
    },
  };
  const response = await axios.post(API_URL+"create", postData, config);
  return response.data;
};



// Get user posts
const getUserPosts = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL + "userpost", config);

  return response.data;
};


// Get all posts
const getAllPosts = async () => {

  const response = await axios.get(API_URL +"all");

  return response.data;
};





// Delete user post
const deletePost = async (postId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.delete(API_URL="delete"+postId, config);

  return response.data;
};

const postService = {
  createPost,
  getUserPosts,
  deletePost,
  getAllPosts,
};

export default postService;
