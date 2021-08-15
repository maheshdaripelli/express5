const express = require("express")
const app = express()
app.use(express.json())
const path = require("path")
const sqlite3 = require("sqlite3")
const {open} = require("sqlite")
const pathFile = path.join(__dirname,"cricketMatchDetails.db")
let db = null
const connectingDatabase = async()=>{
    try{
        db = await open({
        filename:pathFile,
        driver:sqlite3.Database
        })
        app.listen(3000,()=>{
            console.log("this server is connected to http://localhost:3000")
        })
    }catch(e){
        console.log(e.message)
        process.exit(1)
    }   
    
}
connectingDatabase()
const convertingPlayerData = (data)=>{
    return{
        playerId:data.player_id,
        playerName:data.player_name
    }    
}
app.get("/",(request,response)=>{
    response.send("mahesh")    
})
app.get("/players/",async(request,response)=>{
    try{
        const query = `select * from player`
        const result = await db.all(query)
        response.send("mahi")    
        response.send(result.map((each)=>
        convertingPlayerData(each)))
    }catch(e){
        console.log(e.message)
    }
})