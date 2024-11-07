import styles from "./Homepage.module.css";
import PageNavBar from "../component/PageNavBar.jsx";
import {Link} from "react-router-dom";
import {useAuth} from "../context/FakeAuthContext.jsx";

export default function Homepage() {

    const{user} = useAuth();

    return (
        <main className={styles.homepage}>
            <PageNavBar/>
            <section>
                <h1>
                    You travel the world.
                    <br/>
                    WorldWise keeps track of your adventures.
                </h1>
                <h2>
                    A world map that tracks your footsteps into every city you can think
                    of. Never forget your wonderful experiences, and show your friends how
                    you have wandered the world.
                </h2>
                <Link
                    to={'/logIn'}
                    className={'cta'}
                >Start tracking now
                </Link>
            </section>
        </main>
    );
}
