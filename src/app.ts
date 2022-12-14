import {Router} from "express"

const appRouter = Router()

const users = [
  {
   user: {
    id: 1,
    name: "William",
    email: "william@gmail.com",
    password: "12345"
   },
   token: "202060"
  },

]

function checkAccount(email: string, password: string){
  const verifyUserEmail = users.find(item => item.user.email === email)
  
  if(verifyUserEmail){
    return verifyUserEmail.user.password === password ? {message: true} : {message: "Email or password, incorrect!"}
  }

  return {message: "Email or password, incorrect!"}
} 


appRouter.get("/", (request, response) => {
  return response.json({message: "Hello World"})
})

appRouter.post("/signin", (request, response) => {
  const {email, password} = request.body

  const verifyUser = checkAccount(email, password)

  return response.json(verifyUser)

})


export {appRouter}