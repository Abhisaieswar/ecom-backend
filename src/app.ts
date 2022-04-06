import {createConnection,getManager} from "typeorm";
import { Request,Response } from "express";
import { Productsdetails } from "./Entity/Productsdetails";
import {Cart} from './Entity/Cart';
import { User } from "./Entity/User";
import { Orders } from "./Entity/Orders";
import * as cors from 'cors'
import {v4 as uuid, v4} from 'uuid'

const jwt=require('jsonwebtoken')


const express = require("express")
const app = express()
app.use(express.json())


//module.exports = 
//"entities": [`${__dirname}/src/Entity/*.js`],

app.use(cors())
app.options('*', cors())



const initializeServerAndGetConnection=async()=>{
    try{
        const connection= await createConnection({
            "type": "postgres",
            "host": "localhost",
            "port": 5432,
            "username": "postgres",
            "password": "postgres",
            "database": "postgres",
            "entities": [Productsdetails,Cart,Orders,User],
            "logging": true,
            "synchronize": true
        })
        
        //const data=await entityManager.findOne(productsdetails,1)

    }
    catch(err){
        console.log(err)
    }
}



initializeServerAndGetConnection()

app.listen(3001,()=>{
    console.log("Server running on port 3001")
})

const entityManager=getManager()

let jwt_token;

app.get("/getusername",async(req:Request,res:Response)=>{       //gets all products from db
    try{
        res.setHeader("Access-Control-Allow-Origin", "*")
        res.setHeader("Access-Control-Allow-Credentials", "true");
        res.setHeader("Access-Control-Max-Age", "1800");
        res.setHeader("Access-Control-Allow-Headers", "content-type");
        res.setHeader( "Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, PATCH, OPTIONS" ); 
        
        const authHeader=req.headers["authorization"]
        if(authHeader!==undefined)
        {
            jwt_token=authHeader.split(" ")[1]
        }
        console.log(jwt_token)
        if(jwt_token===undefined)
        {
            res.status(401)
            res.send([{"send":"Invalid access token"}]);
        }

        else 
        {
            jwt.verify(jwt_token,"secret",async(error,payload)=>{
                console.log(payload)
                if(error)
                {
                    res.status(400)
                    res.send([{"msg":"Invalid access token"}]);
                }
                else 
                {
                    res.send({uname:payload.username});
                }
            })
        }
    }

    catch(err){
        console.log(err,"**************************************")
    }
})

app.get("/",async(req:Request,res:Response)=>{       //gets all products from db
    try{
        res.setHeader("Access-Control-Allow-Origin", "*")
        res.setHeader("Access-Control-Allow-Credentials", "true");
        res.setHeader("Access-Control-Max-Age", "1800");
        res.setHeader("Access-Control-Allow-Headers", "content-type");
        res.setHeader( "Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, PATCH, OPTIONS" ); 
        
        const authHeader=req.headers["authorization"]
        if(authHeader!==undefined)
        {
            jwt_token=authHeader.split(" ")[1]
        }
        console.log(jwt_token,"aaaaaaaaaaaaabbbbbbbbbbbcccccccccccc")
        if(jwt_token===undefined)
        {
            res.status(401)
            res.send([{"send":"Invalid access token"}]);
        }

        else 
        {
            jwt.verify(jwt_token,"secret",async(error,payload)=>{
                console.log(payload,"******************************************")
                if(error)
                {
                    res.status(400)
                    res.send([{"msg":"Invalid access token"}]);
                }
                else 
                {
                    const data=await entityManager.find(Productsdetails,{order:{id:"DESC"}})
                    res.send(JSON.stringify(data));
                }
            })
        }
    }

    catch(err){
        console.log(err,"**************************************")
    }
})

