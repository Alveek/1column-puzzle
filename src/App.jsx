import Puzzle from './Puzzle';
import './App.css';

export default function App() {
  return (
    <div className='App'>
      <h1 className='App__title'>1column puzzle</h1>
      <Puzzle />
      <footer className='App__footer'>
        <p>
          Made by{' '}
          <a
            className='App__link'
            href='https://github.com/Alveek'
            target='_blank'>
            Alveek
          </a>
        </p>
      </footer>
    </div>
  );
}
