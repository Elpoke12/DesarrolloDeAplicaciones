import logo from './logo.svg';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import Header from './Components/Header';
import Body from './Components/Body';
import Footer from './Components/Footer';
import Banner from './Components/Banner';

function App() {
  return (
    <div className="App">
      
      <Header/>
      <Banner texto="26/Octubre/2020"/>
        <Body/>
        <Footer/>
        
    </div>
  );
}

export default App;
