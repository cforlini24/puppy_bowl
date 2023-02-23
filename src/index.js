import {createRoot} from "react-dom/client";
import {useState, useEffect} from "react"
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Detail, Main, Navbar, ScrollToTop } from "./components";
import jadeImage from "./jadePic.jpg"
import ivyImage from "./ivyPic.jpg"

const App = () => {
    const [puppies, setPuppies] = useState([])
    const [searchTerm, setSearchTerm] = useState("");
    const [useSearchBar, setUseSearchBar] = useState(true)

    //I wanted to add my own pets :) 
    let jade = {
        "id" : 1360,
        "name" : "Jade",
        "breed": "Tabby",
        "status": "bench",
        "imageUrl": jadeImage,
        "teamId": 195
    }
     
    let ivy = {
        "id" : 1361,
        "name": "Ivy",
        "breed": "I dont know lol",
        "status": "bench",
        "imageUrl":ivyImage,
        "teamId": 195
    }


    async function getPuppiesData () {
        try {
            let response = await fetch("https://fsa-puppy-bowl.herokuapp.com/api/2301-FTB-MT-WEB-FT/players");
            let data = await response.json();
            let players = data.data.players
            setPuppies([...players, jade, ivy])
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() =>{
        setUseSearchBar(true);
        getPuppiesData();
    }, [])

    return (
        <BrowserRouter>
            <ScrollToTop />
            <Navbar searchTerm={searchTerm} setSearchTerm={setSearchTerm} useSearchBar={useSearchBar} setUseSearchBar = {setUseSearchBar}/>
            <Routes>
                <Route path="/*" element={<Main puppies = {puppies} searchTerm={searchTerm} setUseSearchBar={setUseSearchBar}/>}/>
                <Route path="/" element = {<Main puppies = {puppies} searchTerm={searchTerm} setUseSearchBar={setUseSearchBar}/>}/>
                <Route path="/:detailId" element = {<Detail puppies = {puppies} setUseSearchBar={setUseSearchBar} getPuppiesData={getPuppiesData}/>} />
            </Routes>
        </BrowserRouter>
    )
}

let appElt = document.getElementById("app");
let root = createRoot(appElt);
root.render(<App />)