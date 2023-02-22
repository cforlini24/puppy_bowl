import {createRoot} from "react-dom/client";
import {useState, useEffect} from "react"
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Detail, Main, Navbar, ScrollToTop } from "./components";

const App = () => {
    const [puppies, setPuppies] = useState([])


    async function getPuppiesData () {
        try {
            let response = await fetch("https://fsa-puppy-bowl.herokuapp.com/api/2301-FTB-MT-WEB-FT/players");
            let data = await response.json();
            setPuppies(data.data.players)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() =>{
        getPuppiesData();
    }, [])

    return (
        <BrowserRouter>
            <ScrollToTop />
            <Navbar />
            <Routes>
                <Route path="/" element = {<Main puppies = {puppies} />}/>
                <Route path="/:detailId" element = {<Detail puppies = {puppies}/>} />
            </Routes>
        </BrowserRouter>
    )
}

let appElt = document.getElementById("app");
let root = createRoot(appElt);
root.render(<App />)