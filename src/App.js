import './App.css';
import CommentsComponent from './components/CommentsComponent';
import ScoresComponent from "./components/ScoresComponent";
import Game from "./components/game/Game";

function App() {
  return (
      <div>
          <header className="GameComponent">
              <Game/>
          </header>
          <header className="ScoresComponent">
              <ScoresComponent/>
          </header>
          <header className="CommentsComponent">
              <CommentsComponent/>
          </header>
      </div>
  );
}

export default App;
