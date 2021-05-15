import React from "react";
import {Link} from "react-router-dom"
const Fail = () => {
    return (
        <div>
          <p>Sorry your video cannot be uploaded plz try again</p>
        <Link to="/">Try Again</Link>
        </div>
    )
}
export default Fail;