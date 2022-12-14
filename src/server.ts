import express from "express"
import cors from "cors"
import { appRouter } from "./app"

const app = express()

app.use(cors())
app.use(express.json())

app.use("/api", appRouter)

app.listen(3333, () => {
  console.log("Server is running!")
})