app.get("/getcart/",async (req:Request,res:Response)=>{
    try{
        res.setHeader("Access-Control-Allow-Origin", "*")
        res.setHeader("Access-Control-Allow-Credentials", "true");
        res.setHeader("Access-Control-Max-Age", "1800");
        res.setHeader("Access-Control-Allow-Headers", "content-type");
        res.setHeader( "Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, PATCH, OPTIONS" ); 
        
        let jwt_token;
        const authHeader=req.headers["authorization"]
        if(authHeader!==undefined)
        {
            jwt_token=authHeader.split(" ")[1]
        }
        if(jwt_token===undefined)
        {
            res.status(401)
            res.send([{"msg":"Invalid access token"}]);
        }
        else 
        {
            jwt.verify(jwt_token,"secret",async(error,payload)=>{
                if(error)
                {
                    res.status(400)
                    res.send([{"msg":"Invalid access token"}]);
                }
                else 
                {
                    const data=await entityManager.find(Cart,{where:{user:payload.userid}})
                    console.log(data)
                    res.send(data)
                    //const data=await entityManager.find(Productsdetails,{order:{id:"DESC"}})
                    //res.send(data);
                }
            })
        }

        
    }
    catch(err)
    {
        console.log(err.message)
    }
})

app.get("/getorders/",async (req:Request,res:Response)=>{
    try{
        res.setHeader("Access-Control-Allow-Origin", "*")
        res.setHeader("Access-Control-Allow-Credentials", "true");
        res.setHeader("Access-Control-Max-Age", "1800");
        res.setHeader("Access-Control-Allow-Headers", "content-type");
        res.setHeader( "Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, PATCH, OPTIONS" ); 
        
        let jwt_token;
        const authHeader=req.headers["authorization"]
        if(authHeader!==undefined)
        {
            jwt_token=authHeader.split(" ")[1]
        }
        if(jwt_token===undefined)
        {
            res.status(401)
            res.send("Invalid access token");
        }
        else 
        {
            jwt.verify(jwt_token,"secret",async(error,payload)=>{
                if(error)
                {
                    res.send("Invalid access token");
                }
                else 
                {
                    const data=await entityManager.find(Orders,{where:{user:payload.userid}})
                    res.send(data)
                }
            })
        }
    }
    catch(err)
    {
        console.log(err.message)
    }
})

app.get("/getorder/:id",async (req:Request,res:Response)=>{
    try{
        res.setHeader("Access-Control-Allow-Origin", "*")
        res.setHeader("Access-Control-Allow-Credentials", "true");
        res.setHeader("Access-Control-Max-Age", "1800");
        res.setHeader("Access-Control-Allow-Headers", "content-type");
        res.setHeader( "Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, PATCH, OPTIONS" ); 
        
        let jwt_token;
        const authHeader=req.headers["authorization"]
        if(authHeader!==undefined)
        {
            jwt_token=authHeader.split(" ")[1]
        }
        if(jwt_token===undefined)
        {
            res.status(401)
            res.send("Invalid access token");
        }
        else 
        {
            jwt.verify(jwt_token,"secret",async(error,payload)=>{
                if(error)
                {
                    res.send("Invalid access token");
                }
                else 
                {
                    const id=req.params
                    const data=await entityManager.find(Orders,id)
                    res.send(data)
                }
            })
        }
        
    }
    catch(err)
    {
        console.log(err.message)
    }
})


app.get("/getuser",async (req:Request,res:Response)=>{
    try{
        res.setHeader("Access-Control-Allow-Origin", "*")
        res.setHeader("Access-Control-Allow-Credentials", "true");
        res.setHeader("Access-Control-Max-Age", "1800");
        res.setHeader("Access-Control-Allow-Headers", "content-type");
        res.setHeader( "Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, PATCH, OPTIONS" ); 
        
        let jwt_token;
        const authHeader=req.headers["authorization"]
        if(authHeader!==undefined)
        {
            jwt_token=authHeader.split(" ")[1]
        }
        if(jwt_token===undefined)
        {
            res.status(401)
            res.send("Invalid access token");
        }
        else 
        {
            jwt.verify(jwt_token,"secret",async(error,payload)=>{
                if(error)
                {
                    res.send("Invalid access token");
                }
                else 
                {
                    const data=await entityManager.find(User)
                    res.send(data)
                }
            })
        }
    }

    catch(err)
    {
        console.log(err.message)
    }
}
)

