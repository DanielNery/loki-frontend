import React from "react";

import greenPeople from '../../assets/green-people.svg';
import greenSymbol from '../../assets/green-symbol.svg';


function Galeria(props) {
    return(

        <div className="container p-10">
            <div className="grid grid-cols-1 md:grid-cols-4 text-green-600 text-center gap-y-40 animacao-padrao">

                <div  className="flex justify-center items-center col-span-2">
                    <img  src={greenPeople} alt="" width={350} height={350} />
                </div>

                <div className="col-span-2 flex flex-col justify-around hover:border hover:border-green-600 bg-gray-50 bg-opacity-5 p-5 rounded-full" >
                    <h1 className="font-bold text-2xl">O sistema perfeito para você!</h1>
                    <p className="text-white m-5">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
                </div>

                <div className="col-span-2 flex flex-col justify-around hover:border hover:border-green-600 bg-gray-50 bg-opacity-5 p-5 rounded-full" >
                        <h1 className="font-bold text-2xl">Organize suas despesas e receitas</h1>
                        <p className="text-white m-5">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
                </div>

                <div className="flex justify-center items-center col-span-2" >
                    <img  src={greenSymbol} alt="" width={350} height={350} />
                </div>

            </div>
        </div>

    );

}

export default Galeria;