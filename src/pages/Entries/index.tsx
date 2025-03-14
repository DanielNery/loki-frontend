import React, { useState } from "react";
import Header from "../../components/Header";
import Card from "../../components/Card";
import Input from "../../components/Input";
import GridRowEntry from "../../components/GridRowEntry";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUpWideShort, faArrowDownWideShort, faMoneyBillTransfer } from "@fortawesome/free-solid-svg-icons";
import { usePix } from "../../hooks/usePix";
import DateFilter from "../../components/DateFilter";
import { LoadingSpinner } from "../../components/LoadingSpinner";

export default function Entries() {
    const [page, setPage] = useState(0);
    const [itemsPerPage] = useState(10);
    const [startDate, setStartDate] = useState("2022-01-15T00:00:00.000Z");
    const [endDate, setEndDate] = useState("2025-12-19T23:00:00.000Z");

    const { pix, loading, error } = usePix(page, itemsPerPage, startDate, endDate);

    const formatCurrency = (value: number) => {
        return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
    };

    const totalEntradas = pix
        .filter(transaction => transaction.type === "received")
        .reduce((acc, transaction) => acc + parseFloat(transaction.valor), 0);

    const totalSaidas = pix
        .filter(transaction => transaction.type === "send")
        .reduce((acc, transaction) => acc + parseFloat(transaction.valor), 0);

    const saldo = totalEntradas - totalSaidas;

    return (
        <>
            <Header />
            <Input>
                <DateFilter setStartDate={setStartDate} setEndDate={setEndDate} />
            </Input>

            <div className="grid md:grid-cols-3 gap-2 m-10">
                <Card title="Entradas" value={formatCurrency(totalEntradas)} IconComponent={<FontAwesomeIcon icon={faArrowUpWideShort} />} />
                <Card title="Saídas" value={<span style={{ color: 'red' }}>{formatCurrency(-totalSaidas)}</span>} IconComponent={<FontAwesomeIcon icon={faArrowDownWideShort} />} />
                <Card title="Saldo" value={<span style={{ color: saldo < 0 ? 'red' : 'green' }}>{formatCurrency(saldo)}</span>} IconComponent={<FontAwesomeIcon icon={faMoneyBillTransfer} />} />
            </div>

            <div className="flex flex-col m-10">
                <div className="mt-5 rounded-md bg-gray-700 bg-opacity-10">
                    <div className="grid grid-cols-5 m-5 font-extrabold">
                        <span className="p-2">EndToEndId</span>
                        <span className="p-2">Valor</span>
                        <span className="p-2">Horário</span>
                        <span className="p-2">Favorecido</span>
                        <div className="flex flex-row justify-end"></div>
                    </div>
                </div>

                {loading ? (
                    <LoadingSpinner />
                ) : error ? (
                    <p>Erro ao carregar transações PIX</p>
                ) : pix.length > 0 ? (
                    pix.map((transaction) => (
                        <div key={transaction.endToEndId} className="grid grid-cols-5 m-5">
                            <span className="p-2">{transaction.endToEndId}</span>
                            <span className="p-2" style={{ color: transaction.type === "send" ? 'red' : 'green' }}>
                                {formatCurrency(transaction.type === "send" ? -parseFloat(transaction.valor) : parseFloat(transaction.valor))}
                            </span>
                            <span className="p-2">{transaction.horario.liquidacao || transaction.horario.solicitacao || transaction.horario}</span>
                            <span className="p-2">{transaction.favorecido?.identificacao?.nome || "DANIEL PONTES NERY"}</span>
                            <div className="flex flex-row justify-end">
                                <FontAwesomeIcon icon={transaction.type === "send" ? faArrowUpWideShort : faArrowDownWideShort} />
                            </div>
                        </div>
                    ))
                ) : (
                    <p>Nenhuma transação encontrada.</p>
                )}
            </div>

            <div className="flex justify-center mt-4">
                <button onClick={() => setPage((prev) => Math.max(prev - 1, 0))} disabled={page === 0}>
                    Anterior
                </button>
                <span className="mx-4">Página {page + 1}</span>
                <button onClick={() => setPage((prev) => prev + 1)}>
                    Próxima
                </button>
            </div>
        </>
    );
}
