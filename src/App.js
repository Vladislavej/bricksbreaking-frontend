import React, { useState } from 'react';
import './css/App.css';
import Comments from './components/Comments';
import Scores from "./components/Scores";
import Game from "./components/game/Game";
import Login from "./components/Login";
import Register from "./components/Register";
import Help from "./components/game/Help";
import CommentForm from "./components/CommentForm";
import Rating from "./components/Rating";
function App() {
    const [user, setUser] = useState(null);

    const handleLogin = (userData) => {
        setUser(userData);
        console.log(userData)
    };

    const handleLogout = () => {
        setUser(null);
        console.log("Logout successful");
    };

    return (
        <div>
            <header className="Login">
                {!user && <Login user={user} onLogin={handleLogin} onLogout={handleLogout}/>}
                {!user && <Register/>}
                {user && (
                    <div>
                        <p>Welcome, {user.username}!</p>
                        <button onClick={handleLogout}>Logout</button>
                    </div>
                )}
            </header>
            <header className="GameComponent">
                <Game user={user}/>
            </header>
            <header className="ScoresComponent">
                <Scores/>
            </header>
            <header className="CommentsComponent">
                <Comments/>
                {user && (
                    <CommentForm user={user && user.username}/>
                )}
            </header>
        </div>
    );
}

export default App;