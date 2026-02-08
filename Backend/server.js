const app = require("./src/app")
const connectToDB = require("./src/database/database")
require("dotenv").config()
connectToDB()

app.listen(3000,()=>[
    console.log("Server is runing at port 3000")
])