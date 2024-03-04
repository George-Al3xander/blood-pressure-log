import { connectToDatabase, disconnectFromDatabase } from "."





export const checkIfUserExists = async (email: string) => {  
    const res = await fetch(`/api/mongo/users?email=${email}`)    
    const data = await res.json()    
    if(data.status != 200)  return false   
    if(data.user) return false
    
    return true
  }