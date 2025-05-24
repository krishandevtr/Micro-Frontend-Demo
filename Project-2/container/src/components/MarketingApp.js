import {mount} from "marketing/MarketingApp";
import React, {useEffect, useRef} from "react";
import {useHistory  } from "react-router-dom";
export default ()=>{
  const history = useHistory();
  const ref = useRef(null);
    useEffect(()=>{
      const {onParentNavigate} =  mount(ref.current,{
          initialPath:history.location.pathname,
          onNavigate:({pathname:nextPathname})=>{
            if(history.location.pathname !== nextPathname){
                history.push(nextPathname);
            }
          }
        });
        history.listen(onParentNavigate);
    },[]);

  return <div ref={ref}/>
};