import api from "../lib/axios";
import type { LoginUserFormData, RegisterUserFormData } from "../schemas/auth.schema";

export const registerUser = async (data: RegisterUserFormData) => {
    const formData = new FormData();

    formData.append("username", data.username);
    formData.append("email", data.email);
    formData.append("password", data.password);

    if (data.profileImage && data.profileImage.length > 0) {
        formData.append("profileImage", data.profileImage[0]);
    }

    const response = await api.post("/auth/signup", formData);

    console.log("Register DATA: ", response.data);

    const token = response.data.data.accessToken;
    console.log("Token being stored:", token);

    localStorage.setItem("token", response.data.data.accessToken);

    return response.data;
};


export const loginUser = async(data: LoginUserFormData) => {
    const formData = new FormData();
    console.log(data);
    console.log(typeof data.identifier);

    if(data.identifier.includes('@')) {
        console.log("it is an email");
        formData.append("email", data.identifier);
    }else{
        console.log("it is a username");
        formData.append("username", data.identifier)
    }
    formData.append("password", data.password);

    console.log("FORMDATA :", formData);
    

    const response = await api.post('/auth/login', formData, {
        headers: {
             "Content-Type": "application/json",
        }
    })
    console.log("Login response:", response.data);
    localStorage.setItem("token", response.data.data.accessToken);
    return response.data;
}

export const getCurrentUser = async () => {
  const response = await api.get("/auth/getCurrentUser");
  return response.data;
};

export const logoutUser = async() => {
    const response = await api.get('/auth/logout');
    return response.data;
}