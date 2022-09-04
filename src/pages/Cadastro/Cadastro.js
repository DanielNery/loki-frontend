import React from "react";

import { GiBullHorns } from 'react-icons/gi';

function Cadastro() {

    return (
        <div class="h-screen font-sans login bg-cover bg-black">
            <div class="container mx-auto h-full flex flex-1 justify-center items-center">
                <div class="w-full max-w-lg">
                    <div class="leading-loose">
                        <form class="max-w-sm m-4 p-10 bg-green-600 rounded shadow-xl">
                            
                            <div className="flex justify-center items-center">
                                <p class="text-white text-center text-lg font-extrabold mr-5">CADASTRO </p>
                                <GiBullHorns size={42}  className="text-white"/>

                            </div>
                            
                            <div class="">
                                <label class="block text-sm text-white font-bold" for="email">E-mail</label>
                                <input class="w-full px-5 py-1  rounded focus:outline-none" type="email" id="email"  placeholder="Digite o e-mail" aria-label="email" required />
                            </div>
                            <div class="mt-2">
                                <label class="block  text-sm text-white font-bold">Cadastrar</label>
                                <input class="w-full px-5 py-1 rounded focus:outline-none "
                                type="password" id="password" placeholder="Digite a sua senha" arial-label="password" required />
                            </div>

                            <div class="mt-5 items-center flex justify-center">
                                <button class="px-4 py-1 text-green-600 font-bold tracking-wider bg-white hover:bg-gray-200 rounded"
                                type="submit">Cadastrar</button>
                                
                            </div>

                        </form>

                    </div>
                </div>
            </div>
        </div>
    )


}

export default Cadastro;