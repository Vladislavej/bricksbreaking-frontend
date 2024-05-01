import React, { useState, useEffect } from 'react';
import './css/App.css';
import Comments from './components/Comments';
import Scores from "./components/Scores";
import Game from "./components/game/Game";
import Login from "./components/Login";
import Register from "./components/Register";
import Help from "./components/game/Help";
import CommentForm from "./components/CommentForm";

function App() {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')) || null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

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

    return (
        <div>
            <header>
                {!isLoggedIn && <Login onLogin={handleLogin} />}
                {!isLoggedIn && <Register />}
                {isLoggedIn && (
                    <div>
                        <p>Welcome, {user.username}!</p>
                        <button onClick={handleLogout}>Logout</button>
                    </div>
                )}
            </header>
            {isLoggedIn && (
                <>
                    <header className="GameComponent">
                        <Game user={user} />
                        <Help />
                    </header>
                    <header className="ScoresComponent">
                        <Scores />
                    </header>
                    <header className="CommentsComponent">
                        <Comments />
                        <CommentForm user={user} />
                    </header>
                </>
            )}
        </div>
    );
}

export default App;