app.post("/login/",async(req:Request,res:Response)=>{
    try{
        res.setHeader("Access-Control-Allow-Origin", "*")
        res.setHeader("Access-Control-Allow-Credentials", "true");
        res.setHeader("Access-Control-Max-Age", "1800");
        res.setHeader("Access-Control-Allow-Headers", "content-type");
        res.setHeader( "Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, PATCH, OPTIONS" ); 

        let {username,password}=req.body;
        
        const user=await entityManager.find(User,{where:{username,password}})
        console.log(user)
        if(user.length===0)
        {
            res.status(400)
            res.send({not:"User Not Found"})
        }
        else
        {
            const payload={
                username:username,
                userid:user[0].id
            }
            console.log(payload,".............................////////////////////...................")

            const jwt_token=jwt.sign(payload,"secret")

            res.send({jwt_token})       //should send an object as response
        }
    }

    catch(err){
        console.log(err.message)
    }
})

app.post("/products/",async(req:Request,res:Response)=>{
    try{
        res.setHeader("Access-Control-Allow-Origin", "*")
        res.setHeader("Access-Control-Allow-Credentials", "true");
        res.setHeader("Access-Control-Max-Age", "1800");
        res.setHeader("Access-Control-Allow-Headers", "content-type");
        res.setHeader( "Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, PATCH, OPTIONS" ); 
        
        let jwt_token;
        const authHeader=req.headers["authorization"]
        if(authHeader!==undefined)
        {
            jwt_token=authHeader.split(" ")[1]
        }
        if(jwt_token===undefined)
        {
            res.status(401)
            res.send("Invalid access token");
        }
        else 
        {
            jwt.verify(jwt_token,"secret",async(error,payload)=>{
                if(error)
                {
                    res.send("Invalid access token");
                }
                else 
                {
                    let {brand,imageurl,price,rating,title,quantity}=req.body;
                    await entityManager.insert(Productsdetails,{brand,price,title,quantity,imageurl,rating})
                    res.send("Product added successfully")
                }
            })
        }
    }

    catch(err){
        console.log(err.message)
    }
})

app.post("/cart/",async (req:Request,res:Response)=>{
    try{
        res.setHeader("Access-Control-Allow-Origin", "*")
        res.setHeader("Access-Control-Allow-Credentials", "true");
        res.setHeader("Access-Control-Max-Age", "1800");
        res.setHeader("Access-Control-Allow-Headers", "content-type");
        res.setHeader( "Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, PATCH, OPTIONS" ); 
        
        let jwt_token;
        const authHeader=req.headers["authorization"]
        if(authHeader!==undefined)
        {
            jwt_token=authHeader.split(" ")[1]
        }
        if(jwt_token===undefined)
        {
            res.status(401)
            res.send("Invalid access token");
        }
        else 
        {
            jwt.verify(jwt_token,"secret",async(error,payload)=>{
                if(error)
                {
                    res.send("Invalid access token");
                }
                else 
                {
                    let {id,brand,imageurl,price,rating,title,quantity,cartquantity}=req.body;
                    await entityManager.insert(Cart,{id,brand,price,title,quantity,imageurl,rating,cartquantity,uniquecart:v4(),user:payload.userid})
                    res.send("success");
                }
            })
        }
    }

    catch(err){
        console.log(err.message)
    }
}) 

