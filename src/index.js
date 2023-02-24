import {createRoot} from "react-dom/client";
import {useState, useEffect} from "react"
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Detail, Main, Navbar, ScrollToTop, PuppyCreator } from "./components";


const App = () => {
    const [puppies, setPuppies] = useState([])
    const [searchTerm, setSearchTerm] = useState("");
    const [useSearchBar, setUseSearchBar] = useState(true)



    async function getPuppiesData () {
        try {
            let response = await fetch("https://fsa-puppy-bowl.herokuapp.com/api/2301-FTB-MT-WEB-FT/players");
            let data = await response.json();
            let players = data.data.players
            setPuppies(players)
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
                <Route path="/*" element={<Main puppies = {puppies} searchTerm={searchTerm} setUseSearchBar={setUseSearchBar} setPuppies={setPuppies}/>}/>
                <Route path="/" element = {<Main puppies = {puppies} searchTerm={searchTerm} setUseSearchBar={setUseSearchBar} setPuppies={setPuppies}/>}/>
                <Route path="/:detailId" element = {<Detail puppies = {puppies} setUseSearchBar={setUseSearchBar} getPuppiesData={getPuppiesData} setPuppies={setPuppies}/>} />
            </Routes>
        </BrowserRouter>
    )
}

let appElt = document.getElementById("app");
let root = createRoot(appElt);
root.render(<App />)