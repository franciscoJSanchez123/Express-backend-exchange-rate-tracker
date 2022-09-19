const fetch= require('node-fetch');


const PriceInstagram=async (is9AM,is1PM)=>{
    const myInstaId='myInstaId'
    const token='tokend'
    const res=await fetch(`https://graph.facebook.com/v12.0/${myInstaId}?fields=business_discovery.username(enparalelovzla){profile_picture_url,followers_count,media_count,media{caption}}&access_token=${token}`)
    const data=await res.json();
    const publicacion=data.business_discovery.media.data
    let index=0;
    let hora;
    is9AM? hora='9:00 AM': '';
    is1PM? hora='1:00 PM': '';
    const  f = new Date();
    const d=f.getDate();
    const m=f.getMonth()+1;
    const a=f.getFullYear();
    let fecha=`${d}/${m}/${a}`
    publicacion.map(async (elemento,i)=>{
        const cadena=`${elemento.caption}` 
        
        if(cadena.includes('Actualización:') && cadena.includes(`${fecha}`) && cadena.includes(`${hora}`) && cadena.includes('#promediodeldolar')){
            index=i
        }
       
    })

    const inicio=publicacion[index].caption.indexOf("_")
    const final= publicacion[index].caption.indexOf("_",inicio+1)
    const estracto=publicacion[index].caption.substring(inicio,final+1)
    let variacion
    if(estracto.includes("🔺")){
        variacion="🔺"
    }else if(estracto.includes("🔻")){
        variacion="🔻"
    }else if(estracto.includes("=")){
        variacion="="
    }
    const inicio2=estracto.indexOf("💵")
    const final2=estracto.indexOf(`${variacion}`)  //🔻  🔺  =
    const tasa2=estracto.substring(inicio2,final2)
    const separar=tasa2.split(" ")
    let bolivar=''
    separar.map(elemento=>{
        if(!(elemento==='Bs.')&& !(elemento==='💵') && elemento.length>2){
            bolivar=elemento
        }
        
    })
  
    const tasa=parseFloat(bolivar.replace(',',"."));
    const respuesta = {tasa,fecha,hora}
    return respuesta
}

module.exports=PriceInstagram; 