import { useState, useEffect } from "react";
import { BalanceCard } from "./components/BalanceCard/BalanceCard";
import type { Transaction } from "./types/finance";
import { TransactionForm } from "./components/TransactionForm/TransactionForm";
import { TransactionList } from "./components/TransactionList/TransactionList";
import {
    TransactionFilters,
    type FilterType,
} from "./components/TransactionFilters";

import "./App.css";

const STORAGE_KEY = "finance_tracker_transactions";

function App() {
    const [transactions, setTransactions] = useState<Transaction[]>(() => {
        const savedData = localStorage.getItem(STORAGE_KEY);

        if (savedData) {
            return JSON.parse(savedData);
        }

        return [
            {
                id: "1",
                title: "Зарплата",
                amount: 85000,
                type: "income",
                category: "Работа",
                date: "2026-11-20",
            },
            {
                id: "2",
                title: "Продукты в магазине",
                amount: 3200,
                type: "expense",
                category: "Еда",
                date: "2026-11-21",
            },
        ];
    });

    const [filter, setFilter] = useState<FilterType>("all");
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(transactions));
    }, [transactions]);

    const handleAddTransactions = (newTransaction: Transaction) => {
        setTransactions([newTransaction, ...transactions]);
    };

    const handleDeleteTranasactions = (id: string) => {
        setTransactions((prev) => prev.filter((item) => item.id !== id));
    };

    const filterTransactions = transactions.filter((item) => {
        const matchesType = filter === "all" || item.type === filter;

        const query = searchQuery.toLowerCase().trim();
        const matchesSearch =
            item.title.toLowerCase().includes(query) ||
            item.category.toLowerCase().includes(query);

        return matchesType && matchesSearch;
    });

    return (
        <>
            <div className="app-container">
                <h1 className="app-title">Мой трекер финансов</h1>

                <BalanceCard transactions={transactions}></BalanceCard>

                <TransactionForm
                    onAddTransaction={handleAddTransactions}
                ></TransactionForm>

                <TransactionFilters
                    currentFilter={filter}
                    onFilterChange={setFilter}
                    searchQuery={searchQuery}
                    onSearchChange={setSearchQuery}
                ></TransactionFilters>

                <TransactionList
                    transactions={filterTransactions}
                    onDeleteTransaction={handleDeleteTranasactions}
                ></TransactionList>
            </div>
        </>
    );
}

export default App;
