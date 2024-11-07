import {useEffect, useState} from "react";
import styles from "./Login.module.css";
import PageNavBar from "../component/PageNavBar.jsx";
import {useAuth} from "../context/FakeAuthContext.jsx";
import {useNavigate} from "react-router-dom";
import Button from "../component/Button.jsx";

export default function Login() {

    const [email, setEmail] = useState("sinabalar666@gmail.com");
    const [password, setPassword] = useState("123456789");
    const {logIn, isAuthenticated} = useAuth();
    const navigate = useNavigate();


    useEffect(() => {
        if (isAuthenticated === true) {
            navigate('/app',{replace:true});
        }
    }, [isAuthenticated, navigate]);

    function handleSubmit(e) {
        e.preventDefault()
        if (email && password){
            logIn(email,password)
        }
    }


    return (
        <main className={styles.login}>
            <PageNavBar/>
            <form
                className={styles.form}
            onSubmit={handleSubmit}>
                <div className={styles.row}>
                    <label htmlFor="email">Email address</label>
                    <input
                        type="email"
                        id="email"
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                    />
                </div>

                <div className={styles.row}>
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                    />
                </div>

                <div>
                    <Button
                        type={'primary'}
                    >Login
                    </Button>
                </div>
            </form>
        </main>
    );
}
