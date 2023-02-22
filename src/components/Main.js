import react from "react";
import { Link } from "react-router-dom";

const Main = (props) => {
    let {puppies} = props;
    return (
        <div id="containerContainer">
        {
            puppies.length ? puppies.map((puppy) => {
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
        </div>
    )
}

export default Main;


