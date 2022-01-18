const express = require("express")
const blogsRoute = require("./blogs")
const users = require('./auth')
const cors = require("cors")
const port = process.env.PORT || 8000;

const app = express()

app.use(express.json())
app.use("/api/v1/users", users)
app.use("/api/v1/blogs", blogsRoute)

app.use(cors())

app.listen(port, console.log("server started on port 8000"))