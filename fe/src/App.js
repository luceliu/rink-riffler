import './App.css';
import styled from 'styled-components'
import {Listings} from './components'

const HeaderBar = styled.div`
  background: #28B3BC;
  color: white;
  font-size: 12px;
  height: 50px;
  margin: 0;
`

const Title = styled.h1`
position: absolute;
    left: 20px;
    top: 10px;
  margin: 0;
  display: inline-block;
`

function App() {
  return (
    <div className="App">
      <HeaderBar>
        <Title>Rink Riffler</Title>
      </HeaderBar>
      <Listings/>
    </div>
  );
}

export default App;
