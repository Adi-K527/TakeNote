import express from "express";
import { graphqlHTTP } from "express-graphql";
import cors from "cors";
import {schema} from "./GraphQL/schema"
import http from "http"
import { Server } from "socket.io";


const app = express()

const server = http.createServer(app)
const io = new Server(server, {
  cors: {
    origin: "*"
  }
})

app.use(cors())
app.use('/graphql', graphqlHTTP((req, res) => ({schema, context: { req, res }, graphiql: true})));

io.on("connection", (socket) => {
  console.log("User has connected")

  socket.on("message", (data) => {
    console.log("Recieved message: ", data)
    io.emit("message", data)
  })

  socket.on("disconnect", () => {
    console.log("User has disconnected")
  })
})

server.listen(5000, () => {console.log("Server is listening on port 5000")})



