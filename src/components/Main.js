import react, { useEffect } from "react";
import { Link } from "react-router-dom";
import PuppyCreator from "./PuppyCreator";

const Main = (props) => {
    const {puppies, searchTerm, setUseSearchBar, setPuppies} = props;

    let filteredPuppies = puppies.filter((puppy) =>{
        let lowcaseName = puppy.name.toLowerCase();

        return lowcaseName.includes(searchTerm.toLowerCase())
    })

    useEffect(() =>{
        setUseSearchBar(true)
    },[])
    
    return (
        <div id="containerContainer">
        {
            filteredPuppies.length ? filteredPuppies.map((puppy) => {
                return (
                    <Link to={`./${puppy.id}`} className ={`puppyContainer num${puppy.teamId}`}  key ={puppy.id} >
                        <img className="puppyPic" src={puppy.imageUrl}/>
                        <div className="textContainer">
                            <p className="puppyName">{puppy.name}</p>
                        </div>   
                    </Link>
                )
            }): <div>Data loading</div>
        }

        <PuppyCreator setPuppies={setPuppies} puppies={puppies}/>
        </div>
    )
}

export default Main;


