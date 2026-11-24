import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import styles from "./Auth.module.css";

export function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        const isSuccess = login(email.trim(), password);
        if (isSuccess) {
            navigate("/dashboard");
        } else {
            setError("Неверный email или пароль");
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.card}>
                <h1 className={styles.title}>С возвращением!</h1>
                <p className={styles.subtitle}>
                    Войдите в свой аккаунт FinFlow
                </p>

                {error && <div className={styles.error}>{error}</div>}

                <form onSubmit={handleSubmit} className={styles.form}>
                    <div className={styles.field}>
                        <label className={styles.label}>Email</label>
                        <input
                            type="email"
                            placeholder="alex@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className={styles.input}
                            required
                        />
                    </div>

                    <div className={styles.field}>
                        <label className={styles.label}>Пароль</label>
                        <input
                            type="password"
                            placeholder="Введите пароль"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className={styles.input}
                            required
                        />
                    </div>

                    <button type="submit" className={styles.submitBtn}>
                        Войти в кабинет
                    </button>
                </form>

                <p className={styles.footerText}>
                    Впервые у нас?{" "}
                    <Link to="/register" className={styles.link}>
                        Создать аккаунт
                    </Link>
                </p>
            </div>
        </div>
    );
}
