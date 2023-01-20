import React from 'react'
import Cookies from 'js-cookie';


export default function SideBarCategory() {

    const category=Cookies.get('category') ? JSON.parse(Cookies.get('category')): []

   
    return (
        <div style={{marginTop:"10px", marginLeft:"4em"}}>
           
           {category.map(item=><h5 key={item.id}>{item.title}</h5>)}
            
        </div>
    )
}
