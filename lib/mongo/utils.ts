import toast from "react-hot-toast"
import { TUserLoginData, TUserRegisterData } from "../auth/zodSchemas"
import { getTranslations } from "next-intl/server"
//import { login } from "../auth/actions"





export const checkIfUserExists = async ({email}:{email: string}) => {  
    const res = await fetch(`/api/mongo/users?email=${email}`)    
    const data = await res.json()    
    if(data.status != 200)  return false;    
    if(!data.user) return false
    
    return true
}

export const registerUser = async (data: TUserRegisterData) => {
  const res =  await fetch(`/api/mongo/users`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-type": "application/json"
    }
  }) 
  const dataRes = await res.json()
  if(dataRes.status == 500) {
    const t = await getTranslations("zod")
    toast.error(t("userCreation.fail"))
  }     
} 

export const comparePassword = async (loginData: TUserLoginData) => {  
  const res =  await fetch(`/api/mongo/users/login`, {
    method: "POST",
    body: JSON.stringify(loginData),
    headers: {
      "Content-type": "application/json"
    }
  });  
  if(!res.ok)  return  false;
  
  const data = await res.json();  
  if(data.isMatch == false) return  false;
  //const {email,name} = data
  // await login({email, name})
  return  true;
}