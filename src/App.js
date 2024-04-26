import './App.css';
import Comments from './components/Comments';
import Scores from "./components/Scores";
import Game from "./components/game/Game";
import Login from "./components/Login";
import Register from "./components/Register";

function App() {
  return (
      <div>
          <header className="GameComponent">
              <Game/>
          </header>
          <header className="ScoresComponent">
              <Scores/>
          </header>
          <header className="CommentsComponent">
              <Comments/>
          </header>
          <header className="Login">
              <Login/>
          </header>
          <header className="Register">
              <Register/>
          </header>
      </div>
  );
}

export default App;
