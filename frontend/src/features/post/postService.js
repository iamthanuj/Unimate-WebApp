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

  const response = await axios.get(API_URL+"userpost",config);

  return response.data;
};



//update post
const updatePost = async (updateData,token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.put(API_URL+"update/"+updateData._id,updateData,config);
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

  const response = await axios.delete(API_URL+"delete/"+postId,config);
  return response.data;
};



//like post
const likePost = async(postId, token)=>{
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json', 
    },
  };

  const response = await axios.patch(API_URL+"like/"+postId,{}, config)
  return response.data;
}



//comment post
const commentPost = async(commentData, token)=>{
  const config = {
    headers:{
      Authorization:  `Bearer ${token}`,
      'Content-Type': 'application/json', 
    },

  };
  const response = await axios.patch(API_URL+"comment/"+commentData._id,commentData,config)
  return response.data;
}



//gett all posts for admin
const getAllAdminPosts = async () => {
  const response = await axios.get(API_URL +"adminall");
  return response.data;
};



// Delete user post by admin
const adminDeletePost = async (postId) => {
  
  const response = await axios.delete(API_URL+"admindelete/"+postId,{});
  return response.data;
};


const postService = {
  createPost,
  getUserPosts,
  deletePost,
  getAllPosts,
  likePost,
  commentPost,
  getAllAdminPosts,
  adminDeletePost,
  updatePost,
};

export default postService;
