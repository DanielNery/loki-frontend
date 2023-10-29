import React from "react";
import Header from "../../components/Header";
import Card from "../../components/Card";
import Input from "../../components/Input";
import GridRowEntry from "../../components/GridRowEntry";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUpWideShort } from "@fortawesome/free-solid-svg-icons";
import { faArrowDownWideShort } from "@fortawesome/free-solid-svg-icons";
import { faMoneyBillTransfer } from "@fortawesome/free-solid-svg-icons";


export default function Entry(){
    return(
        <>
            <Header />
            <Input/>

            <div className="grid md:grid-cols-3 gap-2 m-10">
                <Card title="Entradas" value={10000} IconComponent={<FontAwesomeIcon icon={faArrowUpWideShort} />}/>
                <Card title="Saídas" value={10000} IconComponent={<FontAwesomeIcon icon={faArrowDownWideShort} />}/>
                <Card title="Saldo" value={10000} IconComponent={<FontAwesomeIcon icon={faMoneyBillTransfer} />}/>
            </div>

            
            <div className="flex flex-col m-10">

                <div className=" mt-5 rounded-md bg-gray-700 bg-opacity-10">
                    <div className="grid grid-cols-4 m-5 font-extrabold">
                        <span className="p-2">Título</span>
                        <span className="p-2">Valor</span>
                        <span className="p-2">Tipo</span>
                        <div className="flex flex-row justify-end"></div>
                    </div>
                </div>

                <GridRowEntry 
                    title="Salário"
                    value={2700}
                    type="income"
                />

                <GridRowEntry 
                    title="Aluguel"
                    value={1505}
                    type="expense"
                />

                <GridRowEntry 
                    title="Extra"
                    value={600}
                    type="income"
                />

                <GridRowEntry 
                    title="Carro"
                    value={1116}
                    type="expense"
                />

                <GridRowEntry 
                    title="Salário"
                    value={2700}
                    type="income"
                />

                <GridRowEntry 
                    title="Aluguel"
                    value={1505}
                    type="expense"
                />

                <GridRowEntry 
                    title="Extra"
                    value={600}
                    type="income"
                />

                <GridRowEntry 
                    title="Carro"
                    value={1116}
                    type="expense"
                />


            </div>
        </>
    );
}