app.post("/ordersdata/",async (req:Request,res:Response)=>{
    try{
        res.setHeader("Access-Control-Allow-Origin", "*")
        res.setHeader("Access-Control-Allow-Credentials", "true");
        res.setHeader("Access-Control-Max-Age", "1800");
        res.setHeader("Access-Control-Allow-Headers", "content-type");
        res.setHeader( "Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, PATCH, OPTIONS" ); 
        
        let jwt_token;
        const authHeader=req.headers["authorization"]
        if(authHeader!==undefined)
        {
            jwt_token=authHeader.split(" ")[1]
        }
        if(jwt_token===undefined)
        {
            res.status(401)
            res.send("Invalid access token");
        }
        else 
        {
            jwt.verify(jwt_token,"secret",async(error,payload)=>{
                if(error)
                {
                    res.send("Invalid access token");
                }
                else 
                {
                    let {id,brand,imageurl,price,rating,title,quantity,cartquantity,ordereddate,totalamt}=req.body;
                    console.log(req.body.ordereddate)
                    await entityManager.insert(Orders,{id,brand,price,title,quantity,imageurl,rating,cartquantity,ordereddate,totalamt,status:"Order placed",user:payload.userid,uniqueorder:v4()})
                    res.status(200)
                    res.send("success") 
                }
            })
        }
    }

    catch(err){
        console.log(err.message)
        return err
    }
})

app.post("/adduser/",async (req:Request,res:Response)=>{
    try{
        res.setHeader("Access-Control-Allow-Origin", "*")
        res.setHeader("Access-Control-Allow-Credentials", "true");
        res.setHeader("Access-Control-Max-Age", "1800");
        res.setHeader("Access-Control-Allow-Headers", "content-type");
        res.setHeader( "Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, PATCH, OPTIONS" ); 
        
        let jwt_token;
        const authHeader=req.headers["authorization"]
        if(authHeader!==undefined)
        {
            jwt_token=authHeader.split(" ")[1]
        }
        if(jwt_token===undefined)
        {
            res.status(401)
            res.send("Invalid access token");
        }
        else 
        {
            jwt.verify(jwt_token,"secret",async(error,payload)=>{
                if(error)
                {
                    res.send("Invalid access token");
                }
                else 
                {
                    let {name,address,phone}=req.body;
                    await entityManager.update(User,payload.userid,{name,address,phone})
                    res.status(200)
                    res.send("success") 
                }
            })
        }
    }

    catch(err){
        console.log(err.message)
        return err
    }
})


app.put("/products/:id",async(req:Request,res:Response)=>{
    try{
        res.setHeader("Access-Control-Allow-Origin", "*")
        res.setHeader("Access-Control-Allow-Credentials", "true");
        res.setHeader("Access-Control-Max-Age", "1800");
        res.setHeader("Access-Control-Allow-Headers", "content-type");
        res.setHeader( "Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, PATCH, OPTIONS" ); 

        let jwt_token;
        const authHeader=req.headers["authorization"]
        if(authHeader!==undefined)
        {
            jwt_token=authHeader.split(" ")[1]
        }
        if(jwt_token===undefined)
        {
            res.status(401)
            res.send("Invalid access token");
        }
        else 
        {
            jwt.verify(jwt_token,"secret",async(error,payload)=>{
                if(error)
                {
                    res.send("Invalid access token");
                }
                else 
                {
                    let {id}=req.params
                    let {brand,imageurl,price,rating,title,quantity}=req.body;
                    console.log(req.body)
                    if(brand!=""){
                        await entityManager.update(Productsdetails,id,{brand})
                    }
                    if(imageurl!=""){
                        await entityManager.update(Productsdetails,id,{imageurl})
                    }
                    if(price!=null){
                        await entityManager.update(Productsdetails,id,{price})
                    }

                    if(rating!=null){
                        await entityManager.update(Productsdetails,id,{rating})
                    }

                    if(title!=""){
                        await entityManager.update(Productsdetails,id,{title})
                    }
                    if(quantity!=""){
                        await entityManager.update(Productsdetails,id,{quantity})
                    }
                    res.send("Product updated successfully")
                }
            })
        }
    }
    catch(err){
        console.log(err.message)
    }
}) 


