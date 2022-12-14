import {response, Router} from "express"
import { v4 as uuidv4 } from 'uuid';

const appRouter = Router()

interface UserProps{
  user:{
    id: number
    name: string
    email: string
    password: string
  },
  token: string
}

let users: UserProps[] = []


function checkAccountExist(email: string, password: string){
  const verifyUser = users.find(item => item.user.email === email)
  
  if(verifyUser){
    return verifyUser.user.password === password ? verifyUser : {message: "Email or password, incorrect!"}
  }

  return {message: "Email or password, incorrect!"}
} 

function checkEmailExist(email: string){
  const findEmail = users.find(item => item.user.email === email)
  return findEmail
}



appRouter.get("/", (request, response) => {
  return response.json(users)
})

appRouter.post("/signin", (request, response) => {
  const {email, password} = request.body

  const verifyUser = checkAccountExist(email, password)

  return response.json(verifyUser)
})

appRouter.post("/register", (request, response) => {
  const {email, name, password} = request.body

  const verifyEmailExist = checkEmailExist(email)

  if(verifyEmailExist){
    return response.json({message: "Email already exists!"})
  }

  const newUser = {
    user: {
      id: users.length ,
      name, 
      email,
      password,
    },
    token: uuidv4()
  }
  users.push(newUser)
  return response.json(newUser)

})

appRouter.post("/validate", (request, response) => {
    const {token} = request.body

    const validateToken = users.find(user => user.token === token)

    if(!validateToken){
      return response.json(false)
    }

    return response.json({
      ...validateToken.user
    })
})


appRouter.delete("/logout", (request, response) => {
  const {token} = request.body

  users = users.filter(item => item.token !== token)

  return response.json({message: "Logout success"})
})


export {appRouter}