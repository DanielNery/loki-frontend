import React from "react";
import Galeria from "../../components/Galeria";
import Header from "../../components/Header/Header";


function Home() {
    return (
        
        <div className="container-fluid bg-black w-screen h-screen">
            <Header/>
            <Galeria/>
        </div>

    );
}

export default Home;