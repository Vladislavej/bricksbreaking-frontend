import React, { useState, useEffect } from 'react';
import './css/App.css';
import Comments from './components/Comments';
import Scores from "./components/Scores";
import Game from "./components/game/Game";
import Login from "./components/Login";
import logoImage from './images/logo.png';
import { CSSTransition } from 'react-transition-group';
import Rating from "./components/Rating";
import RatingForm from "./components/RatingForm";

function App() {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')) || null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [darkMode, setDarkMode] = useState(false);

    useEffect(() => {
        if (user) {
            setIsLoggedIn(true);
        }
    }, [user]);

    const handleLogin = (userData) => {
        setUser(userData);
        setIsLoggedIn(true);
        localStorage.setItem('user', JSON.stringify(userData));
    };

    const handleLogout = () => {
        setUser(null);
        setIsLoggedIn(false);
        localStorage.removeItem('user');
    };

    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
    };

    return (
        <div className={darkMode ? "dark-mode" : ""}>
            <div>
                <header className="logo">
                    <img src={logoImage} alt="Bricks Breaking"/>
                </header>
            </div>
            <header>
                <CSSTransition in={!isLoggedIn} classNames="fade" unmountOnExit>
                    <div>
                        <Login onLogin={handleLogin}/>
                    </div>
                </CSSTransition>
                <CSSTransition in={isLoggedIn} timeout={1000} classNames="fade" unmountOnExit>
                    <div>
                        {isLoggedIn && (
                            <div className="user-info">
                                <div className="welcome-text"><p>Welcome, {user.username}!</p></div>
                                <button onClick={handleLogout}>Logout</button>
                            </div>
                        )}
                    </div>
                </CSSTransition>
                {/*<button onClick={toggleDarkMode}>Toggle Dark Mode</button>*/}
            </header>
            <CSSTransition in={isLoggedIn} timeout={1000} classNames="fade" unmountOnExit>
                <header className="GameComponent">
                    <CSSTransition in={isLoggedIn} timeout={1000} classNames="fade" unmountOnExit>
                        <Game user={user}/>
                    </CSSTransition>
                </header>
            </CSSTransition>
            <CSSTransition in={isLoggedIn} timeout={1000} classNames="fade" unmountOnExit>
                <header>
                    <Rating/>
                    <RatingForm user={user}/>
                    <Comments user={user}/>
                    <Scores/>
                </header>
            </CSSTransition>
            <footer className="footer">
                <p>&copy; Vladislav Močilenko 2024, Technická Univerzita Košice</p>
            </footer>
        </div>
    );
}

export default App;
