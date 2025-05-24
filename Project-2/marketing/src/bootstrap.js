import React from "react"
import ReactDOM from 'react-dom'
import {createMemoryHistory, createBrowserHistory} from "history"
import {ReactApp} from "./ReactApp"
//  We need a mount function , 
//  Two conditon if we are in dev , and if we are in the prod


const mount = (el ,{onNavigate,defaultHistory,initialPath})=> {
    const history = defaultHistory || createMemoryHistory({
        initialEntries:[initialPath]
    });
    if(onNavigate){
        history.listen(onNavigate);
    }
    ReactDOM.render(
        <ReactApp history={history}/>,
        el
    )
    return {
        onParentNavigate({pathname:nextPathname}){
            const {pathname} = history.location;
            if(pathname !== nextPathname){
                history.push(nextPathname);
            }
             
        }
    }
}


if (process.env.NODE_ENV === 'development') {
    const onNavigate = () => {
        console.log("Navigating to");  
    };

    const devRoot = document.querySelector("#_marketing-dev-root");

    if (devRoot) {
        mount(devRoot, { defaultHistory: createBrowserHistory(), onNavigate });
    }
}


// We are running through teh contianer
export{mount}