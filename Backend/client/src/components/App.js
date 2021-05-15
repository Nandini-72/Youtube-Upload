import React, { useState} from "react";
import axios from "axios";
const App = () => {
    const [form,setForm] = React.useState({
        title:"",
        description:"",
        file:null
    })
    const [name,setName] = useState();
    function handleChange(event){
        const inputValue = event.target.name === "file" ? event.target.files[0] : event.target.value;
        setForm({
            ...form,
            [event.target.name]:inputValue
        })

    }
    function getLink(){
        fetch("http://localhost:5000/link")
        .then(response => response.text())
        .then(response => setName(response))
      }
    function handleSubmit(event){
        event.preventDefault();
        const videoData = new FormData();
        videoData.append("videoFile",form.file);
        videoData.append("title",form.title);
        videoData.append("description",form.description);
        axios.post("http://localhost:5000/upload",videoData)
        .then(response => {
            console.log(response.data);
        }).catch(e=>{
            console.log(e)
        })
    }
    return (
        <div className="container">
            <h1>Upload the Video</h1>
            <p>{name}</p>
            <form onSubmit={handleSubmit}>
                <div>
                    <input onChange={handleChange} type="text" name="title" autoComplete="off" required placeholder="Title" />
                </div>
                <div>
                    <textarea onChange={handleChange} name="description" autoComplete="off" required placeholder="Description" ></textarea>
                </div>
                <div>
                    <input onChange={handleChange} accept="video/mp4" type="file" name="file"  required placeholder="Add video file"/>
                </div>
                <button className="btn" type="submit">Upload</button>
            </form>
            <button className="btn" onClick={getLink} >Link</button>
        </div>
    )
}
export default App;