import React from 'react';
import { useState, useEffect } from 'react';
import logo from '../../assets/img/logo.svg';
import Greetings from '../../containers/Greetings/Greetings';
import './Popup.css';
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { Container } from '../../containers/Container'

const Popup = (props) => {

  const [tabAndGroupList, setTabAndGroupList] = useState([]);

  useEffect(() => {
    setTabAndGroupList(props.tabAndGroupList);
    console.log(props);
  }, [props.tabAndGroupList]);

  return (
    <div className="App">
      <header className="App-header">
      <DndProvider backend={HTML5Backend}>
        <Container tabAndGroupList={tabAndGroupList} />
      </DndProvider>
      </header>
    </div>
  );
};

export default Popup;
