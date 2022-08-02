import React from 'react';
import {BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom';
import './App.css';

import {useReadCypher, useWriteCypher} from 'use-neo4j'
import {Menu} from 'semantic-ui-react';
import Home from './views/Home';
import Person from './views/Person';
import { NeoGraph, ResponsiveNeoGraph } from './components/NeoGraph';

// const Person = ({match}) => {
//   return <div>Person {match.params.id} </div>
// }

const NEO4J_URI = "bolt://localhost:7687"
const NEO4J_USER = "neo4j"
const NEO4J_PASSWORD = "password"

const App = () => {


  return (
    <div className="App">
      <ResponsiveNeoGraph
        containerId={"id0"}
        neo4jUri={NEO4J_URI}
        neo4jUser={NEO4J_USER}
        neo4jPassword={NEO4J_PASSWORD}
      />
      <NeoGraph
        width={400}
        height={300}
        containerId={"id1"}
        neo4jUri={NEO4J_URI}
        neo4jUser={NEO4J_USER}
        neo4jPassword={NEO4J_PASSWORD}
        backgroundColor={"#b2beb5"}
      />
      {/* <Router>
        <Menu>
          <Menu.Item as={Link} to="/"> Sumerian Prospological</Menu.Item>
        </Menu>

        <Routes>
          <Route exact path="/" element={<Home/>}/>
          <Route exact path="/person/:id" element={<Person/>}/>
        </Routes>
      // </Router> */}
    </div>
  );
}

export default App;
