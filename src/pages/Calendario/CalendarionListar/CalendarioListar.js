import React from "react";

import Header from "../../../components/Header/Header";
import Pesquisa from "../../../components/Pesquisa/Pesquisa";
import BotaoCriar from "../../../components/BotaoCriar/BotaoCriar";


const date = new Date();
const diaAtual = date.getDate() 
console.log(diaAtual)

const calendarDados = {
    segunda: [29, 5, 12, 19, 26, 3],
    terca: [30,6,13,20,27,4],
    quarta: [31,7,14,21,28,5],
    quinta: [1,8,15,22,29,6],
    sexta: [2,9,16,23,30,7],
    sabado: [3,10,17,24,1,8],
    domingo: [28,4,11,18,25]
}

const tarefaDados = {
    conteudo: [
        {
            name: "Tarefa X",
            description: "Teste de tarefa",
            dia: 1
        },
        {
            name: "Tarefa X",
            description: "Teste de tarefa",
            dia: 1
        },
        {
            name: "Tarefa X",
            description: "Teste de tarefa",
            dia: 1
        },
        {
            name: "Tarefa X",
            description: "Teste de tarefa",
            dia: 1
        }
    ]
}

function CalendarioListar() {

    function verificaDiaAtual(dia_atual, dia_calendario) {
        console.log(dia_atual)
        console.log(dia_calendario)
        if (dia_atual == dia_calendario){
            return true
        }
        return false
    }

    function renderTasks(task, dia_numero){

        if (task.dia == dia_numero) {
            return  <div className="mt-2 flex flex-col bg-white bg-opacity-10 hover:bg-green-400 hover:bg-opacity-10 text-gray-200">
                        <span>{task.name}</span>
                        <span>{task.description}</span>
                    </div>
        }
    }

    function renderCol(dia_numero, dia_texto){
        return  <div className="md:row-1 border-white border text-white hover:bg-white hover:bg-opacity-10 p-2 min-h-full max-h-10 overflow-auto">
                    <div className="mt-5 flex justify-around">
                        <span className={ verificaDiaAtual(diaAtual, dia_numero) ? "border rounded-lg p-6 border-green-600 bg-green-600 font-bold" : ""}>{dia_numero}</span> 
                        <span>{dia_texto}</span>
                    </div>
                    {tarefaDados.conteudo.map(task => renderTasks(task, dia_numero))}
                </div>
    }

    return (

        <div className="container-fluid">
            <Header />
            
            <div className="w-screen h-32 flex flex-col md:flex-row justify-around items-center p-10">
                <div>
                    <h1 className="mt-5 text-3xl text-green-600 font-bold" >Calendário</h1>
                </div>

                <div className="mt-5 mb-5 text-black flex justify-between items-center">
                    <div className="mr-5">
                        <Pesquisa/>
                    </div>
                    <div className="ml-5 mt-2">
                        <BotaoCriar/>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-7 md:grid-rows-4 p-5">
                
                <div className="md:col-1">
                    {calendarDados.segunda.map(element => renderCol(element, "Segunda"))}
                </div>

                <div className="md:col-1">
                    {calendarDados.terca.map(element => renderCol(element, "Terça"))}
                </div>

                <div className="md:col-1">
                    {calendarDados.quarta.map(element => renderCol(element, "Quarta"))}
                </div>

                <div className="md:col-1">
                    {calendarDados.quinta.map(element => renderCol(element, "Quinta"))}
                </div>

                <div className="md:col-1">
                    {calendarDados.sexta.map(element => renderCol(element, "Sexta"))}
                </div>

                <div className="md:col-1">
                    {calendarDados.sabado.map(element => renderCol(element, "Sabado"))}
                </div>

                <div className="md:col-1">
                    {calendarDados.domingo.map(element => renderCol(element, "Domingo"))}
                </div>

                
            </div>
        </div>

    );
}

export default CalendarioListar;