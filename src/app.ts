import {createConnection, Connection,getConnection,getManager, EntityManager} from "typeorm";
import { Request,response,Response } from "express";
import { Productsdetails } from "./Entity/Productsdetails";
import {Cart} from './Entity/Cart';
import { User } from "./Entity/User";
import { Orders } from "./Entity/Orders";
import * as cors from 'cors'

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

app.get("/",async(req:Request,res:Response)=>{       //gets all products from db
    try{

        res.setHeader("Access-Control-Allow-Origin", "*")
        res.setHeader("Access-Control-Allow-Credentials", "true");
        res.setHeader("Access-Control-Max-Age", "1800");
        res.setHeader("Access-Control-Allow-Headers", "content-type");
        res.setHeader( "Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, PATCH, OPTIONS" ); 
             
        //await entityManager.clear(Productsdetails)

        // await entityManager.insert(Productsdetails,{brand: "Fossil",
        // imageurl: "https://assets.ccbp.in/frontend/react-js/ecommerce/electronics-simple-watch.png"
        // ,price: 10995,
        // rating: 4.1,
        // title: "Neutra Analog Men's Watch",quantity:23})


        const data=await entityManager.find(Productsdetails)
        res.send(data);
    }

    catch(err){
        console.log(err)
    }
})

app.get("/getcart/",async (req:Request,res:Response)=>{
    try{
        res.setHeader("Access-Control-Allow-Origin", "*")
        res.setHeader("Access-Control-Allow-Credentials", "true");
        res.setHeader("Access-Control-Max-Age", "1800");
        res.setHeader("Access-Control-Allow-Headers", "content-type");
        res.setHeader( "Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, PATCH, OPTIONS" ); 
        
        const data=await entityManager.find(Cart)
        console.log(data,"////////////////////////////////////////////")
        res.send(data)
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
        
        const data=await entityManager.find(Orders)
        
        res.send(data)
    }
    catch(err)
    {
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
        
        let {brand,imageurl,price,rating,title,quantity}=req.body;
        console.log(req.body,"///////////////////////////////")
        //insert data into db
        await entityManager.insert(Productsdetails,{brand,price,title,quantity,imageurl,rating})
        res.send("Product added successfully")
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
        
        let {id,brand,imageurl,price,rating,title,quantity,cartquantity}=req.body;
        await entityManager.insert(Cart,{id,brand,price,title,quantity,imageurl,rating,cartquantity})
        res.send("success");
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
        
        let {id,brand,imageurl,price,rating,title,quantity,cartquantity,ordereddate,totalamt}=req.body;
        console.log("//////////////////",req.body,"////////////////////")
        await entityManager.insert(Orders,{id,brand,price,title,quantity,imageurl,rating,cartquantity,ordereddate,totalamt,status:"ordered"})
        res.status(200)
        res.send("success") 
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
        
        let {name,address,phone}=req.body;
        console.log("//////////////////",req.body,"////////////////////")
        await entityManager.clear(User)
        await entityManager.insert(User,{name,address,phone})
        res.status(200)
        res.send("success") 
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


        let {id}=req.params
        let {brand,imageurl,price,rating,title,quantity}=req.body;
        console.log("**********************************",req.body,"***************************")
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
        
        const title=req.params;
        const {qty}=req.body
        console.log(req.body)
        await entityManager.update(Productsdetails,title,{quantity:qty})
        res.send("success")
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
        
        const id=req.params;
        const {qty}=req.body
        
        await entityManager.update(Cart,id,{cartquantity:qty})
        res.send("success");
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
        
        const id=req.params;
        await entityManager.delete(Cart,id)
        res.send("success");
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
        
        await entityManager.clear(Cart)
        res.send("success")
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
        

        let {id}=req.params
        await entityManager.delete(Productsdetails,id)
        res.send("Product deleted successfully")
    }
    catch(err){
        console.log(err.message)
    }
}) 