import react, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";


const Detail = (props) => {
    let {puppies, setUseSearchBar, getPuppiesData, setPuppies} = props;
    let {detailId} = useParams();
    let detailPuppy = {};
    let [teamData, setTeamData] = useState([])
    let detailTeam = {}
    
    //select detailed puppy
    for (let i = 0;i < puppies.length; ++i ){
        if(puppies[i].id == detailId){
            detailPuppy = puppies[i];
            break;
        }
    }
    //pull teamId and other info 
    let {teamId, status, name, breed, id, imageUrl} = detailPuppy;

    async function getTeamData () {
        try {
            let response = await fetch("https://fsa-puppy-bowl.herokuapp.com/api/2301-FTB-MT-WEB-FT/teams");
            let data = await response.json();
            setTeamData(data.data.teams)
        } catch (error) {
            console.log(error)
        }
    }

    //select detailed team
    for(let i = 0; i <teamData.length; i++){
        if(teamData[i].id == teamId){
            detailTeam = teamData[i];
            break;
        }
    }
    //pull team name
    let teamName = detailTeam.name;

    //function to fix capitalization on status value
    function capitalizeFirstLetter(string) {
        if(string){ return string.charAt(0).toUpperCase() + string.slice(1)}
        else{return null}
       
    }

    async function deletePuppy(){
        console.log("deleting puppy " + id)
        try {
            let response = await fetch(`https://fsa-puppy-bowl.herokuapp.com/api/2301-FTB-MT-WEB-FT/players/${id}`,
            {
                method: "DELETE"
            }) 
            let data = await response.json();
            console.log(data);
        } catch (error) {
            console.log(error)
        }
        let filteredPuppies = puppies.filter((puppy)=>{
            return (puppy.id != id)
        })

        setPuppies(filteredPuppies);
    }

    useEffect(()=>{
        setUseSearchBar(false);
        getTeamData();
        getPuppiesData();
    },[])

    return (
        <div className="detailContainer">
            <img className="detailPic" src={imageUrl}/>
            <div className="detailText">
                <p className="detailName">Name: <span className="detailData"> {name}</span></p>
                <p className="detailBreed">Breed: <span className="detailData">{breed}</span></p>
                <p className="detailStatus">Status: <span className="detailData">{capitalizeFirstLetter(status)}</span> </p>
                <p className="detailTeam">Team Name: <span className="detailData">{teamName}</span></p>
                <p className="detailId">ID: <span className="detailData">#{id}</span></p>
                <Link id="deleteLink" to="/" onClick={() => {
                setUseSearchBar(true);
                deletePuppy()
                }}>
                    <button className="formBttn" id="detailDelete">Delete Puppy</button>
                </Link>
            </div>

            
        </div>
    )
}

export default Detail;