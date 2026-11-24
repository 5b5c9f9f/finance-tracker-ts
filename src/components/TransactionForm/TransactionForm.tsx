import { useState } from "react";
import type { Transaction, TransactionType } from "../../types/finance";
import styles from "./TransactionForm.module.css";

interface TransactionFormProps {
    onAddTransaction: (newTransaction: Transaction) => void;
}

export function TransactionForm({ onAddTransaction }: TransactionFormProps) {
    const [title, setTitle] = useState("");
    const [amount, setAmount] = useState("");
    const [type, setType] = useState<TransactionType>("expense");
    const [category, setCategory] = useState("Еда");

    const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        if (/^\d*\.?\d*$/.test(value)) {
            setAmount(value);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const numericAmount = Number(amount);

        if (
            !title.trim() ||
            !Number.isFinite(numericAmount) ||
            numericAmount <= 0
        ) {
            return;
        }

        const newTransaction: Transaction = {
            id: Date.now().toString(),
            title: title.trim(),
            amount: numericAmount,
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
                type="text"
                placeholder="Название"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className={styles.input}
                required
            />

            <input
                type="text"
                inputMode="decimal"
                placeholder="Сумма"
                value={amount}
                onChange={handleAmountChange}
                className={styles.input}
                required
            />

            <select
                value={type}
                onChange={(e) => setType(e.target.value as TransactionType)}
                className={styles.select}
            >
                <option value="expense">Расход</option>
                <option value="income">Доход</option>
            </select>

            <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className={styles.select}
            >
                <option value="Еда">Еда</option>
                <option value="Транспорт">Транспорт</option>
                <option value="Жилье">Жилье</option>
                <option value="Развлечения">Развлечения</option>
                <option value="Работа">Работа</option>
                <option value="Другое">Другое</option>
            </select>

            <button type="submit" className={styles.button}>
                Добавить
            </button>
        </form>
    );
}
