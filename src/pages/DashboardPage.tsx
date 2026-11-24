import { useState, useEffect } from "react";
import type { Transaction } from "../types/finance";
import { useAuth } from "../context/AuthContext";
import { BalanceCard } from "../components/BalanceCard/BalanceCard";
import { CategoryChart } from "../components/CategoryChart";
import { TransactionForm } from "../components/TransactionForm/TransactionForm";
import { TransactionList } from "../components/TransactionList/TransactionList";
import {
    TransactionFilters,
    type FilterType,
} from "../components/TransactionFilters";

export function DashboardPage() {
    const { user } = useAuth();

    const storageKey = `finflow_transactions_${user?.id}`;

    const [transactions, setTransactions] = useState<Transaction[]>(() => {
        try {
            const savedData = localStorage.getItem(storageKey);
            if (savedData) {
                const parsed = JSON.parse(savedData);
                // Убеждаемся, что из памяти достали именно массив
                if (Array.isArray(parsed)) {
                    return parsed;
                }
            }
        } catch (error) {
            console.error("Ошибка чтения данных из localStorage:", error);
        }

        return [];
    });

    const [filter, setFilter] = useState<FilterType>("all");
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        localStorage.setItem(storageKey, JSON.stringify(transactions));
    }, [transactions, storageKey]);

    const handleAddTransaction = (newTransaction: Transaction) => {
        setTransactions((prev) => [newTransaction, ...prev]);
    };

    const handleDeleteTransaction = (id: string) => {
        setTransactions((prev) => prev.filter((item) => item.id !== id));
    };

    const filteredTransactions = transactions.filter((item) => {
        const matchesType = filter === "all" || item.type === filter;
        const query = searchQuery.toLowerCase().trim();
        const matchesSearch =
            item.title.toLowerCase().includes(query) ||
            item.category.toLowerCase().includes(query);

        return matchesType && matchesSearch;
    });

    return (
        <div className="app-container">
            <h1 className="app-title">Привет, {user?.name}! 👋</h1>

            <BalanceCard transactions={transactions} />
            <CategoryChart transactions={transactions} />
            <TransactionForm onAddTransaction={handleAddTransaction} />

            <TransactionFilters
                currentFilter={filter}
                onFilterChange={setFilter}
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
            />

            <TransactionList
                transactions={filteredTransactions}
                onDeleteTransaction={handleDeleteTransaction}
            />
        </div>
    );
}
