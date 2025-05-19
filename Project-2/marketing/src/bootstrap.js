import React from "react"
import ReactDOM from 'react-dom'
import {ReactApp} from "./ReactApp"
//  We need a mount function , 
//  Two conditon if we are in dev , and if we are in the prod


const mount = el => {
    ReactDOM.render(
        <ReactApp/>,
        el
    )
}

if(process.env.NODE_ENV === 'development'){
    if(document.querySelector("#_marketing-dev-root")){
    mount(document.querySelector("#_marketing-dev-root"));
    }
}

// We are running through teh contianer
export{mount}