app.put("/updateitem/:title",async(req:Request,res:Response)=>{
    try{
        res.setHeader("Access-Control-Allow-Origin", "*")
        res.setHeader("Access-Control-Allow-Credentials", "true");
        res.setHeader("Access-Control-Max-Age", "1800");
        res.setHeader("Access-Control-Allow-Headers", "content-type");
        res.setHeader( "Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, PATCH, OPTIONS" ); 
        
        let jwt_token;
        const authHeader=req.headers["authorization"]
        if(authHeader!==undefined)
        {
            jwt_token=authHeader.split(" ")[1]
        }
        if(jwt_token===undefined)
        {
            res.status(401)
            res.send("Invalid access token");
        }
        else 
        {
            jwt.verify(jwt_token,"secret",async(error,payload)=>{
                if(error)
                {
                    res.send("Invalid access token");
                }
                else 
                {
                    const title=req.params;
                    const {qty}=req.body
                    await entityManager.update(Productsdetails,title,{quantity:qty})
                    res.send("success")
                }
            })
        }
    }
    catch(err)
    {
        console.log(err.message)
    }
})

app.put("/updatecart/:id",async(req:Request,res:Response)=>{
    try{
        res.setHeader("Access-Control-Allow-Origin", "*")
        res.setHeader("Access-Control-Allow-Credentials", "true");
        res.setHeader("Access-Control-Max-Age", "1800");
        res.setHeader("Access-Control-Allow-Headers", "content-type");
        res.setHeader( "Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, PATCH, OPTIONS" ); 
        
        let jwt_token;
        const authHeader=req.headers["authorization"]
        if(authHeader!==undefined)
        {
            jwt_token=authHeader.split(" ")[1]
        }
        if(jwt_token===undefined)
        {
            res.status(401)
            res.send("Invalid access token");
        }
        else 
        {
            jwt.verify(jwt_token,"secret",async(error,payload)=>{
                if(error)
                {
                    res.send("Invalid access token");
                }
                else 
                {
                    const id=req.params;
                    const {qty}=req.body
                    await entityManager.update(Cart,id,{cartquantity:qty})
                    res.send("success");
                }
            })
        }
    }
    catch(err){
        console.log(err.message)
    }
})

app.put("/updatestatus/:id",async(req:Request,res:Response)=>{
    try{
        res.setHeader("Access-Control-Allow-Origin", "*")
        res.setHeader("Access-Control-Allow-Credentials", "true");
        res.setHeader("Access-Control-Max-Age", "1800");
        res.setHeader("Access-Control-Allow-Headers", "content-type");
        res.setHeader( "Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, PATCH, OPTIONS" ); 
        
        let jwt_token;
        const authHeader=req.headers["authorization"]
        if(authHeader!==undefined)
        {
            jwt_token=authHeader.split(" ")[1]
        }
        if(jwt_token===undefined)
        {
            res.status(401)
            res.send("Invalid access token");
        }
        else 
        {
            jwt.verify(jwt_token,"secret",async(error,payload)=>{
                if(error)
                {
                    res.send("Invalid access token");
                }
                else 
                {
                    const id=req.params;
                    const {st}=req.body
                    
                    await entityManager.update(Orders,id,{status:st})
                    res.send("success");
                }
            })
        }
    }
    catch(err){
        console.log(err.message)
    }
})

