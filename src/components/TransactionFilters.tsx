import styles from "./TransactionFilters.module.css";

export type FilterType = "all" | "income" | "expense";

interface TransactionFiltersProps {
    currentFilter: FilterType;
    onFilterChange: (filter: FilterType) => void;
    searchQuery: string;
    onSearchChange: (query: string) => void;
}

export function TransactionFilters({
    currentFilter,
    onFilterChange,
    searchQuery,
    onSearchChange,
}: TransactionFiltersProps) {
    return (
        <div className={styles.filters}>
            <button
                type="button"
                className={`${styles.tab} ${currentFilter === "all" ? styles.activeTab : ""}`}
                onClick={() => onFilterChange("all")}
            >
                Все
            </button>

            <button
                type="button"
                className={`${styles.tab} ${currentFilter === "income" ? styles.activeTab : ""}`}
                onClick={() => onFilterChange("income")}
            >
                Доходы
            </button>

            <button
                type="button"
                className={`${styles.tab} ${currentFilter === "expense" ? styles.activeTab : ""}`}
                onClick={() => onFilterChange("expense")}
            >
                Расходы
            </button>

            <input
                type="text"
                placeholder="Поиск"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className={styles.searchInput}
            />
        </div>
    );
}
