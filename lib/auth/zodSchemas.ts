import {z} from "zod"
import User from "../mongo/schemas/user"
import {  connectToDatabase, disconnectFromDatabase } from "../mongo"
// import bcrypt from "bcrypt"
 import bcrypt from "bcryptjs"


export const UserRegisterSchema = z.object({
    name_first: z.string().min(3,"First name must be at least 3 characters at length").max(256,"First name can't be longer than  256 characters"), 
    name_last: z.string().min(3,"Last name must be at least 3 characters at length").max(256,"Last name can't be longer than  256 characters"),
    email: z.string().email("Enter a valid email")
            .min(3,"This field has to be filled."),
    password: z.string()
              .min(8,"Password must be at least 8 characters  in length")
              .max(15, "can't be longer than  15 characters")
              .refine((password) => /[a-z]/.test(password), {
                message: 'Password must contain at least one lowercase letter.',
                
              })
              .refine((password) => /[A-Z]/.test(password), {
                message: 'Password must contain at least one uppercase letter.',
                
              })
              .refine((password) => /\d/.test(password), {
                message: 'Password must contain at least one numeric digit.',
                
              })
              .refine((password) => /[!@_#$%^&*(),.?":{}|<>]/.test(password), {
                message: 'Password must contain at least one special character.',
                
              }),
    confirmPassword: z.string()
                    .min(8,"Password must be at least 8 characters  in length")
                    .max(15, "can't be longer than  15 characters")
})
.refine((data) => data.password === data.confirmPassword, 
{
  message: "Confirm password and password are not equal", 
  path: ["confirmPassword"]
})


export const UserLoginSchema = z.object({  
    email: z.string().email("Enter a valid email").min(3,"This field has to be filled.")
  //   .refine(async(email) => {                
  //     await connectToDatabase()
  //     const dbEmail = await User.findOne({email})
  //     await disconnectFromDatabase()
  //     if(!dbEmail) return false
  //     return true
  // }, {message: "Invalid Email or Password", path: ["email", "password"]})
  ,
    password: z.string()
              .min(8,"Password must be at least 8 characters  in length")
              .max(15, "can't be longer than  15 characters")              
                  
})
.refine(async ({password,email}) => {
  await connectToDatabase()
  const dbUser = await User.findOne({email})
  if(!dbUser) return false
  await disconnectFromDatabase()
  const dbPassword = dbUser.password;
  let valid = true
  // await bcrypt.compare(password, dbPassword, function(err, isMatch) {
  //   if(err) {
  //     valid = false    
  //   } else {
  //     valid = isMatch
  //   }    
  // })
  return valid
}, {message: "Invalid Email or Password", path: ["email", "password"]})


export type TUserLoginData = z.infer<typeof UserLoginSchema>
export type TUserRegisterData = z.infer<typeof UserRegisterSchema>
export type TUserLoginSchema = z.TypeOf<typeof UserLoginSchema>
export type TUserRegisterSchema = z.TypeOf<typeof UserRegisterSchema>