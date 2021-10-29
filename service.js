const fetch= require('node-fetch');


const PriceInstagram=async (is9AM,is1PM)=>{
    const myInstaId='17841450044621705'
    const token='EAAMEED5d75YBAMVXIxZAbMqqCPbxT0t0hlbpEwG6ds3fOaCqshrkTJcQiqcrBG3rhaH9GLSjsVLlZCIocWZBl1HlrWjuo3gE5RDGcsrkzue8bka8an5MFBRRZBd4gGNL5l274wStsbOGd9UQxm3pMdD9BkKHFr8Js2ZBzAtAPZC39dVnyx32trgRKNQqjew0oZD'
    const res=await fetch(`https://graph.facebook.com/v12.0/${myInstaId}?fields=business_discovery.username(enparalelovzla){profile_picture_url,followers_count,media_count,media{caption}}&access_token=${token}`)
    const data=await res.json();
    const publicacion=data.business_discovery.media.data
    let index=0
    publicacion.map(async (elemento,i)=>{
        const cadena=`${elemento.caption}` 
        const fecha = new Date().toLocaleDateString();
        let hora;
        is9AM? hora='9:00 AM': '';
        is1PM? hora='1:00 PM': '';
        if(cadena.includes('Actualización:') && cadena.includes(`${fecha}`) && cadena.includes(`${hora}`) && cadena.includes('#promediodeldolar')){
            index=i
        }
        //console.log( elemento.caption,i)
        //console.log( cadena)
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
   /* console.log(publicacion[index].caption)
    console.log(estracto)
    console.log(tasa2)
    console.log(bolivar)*/
    const tasa=parseFloat(bolivar.replace(',',"."))
    
    return ({tasa,hora})
}

module.exports=PriceInstagram; 