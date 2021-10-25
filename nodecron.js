const cron =require('node-cron');


cron.schedule('40 10 1-31 1-12 1-5 ',async()=>{
    const tasa=await PriceInstagram()
   
  },
  
  )