import { useState } from "react";
import styles from "./TransactionForm.module.css";
import type { Transaction, TransactionType } from "../../types/finance";

interface TransactionFormProps {
    onAddTransaction: (newTransaction: Transaction) => void;
}

export function TransactionForm({ onAddTransaction }: TransactionFormProps) {
    const [title, setTitle] = useState("");
    const [amount, setAmount] = useState("");
    const [type, setType] = useState<TransactionType>("expense");
    const [category, setCategory] = useState("Еда");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const namericAmount = Number(amount);
        if (!title.trim || namericAmount <= 0) return;

        const newTransaction: Transaction = {
            id: Date.now().toString(),
            title: title.trim(),
            amount: namericAmount,
            type,
            category,
            date: new Date().toISOString().split("T")[0],
        };

        onAddTransaction(newTransaction);

        setTitle("");
        setAmount("");
    };

    return (
        <form onSubmit={handleSubmit} className={styles.form}>
            <input
                className={styles.input}
                type="text"
                placeholder="Название"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
            />
            <input
                className={styles.input}
                type="text"
                placeholder="Сумма"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                required
            />

            <select
                className={styles.select}
                value={type}
                onChange={(e) => setType(e.target.value as TransactionType)}
            >
                <option value="expense">Расход</option>
                <option value="income">Доход</option>
            </select>

            <select
                className={styles.select}
                value={category}
                onChange={(e) => setCategory(e.target.value)}
            >
                <option value="Еда">Еда</option>
                <option value="Транспорт">Транспорт</option>
                <option value="Жилье">Жилье</option>
                <option value="Развлечения">Развлечения</option>
                <option value="Работа">Работа</option>
                <option value="Одежда">Одежда</option>
                <option value="Другое">Другое</option>
            </select>

            <button type="submit" className={styles.button}>
                Добавить
            </button>
        </form>
    );
}
