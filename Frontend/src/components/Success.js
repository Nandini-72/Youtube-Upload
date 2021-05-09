import React , { useState } from "react";
const Success = () => {

    const [name,setName] = useState("");
     function getLink(){
       fetch("http://localhost:5000/link")
       .then(response => response.text())
       .then(response => setName(response))
     }
    return (
        <div>
          <p>Your video is uploaded successfully</p>
            <p>{name}</p>
            <button  onClick={getLink} >Link</button>
        </div>
    )
}
export default Success;