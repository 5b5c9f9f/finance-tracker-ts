import type { Transaction } from '../../types/finance';
import styles from './BalanceCard.module.css';

interface BalanceCardProps {
  transactions: Transaction[];
}

export function BalanceCard({ transactions }: BalanceCardProps) {
  const totals = transactions.reduce(
    (acc, item) => {
      if (item.type === 'income') acc.income += item.amount;
      else acc.expense += item.amount;
      return acc;
    },
    { income: 0, expense: 0 }
  );

  const balance = totals.income - totals.expense;

  return (
    <div className={styles.card}>
      <p className={styles.balanceTitle}>Общий баланс</p>
      <h2 className={styles.balanceAmount}>{balance.toLocaleString()} ₽</h2>
      
      <div className={styles.summary}>
        <p className={styles.income}>Доходы: +{totals.income.toLocaleString()} ₽</p>
        <p className={styles.expense}>Расходы: -{totals.expense.toLocaleString()} ₽</p>
      </div>
    </div>
  );
}
