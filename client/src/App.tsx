import './App.css';
import { Title } from './components/userComponents/Title';
import { User } from './components/User';

function App() {
  return (
    <div>
      <Title title='Phonebook' />
      <User />
    </div>
  );
}

export default App;
