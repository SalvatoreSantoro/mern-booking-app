import { RegisterFormData } from "./pages/Register";


const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const register = async (formData: RegisterFormData): Promise<void> => {
  const response = await fetch(`${API_BASE_URL}/api/users/register`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(formData),
  });

  const responseBody = await response.json();
  console.log(responseBody);
  if (!response.ok) {
    throw new Error(responseBody.msg);
  }
};


export const validateToken = async () => {
  const response = await fetch(`${API_BASE_URL}/api/auth/validate-token`, {
    credentials: "include"
  })

  if(!response.ok){
    throw new Error("Token invalid")
  }

  return response.json();
}