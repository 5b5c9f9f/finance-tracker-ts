import { Link } from "react-router-dom";
import { ArrowRight, PieChart, ShieldCheck, Zap } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import styles from "./HomePage.module.css";

export function HomePage() {
    const { user } = useAuth();

    return (
        <main className={styles.page}>
            <section className={styles.hero}>
                <span className={styles.badge}>
                    Умный контроль личного бюджета
                </span>
                <h1 className={styles.heroTitle}>
                    Управляйте финансами просто и наглядно
                </h1>
                <p className={styles.heroSubtitle}>
                    FinFlow помогает учитывать доходы и расходы, анализировать
                    траты по категориям и принимать взвешенные финансовые
                    решения каждый день.
                </p>

                <div className={styles.ctaGroup}>
                    {user ? (
                        <Link to="/dashboard" className={styles.primaryBtn}>
                            Перейти в личный кабинет <ArrowRight size={18} />
                        </Link>
                    ) : (
                        <>
                            <Link to="/register" className={styles.primaryBtn}>
                                Начать бесплатно <ArrowRight size={18} />
                            </Link>
                            <Link to="/login" className={styles.secondaryBtn}>
                                Войти в аккаунт
                            </Link>
                        </>
                    )}
                </div>
            </section>

            <section className={styles.features}>
                <div className={styles.featureCard}>
                    <div className={styles.featureIcon}>
                        <Zap size={24} />
                    </div>
                    <h3 className={styles.featureTitle}>Мгновенный учет</h3>
                    <p className={styles.featureDesc}>
                        Добавляйте доходы и расходы за пару секунд с удобной
                        разбивкой по категориям.
                    </p>
                </div>

                <div className={styles.featureCard}>
                    <div className={styles.featureIcon}>
                        <PieChart size={24} />
                    </div>
                    <h3 className={styles.featureTitle}>Понятная аналитика</h3>
                    <p className={styles.featureDesc}>
                        Наглядные графики и мгновенная фильтрация покажут, куда
                        уходит ваш бюджет.
                    </p>
                </div>

                <div className={styles.featureCard}>
                    <div className={styles.featureIcon}>
                        <ShieldCheck size={24} />
                    </div>
                    <h3 className={styles.featureTitle}>Приватность данных</h3>
                    <p className={styles.featureDesc}>
                        Ваши финансовые операции привязаны к вашему аккаунту и
                        надежно сохраняются.
                    </p>
                </div>
            </section>
        </main>
    );
}
