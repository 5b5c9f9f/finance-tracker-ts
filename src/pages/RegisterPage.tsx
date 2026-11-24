import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import styles from "./Auth.module.css";

export function RegisterPage() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const { register } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        if (password.length < 6) {
            setError("Пароль должен содержать минимум 6 символов");
            return;
        }

        const isSuccess = register(name.trim(), email.trim(), password);
        if (isSuccess) {
            navigate("/dashboard"); // Успешная регистрация — переходим в кабинет
        } else {
            setError("Пользователь с таким Email уже зарегистрирован");
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.card}>
                <h1 className={styles.title}>Создать аккаунт</h1>
                <p className={styles.subtitle}>
                    Начните контролировать свои финансы уже сегодня
                </p>

                {error && <div className={styles.error}>{error}</div>}

                <form onSubmit={handleSubmit} className={styles.form}>
                    <div className={styles.field}>
                        <label className={styles.label}>Ваше имя</label>
                        <input
                            type="text"
                            placeholder="Александр"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className={styles.input}
                            required
                        />
                    </div>

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
                            placeholder="Минимум 6 символов"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className={styles.input}
                            required
                        />
                    </div>

                    <button type="submit" className={styles.submitBtn}>
                        Зарегистрироваться
                    </button>
                </form>

                <p className={styles.footerText}>
                    Уже есть аккаунт?{" "}
                    <Link to="/login" className={styles.link}>
                        Войти
                    </Link>
                </p>
            </div>
        </div>
    );
}
