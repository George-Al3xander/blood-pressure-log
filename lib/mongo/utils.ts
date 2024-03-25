import toast from "react-hot-toast"
import { TReportData, TUserLoginData, TUserRegisterData } from "../auth/zodSchemas"
import { getTranslations } from "next-intl/server"
import { fetchMongoData } from "./actions"






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


export const createReport = async (data: TReportData) => {
  const res =  await fetch(`/api/mongo/reports`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-type": "application/json"
    }
  }) 
  const dataRes = await res.json()
  
  if(dataRes.status == 500) {    
    return {success: false}
  }   
  return {success: true}
}

export const comparePassword = async (loginData: TUserLoginData) => {   
  try {
    const res = await fetch(`/api/mongo/users/login`, {
      method: "POST",
      body: JSON.stringify(loginData),
      headers: {
        "Content-type": "application/json"
      }
    })

    if(!res.ok) throw new Error("Req error")

    const {isMatch} = await res.json();
    return isMatch
  } catch (error) {
      return  false;
  }   
}


