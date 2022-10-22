const exp = require("constants");
const { response } = require("express");
const express = require("express");
const https = require("https");

const app=express();
const port = 3000;
app.use(express.json());
app.use(express.urlencoded({extended:true}));


app.listen(port,()=>{
    console.log("Server is working on port: " + port);
});

app.get("/",(req,res) =>{
    res.sendFile(__dirname + "/index.html");
})

app.post("/",(req,res)=>{
    const id = Number(req.body.pokemon);
    const url = "https://pokeapi.co/api/v2/pokemon/" +id;

    https.get(url,(response) => {
        var responseData = "";

        response.on("data", (dataChunk)=>{
            responseData += dataChunk;
        });

        response.on("end", ()=>{
            var pokeInfo = JSON.parse(responseData);
            var pokemonName = pokeInfo.name;
            var pokeType = pokeInfo.types[0].type.name;
            var pokeImg = pokeInfo.sprites.other.dream_world.front_default;

            res.write("<h1>Name :" + pokemonName+"</h1>");
            res.write("<img src=" + pokeImg +">");
            res.write("<h3> Type: " + pokeType+"</h3>");
            
            res.send();
        });
    });

})