import './App.css';
import CommentsComponent from './components/CommentsComponent';
import ScoresComponent from "./components/ScoresComponent";
import Field from "./components/game/Field";

function App() {
  return (
      <div>
          <header className="CommentsComponent">
              <CommentsComponent/>
          </header>
          <header className="ScoresComponent">
              <ScoresComponent/>
          </header>
          <header className="GameFieldComponent">
              <Field/>
          </header>
      </div>
  );
}

export default App;
