import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "../../components/Header";
import Card from "../../components/Card";
import Input from "../../components/Input";
import GridRowEntry from "../../components/GridRowEntry";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUpWideShort } from "@fortawesome/free-solid-svg-icons";
import { faArrowDownWideShort } from "@fortawesome/free-solid-svg-icons";
import { faMoneyBillTransfer } from "@fortawesome/free-solid-svg-icons";

interface Entry {
    id: number;
    _id: number;
    nm_name: string;
    nm_value: number;
    nm_type: string;
}

export default function Entries() {
    const [entries, setEntries] = useState<Entry[]>([]); // Inicializando como um array vazio de Entry

    useEffect(() => {
        const fetchEntries = async () => {
            try {
                const response = await fetch("http://localhost:8000/api/v1/entry", {
                    headers: {
                        "Content-Type": "application/json",
                        // Adicione outros headers, se necessário
                    },
                });
                console.log(response)
                if (!response.ok) {
                    throw new Error(`Erro ao buscar entradas: ${response.statusText}`);
                }
                const data = await response.json();
                console.log(data)
                setEntries(data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchEntries();
    }, []);

    return (
        <>
            <Header />
            <Input />
        
            <div className="grid md:grid-cols-3 gap-2 m-10">
                <Card title="Entradas" value={10000} IconComponent={<FontAwesomeIcon icon={faArrowUpWideShort} />} />
                <Card title="Saídas" value={10000} IconComponent={<FontAwesomeIcon icon={faArrowDownWideShort} />} />
                <Card title="Saldo" value={10000} IconComponent={<FontAwesomeIcon icon={faMoneyBillTransfer} />} />
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

                {entries.length > 0 ? ( // Verifica se entries não está vazio antes de mapear
                    entries.map(entry => (
                        <GridRowEntry
                            id={entry._id}
                            key={entry.id}
                            title={entry.nm_name}
                            value={entry.nm_value}
                            type={entry.nm_type}
                        />
                    ))
                ) : (
                    <p>Nenhuma entrada encontrada.</p>
                )}
            </div>
        </>
    );
}
