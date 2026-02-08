const express = require("express")
const app = express()
const noteModules = require("./module/notes.module")
const cors = require("cors")


app.use(express.json())
app.use(cors())
app.use(express.static("./public"))

app.post("/notes",async(req,res)=>{
    
    const {title , description} = req.body

    let note = await noteModules.create({
        title , description
    })

    res.status(201).json({
        message: "Note created successfully",
        note
    })
})

app.get("/notes", async(req,res)=>{

    const notes = await noteModules.find()
    
    res.status(200).json({
        message: "Notes fetched successfully",
        notes
    })
})

app.delete("/notes/:id",async(req,res)=>{

    const id = req.params.id
    await noteModules.findByIdAndDelete(id)

    res.status(200).json({
        message:"note deleted successfully",
        id
    })
})

app.patch("/notes/:id",async(req,res)=>{

    const id = req.params.id
    const {description} = req.body

    await noteModules.findByIdAndUpdate(id, {description} )

    res.status(200).json({
        message: description,
    })
})

console.log(__dirname)

app.use("*name",(req,res)=>{
    res.sendFile(path.join(__dirname,"..","/public/index.html"))
})

module.exports = app