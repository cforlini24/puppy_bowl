import React, { useState } from "react";

const PuppyCreator = (props) => {
    let {puppies, setPuppies} = props;

    let submitMessage = "Add new puppy"
    let deleteMessage = "Delete puppy"

    const [newPuppyName, setNewPuppyName] = useState("");
    const [newPuppyBreed, setNewPuppyBreed] = useState("");
    const [newPuppyImage, setnewPuppyImage] = useState("");
    const [deletePuppyId, setDeletePuppyId] = useState("");

    async function postNewPuppy (event){
        try {
            let response = await fetch("https://fsa-puppy-bowl.herokuapp.com/api/2301-FTB-MT-WEB-FT/players", 
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name: newPuppyName,
                    breed: newPuppyBreed,
                    imageUrl: newPuppyImage
                })
            })
            let data = await response.json();
            setPuppies([...puppies, data.data.newPlayer])
        } catch (error) {
            console.log(error)
        }
    } 

    async function deletePuppy(event){
        try {
            let response = await fetch(`https://fsa-puppy-bowl.herokuapp.com/api/2301-FTB-MT-WEB-FT/players/${deletePuppyId}`,
            {
                method: "DELETE"
            }) 
            let data = await response.json();
            console.log(data);
        } catch (error) {
            console.log(error)
        }
    }


    function returnToDefault (){

    }

    return (
        <div id="formContainer">
        <form id="createForm">
            <input className="formInput" type="text" placeholder="New puppy name" value={newPuppyName} onChange={(event) => {
                setNewPuppyName(event.target.value);
            }}></input>
            <input className="formInput" type="text" placeholder="New puppy breed" value={newPuppyBreed} onChange={(event) =>{
                setNewPuppyBreed(event.target.value)
            }}></input>
            <input className="formInput" type="text" placeholder="Image URL (optional)" value={newPuppyImage} onChange={(event) => {
                setnewPuppyImage(event.target.value)
            }}></input>
            <input className="formBttn" type="submit" value="Add new puppy" onClick={(event) => {
                event.preventDefault();
                if(!newPuppyName.length){
                    event.target.classList.add("errorMessage")
                    event.target.value = "Enter a name";
                setTimeout(()=> {
                    event.target.classList.remove("errorMessage");
                    event.target.value="Add new puppy";
                }, 500)
                }else if(!newPuppyBreed.length){
                    event.target.classList.add("errorMessage")
                    event.target.value = "Enter a breed";
                    setTimeout(()=>{
                        event.target.value="Add new puppy";
                        event.target.classList.remove("errorMessage");
                }, 500)
                }else{
                    postNewPuppy();
                    setNewPuppyBreed("");
                    setNewPuppyName("");
                    setnewPuppyImage("");
                }
                }}></input>
        </form>
        <form>
            <input className="formInput" type="text" placeholder="ID of puppy to delete" value={deletePuppyId} onChange={(event) =>{
                setDeletePuppyId(event.target.value)
            }} ></input>
            <input className="formBttn" type="submit" value="Delete puppy" onClick={(event)=>{
                if(!deletePuppyId.length){
                    event.preventDefault();
                    event.target.value = "Enter an ID";
                    event.target.classList.add("errorMessage");
                    setTimeout(()=>{
                        event.target.value="Delete puppy";
                        event.target.classList.remove("errorMessage");
                    }, 500)
                } else {
                    deletePuppy(event); 
                }
        }}></input>
        </form>
        </div>
    )
}

export default PuppyCreator;
