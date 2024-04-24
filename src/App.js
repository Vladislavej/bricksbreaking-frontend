import './App.css';
import CommentsComponent from './components/CommentsComponent';
import ScoresComponent from "./components/ScoresComponent";

function App() {
  return (
      <div>
          <header className="CommentsComponent">
              <CommentsComponent/>
          </header>
          <header className="ScoresComponent">
              <ScoresComponent/>
          </header>
      </div>
  );
}

export default App;
