import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    ResponsiveContainer,
    Legend,
} from "recharts";
import type { Transaction } from "../types/finance";
import styles from "./CategoryChart.module.css";

interface CategoryChartProps {
    transactions: Transaction[];
}

interface ChartDataItem {
    name: string;
    value: number;
}

// Палитра цветов для секторов диаграммы
const COLORS = [
    "#2563eb",
    "#16a34a",
    "#f59e0b",
    "#dc2626",
    "#8b5cf6",
    "#06b6d4",
];

export function CategoryChart({ transactions }: CategoryChartProps) {
    // 1. Берем только расходы и группируем суммы по категориям
    const expenseData: ChartDataItem[] = transactions
        .filter((item) => item.type === "expense")
        .reduce<ChartDataItem[]>((acc, item) => {
            const existingCategory = acc.find(
                (entry) => entry.name === item.category,
            );
            if (existingCategory) {
                existingCategory.value += item.amount;
            } else {
                acc.push({ name: item.category, value: item.amount });
            }
            return acc;
        }, []);

    return (
        <div className={styles.card}>
            <h3 className={styles.title}>Структура расходов по категориям</h3>

            {expenseData.length === 0 ? (
                <p className={styles.empty}>
                    Добавьте хотя бы один расход, чтобы увидеть график
                </p>
            ) : (
                <div className={styles.chartWrapper}>
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={expenseData}
                                dataKey="value"
                                nameKey="name"
                                cx="50%"
                                cy="50%"
                                innerRadius={60}
                                outerRadius={95}
                                paddingAngle={4}
                            >
                                {expenseData.map((_, index) => (
                                    <Cell
                                        key={`cell-${index}`}
                                        fill={COLORS[index % COLORS.length]}
                                    />
                                ))}
                            </Pie>
                            <Tooltip
                                formatter={(value) =>
                                    `${Number(value ?? 0).toLocaleString()} ₽`
                                }
                            />
                            <Legend />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            )}
        </div>
    );
}
