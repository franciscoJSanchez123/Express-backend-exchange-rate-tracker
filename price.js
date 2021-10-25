const express=require('express');
const router=express.Router();

const PriceIntagram=require('./service')

router.get('/Instagram',async(req,res)=>{
    const result=await PriceIntagram()
    console.log(result)
    //res.send(`aqui price: ${result}`)
    res.json(result)
});

router.get('/twitter',(req,res)=>{

    
})

module.exports=router