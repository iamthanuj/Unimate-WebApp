import  axios from "axios";

const API_URL = 'http://localhost:5000/api/users/'


//register
const register = async (userData)=>{
    const response = await axios.post(API_URL+"register", userData, { headers: {'Content-Type': 'multipart/form-data'}})

    if(response.data) {
        localStorage.setItem('user', JSON.stringify(response.data))
    }

    return response.data
}


//login
const login = async (userData)=>{
    const response = await axios.post(API_URL + 'login', userData)

    if(response.data) {
        localStorage.setItem('user', JSON.stringify(response.data))
    }

    return response.data
}


//admin login
const adminLogin = async (adminData)=>{
    const response = await axios.post(API_URL + 'adminlogin', adminData)

    if(response.data) {
        localStorage.setItem('user', JSON.stringify(response.data))
    }

    return response.data
}



//logout
const logout = ()=>{
    localStorage.removeItem('user')
}





//add firend
const addRemoveFriend = async (friendData,token)=>{
    const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
    const response = await axios.patch(API_URL+"addremovefriend",friendData,config)
    return response.data;
}



// get all users for admin 
const getAdminAllUsers = async ()=>{
    const response = await axios.get(API_URL+"allusers",{})
    return response.data;
}


// dlelete user for admin 
const adminDeleteUser = async (userId)=>{
    const response = await axios.delete(API_URL+"deleteUserAdmin/"+userId,{})
    return response.data;
}




//update User profile

const updateUserProfile = async(userData, token)=>{
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json', 
      },
    };
  
    const response = await axios.put(API_URL+"updateuser/",userData,config)
    return response.data;
  }
  



const authService = {
    register,
    logout,
    login,
    addRemoveFriend,
    adminLogin,
    getAdminAllUsers,
    adminDeleteUser,
    updateUserProfile
}

export default authService