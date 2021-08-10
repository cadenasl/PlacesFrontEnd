// import classes from "./map.module.css";
// import { useRef } from "react"


// const Map=(props)=>{
// const mapRef=useRef()
// const {coordinates,zoom}=props
// const map = new window.google.maps.Map(mapRef.current, {
//     center:coordinates,
//     zoom: zoom
//   });

//   const marker=new google.maps.Marker({
//     position: coordinates,
//     map:map
//   });

//     return<div className={classes.map} ref={mapRef}>


//     </div>
// }

// export default Map
import React, { useEffect, useRef } from "react"

import './map.css';


function Map(props){
    const mapRef= useRef();
    const{coordinates,zoom}=props;
    useEffect(()=>{const map = new window.google.maps.Map(mapRef.current,{center:coordinates,
        zoom:zoom,
        mapTypeId: "roadmap",});
        new window.google.maps.Marker({position:coordinates,map:map});},[coordinates,zoom]);

    

return<div ref={mapRef} className={`map ${props.className}`} style={props.style}></div>


};

export default Map; 