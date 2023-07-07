import React, {useState} from 'react';
import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faEye, faEyeSlash, faEquals } from '@fortawesome/free-solid-svg-icons'

import {ResponsiveNeoGraph, stabilize, showAll, clearAll, hideAll, updateGraph } from './components/NeoGraph';
import { RangeSlider } from './components/RangeSlider';
import { CSVData } from './components/CSVData';
import {connect, sendMsg} from './api';

const NEO4J_URI = "bolt://localhost:7687"
const NEO4J_USER = "neo4j"
const NEO4J_PASSWORD = "password"

const INFO_PRE_ID = 'infoPreId'
const INFO_ID = 'infoId'

async function onSubmit (title) {
  document.getElementById(INFO_ID).value = title
  console.log("title", title)
  const element = document.getElementById('submitBtn')
  console.log("element", element)
  element.classList.add('is-loading')
}

function handleKeyPress (event) {
  if (event.key === 'ENTER') {
    document.getElementById('submitBtn').click()
  }
}

function resetValues() {
  document.getElementById(INFO_ID).value = ''
  document.getElementById(INFO_PRE_ID).innerHTML = ''
}

function onHideAll() {
  resetValues()
  hideAll()
}

function onClearAll() {
  resetValues()
  clearAll()
}

function send() {
  console.log("hello");
  sendMsg("hello");
}


const App = () => {
  const [input, setInput] = useState('')

  return (
    <div className="App">
      <pre className='bg'/>
        <div className='padding'>
          <input className='input is-link is-medium input-custom' id={INFO_ID} type='text' placeholder='Enter Name' onKeyPress={handleKeyPress}/>
          <button className='button is-medium is-link submit-button' id='submitBtn' onClick={() => onSubmit(input)}> Submit</button>
          <div className='button are-medium align-right'></div>
            <button className='button is-rounded is-dark' onClick={stabilize}>
              <span className='icon'> <i><FontAwesomeIcon icon={faEquals} ></FontAwesomeIcon></i></span>
            </button>
            <button className='button is-rounded is-dark' onClick={showAll}>
              <span className='icon'><i><FontAwesomeIcon icon={faEye} /></i></span>
            </button>
            <button className='button is-rounded is-dark' onClick={onHideAll}>
              <span className='icon'><i><FontAwesomeIcon icon={faEyeSlash} ></FontAwesomeIcon></i></span>
            </button>
            <button className='button is-rounded is-dark' onClick={onClearAll}>
            <span className='icon'><i><FontAwesomeIcon icon={faTrash} ></FontAwesomeIcon></i></span>
            </button>
            {/* <button className='button is-rounded is-blue' onClick={send}>
            <span className='icon'><i><FontAwesomeIcon icon={faTrash} ></FontAwesomeIcon></i></span>
            </button> */}
          </div>
        <pre className='bg'/>
      {/* <RangeSlider/> */}
      <ResponsiveNeoGraph
        containerId={"id0"}
        neo4jUri={NEO4J_URI}
        neo4jUser={NEO4J_USER}
        neo4jPassword={NEO4J_PASSWORD}

        infoPreId={INFO_PRE_ID}
        onSubmitFunction={onSubmit}
      />
      <pre className='padding info bg' id={INFO_PRE_ID}/>

    </div>
  );
}

export default App;
