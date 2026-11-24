import type { Transaction } from "../../types/finance";
import styles from "./TransactionList.module.css";

interface TransactionListProps {
    transactions: Transaction[];
    onDeleteTransaction: (id: string) => void;
}

export function TransactionList({
    transactions,
    onDeleteTransaction,
}: TransactionListProps) {
    if (transactions.length === 0) {
        return (
            <p className={styles.empty}>Операций пока нет. Добавьте первую!</p>
        );
    }

    return (
        <div>
            <h2 className={styles.title}>История операций</h2>
            <ul className={styles.list}>
                {transactions.map((item) => (
                    <li key={item.id} className={styles.item}>
                        <div className={styles.info}>
                            <span className={styles.itemTitle}>
                                {item.title}
                            </span>
                            <span className={styles.meta}>
                                {item.category} • {item.date}
                            </span>
                        </div>

                        <div className={styles.actions}>
                            <span
                                className={
                                    item.type === "income"
                                        ? styles.amountIncome
                                        : styles.amountExpense
                                }
                            >
                                {item.type === "income" ? "+" : "-"}
                                {(item.amount ?? 0).toLocaleString()} ₽
                            </span>

                            <button
                                onClick={() => onDeleteTransaction(item.id)}
                                className={styles.deleteBtn}
                            >
                                Удалить
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}
