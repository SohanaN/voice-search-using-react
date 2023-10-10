
import './App.css';
import SpeechRecog from './component/SpeechRecog';
import VoiceSearch from './component/VoiceSearch/VoiceSearch';

function App() {
  return (
    <div className="App">
      <VoiceSearch />
      <SpeechRecog />
    </div>
  );
}

export default App;
