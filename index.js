import express from "express";
import ejs from "ejs";
import fs from'fs';
import bodyParser from "body-parser";
import morgan from "morgan";

const data = JSON.parse(fs.readFileSync('./notes.json', 'utf8'));

const port=3000;
const app= express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

app.get("/",(req,res)=>{
    res.sendFile("index.html");
})

app.get("/home",(req,res)=>{
    res.render("home.ejs",{data:data});
})

app.get("/new",(req,res)=>{
    res.render("new.ejs");
})

app.post("/new",(req,res)=>{
    var dat=new Date().toLocaleDateString();
    data.push({title:req.body.title,subtitle:req.body.Subtitle,content:req.body.body,date:dat});
    fs.writeFileSync("./notes.json", JSON.stringify(data, null, 2), "utf-8");
    res.redirect("/home");
})


app.get("/del/:index",(req,res)=>{
    data.splice(req.params.index,1);
    fs.writeFileSync("./notes.json", JSON.stringify(data, null, 2), "utf-8");
    res.redirect("/home");
})
app.post("/save",(req,res)=>{
    data[req.body.index]={
        title:req.body.title,
        subtitle:req.body.subtitle,
        content:req.body.body,
        date:new Date().toLocaleDateString()
    };
    fs.writeFileSync("./notes.json", JSON.stringify(data, null, 2), "utf-8");
    res.redirect("/home");
})

app.post("/search",(req,res)=>{
    var k=req.body.k;
    var arr=[];
    for(var i=0;i<data.length;i++){
        for(var j=0;j<=data[i].title.length-k.length;j++){
            if(data[i].title.substring(j,j+k.length)==k){
                arr.push(i);
                break;
            }
        }
        for(var j=0;j<=data[i].subtitle.length-k.length;j++){
            if(data[i].subtitle.substring(j,j+k.length)==k){
                arr.push(i);
                break;
            }
        }
        for(var j=0;j<=data[i].content.length-k.length;j++){
            if(data[i].content.substring(j,j+k.length)==k){
                arr.push(i);
                break;
            }
        }
    }
    res.render("search.ejs",{data:data, arr:arr});
})

app.listen(port,()=>{
    console.log(`Server is running at ${port}`);
})


