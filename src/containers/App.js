import React, {useState, setState} from 'react';
import './App.css';
import Navibar from '../components/Navibar/Navibar';
import Add from '../components/Add/Add';
import { add_list } from '../data/add_list'
import { stock_type_list } from '../data/stock_type_list'
import { supplier_list } from '../data/selectionLists'


function App() {
  const [route, setRoute] = useState('')

  const onRouteChange = (route) => {
    setRoute(route)
  }

  return (
    <div className="pa2 pa2-ns mw1 mw6-ns center bb">
      <Navibar onRouteChange={onRouteChange}/>
      { route === 'add' 
      ? <Add 
          add_list={add_list} 
          stock_type_list={stock_type_list} 
          supplier_list={supplier_list}/>
      : <div></div>
    }
    </div>


  );
}

export default App;
