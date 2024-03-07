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


//logout
const logout = ()=>{
    localStorage.removeItem('user')
}





//add firend
const addFriend = async (friendData,token)=>{
    const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
    const response = await axios.patch(API_URL+"addfriend",friendData,config)
    return response.data;
}



const authService = {
    register,
    logout,
    login,
    addFriend,
}

export default authService