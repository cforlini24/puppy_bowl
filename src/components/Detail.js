import react, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Detail = (props) => {
    let {puppies} = props;
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

    useEffect(()=>{
        getTeamData();
    },[])

    return (
        <div className="detailContainer">
            <img className="detailPic" src={imageUrl}/>
            <div className="detailText">
                <p className="detailName">Puppy name: <span className="detailData"> {name}</span></p>
                <p className="detailBreed">Puppy breed: <span className="detailData">{breed}</span></p>
                <p className="detailStatus">Puppy status: </p><span className="detailData">{status}</span>
                <p className="detailTeam">Team name: <span className="detailData">{teamName}</span></p>
                <p className="detailId">#{id}</p>

            </div>
            
        </div>
    )
}

export default Detail;