app.put("/updateuser/:id",async(req:Request,res:Response)=>{
    try {
        res.setHeader("Access-Control-Allow-Origin", "*")
        res.setHeader("Access-Control-Allow-Credentials", "true");
        res.setHeader("Access-Control-Max-Age", "1800");
        res.setHeader("Access-Control-Allow-Headers", "content-type");
        res.setHeader( "Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, PATCH, OPTIONS" ); 
        
        let jwt_token;
        const authHeader=req.headers["authorization"]
        if(authHeader!==undefined)
        {
            jwt_token=authHeader.split(" ")[1]
        }
        if(jwt_token===undefined)
        {
            res.status(401)
            res.send("Invalid access token");
        }
        else 
        {
            jwt.verify(jwt_token,"secret",async(error,payload)=>{
                if(error)
                {
                    res.send("Invalid access token");
                }
                else 
                {
                    const {name,address,phone,id}=req.body;
                    await entityManager.update(User,id,{name,address,phone})   
                }
            })
        }
    }
    catch(err){
        console.log(err.message)
    }
})

app.delete("/deletecartitem/:id",async(req:Request,res:Response)=>{
    try{
        res.setHeader("Access-Control-Allow-Origin", "*")
        res.setHeader("Access-Control-Allow-Credentials", "true");
        res.setHeader("Access-Control-Max-Age", "1800");
        res.setHeader("Access-Control-Allow-Headers", "content-type");
        res.setHeader( "Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, PATCH, OPTIONS" ); 
        
        let jwt_token;
        const authHeader=req.headers["authorization"]
        if(authHeader!==undefined)
        {
            jwt_token=authHeader.split(" ")[1]
        }
        if(jwt_token===undefined)
        {
            res.status(401)
            res.send("Invalid access token");
        }
        else 
        {
            jwt.verify(jwt_token,"secret",async(error,payload)=>{
                if(error)
                {
                    res.send("Invalid access token");
                }
                else 
                {
                    const id=req.params;
                    await entityManager.delete(Cart,id)
                    res.send("success");
                }
            })
        }
    }
    catch(err){
        console.log(err.message)
    }
})

app.delete("/deletecart/",async(req:Request,res:Response)=>{
    try{
        res.setHeader("Access-Control-Allow-Origin", "*")
        res.setHeader("Access-Control-Allow-Credentials", "true");
        res.setHeader("Access-Control-Max-Age", "1800");
        res.setHeader("Access-Control-Allow-Headers", "content-type");
        res.setHeader( "Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, PATCH, OPTIONS" ); 
        
        let jwt_token;
        const authHeader=req.headers["authorization"]
        if(authHeader!==undefined)
        {
            jwt_token=authHeader.split(" ")[1]
        }
        if(jwt_token===undefined)
        {
            res.status(401)
            res.send("Invalid access token");
        }
        else 
        {
            jwt.verify(jwt_token,"secret",async(error,payload)=>{
                if(error)
                {
                    res.send("Invalid access token");
                }
                else 
                {
                    await entityManager.clear(Cart)
                    res.send("success")
                }
            })
        }
    }
    catch(err){
        console.log(err.message)
    }
})

app.delete("/products/:id",async(req:Request,res:Response)=>{
    try{
        res.setHeader("Access-Control-Allow-Origin", "*")
        res.setHeader("Access-Control-Allow-Credentials", "true");
        res.setHeader("Access-Control-Max-Age", "1800");
        res.setHeader("Access-Control-Allow-Headers", "content-type");
        res.setHeader( "Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, PATCH, OPTIONS" ); 
        
        let jwt_token;
        const authHeader=req.headers["authorization"]
        if(authHeader!==undefined)
        {
            jwt_token=authHeader.split(" ")[1]
        }
        if(jwt_token===undefined)
        {
            res.status(401)
            res.send("Invalid access token");
        }
        else 
        {
            jwt.verify(jwt_token,"secret",async(error,payload)=>{
                if(error)
                {
                    res.send("Invalid access token");
                }
                else 
                {
                    let {id}=req.params
                    await entityManager.delete(Productsdetails,id)
                    res.send("Product deleted successfully")
                }
            })
        }
    }
    catch(err){
        console.log(err.message)
    }
}) 

