import React, {useState, useEffect} from 'react';
import './App.css';
import Navibar from '../components/Navibar/Navibar';
import Add from './Add';
import ViewEdit from './ViewEdit';
import { 
  add_option, 
  stock_type_list, 
  supplier_list, 
  make_list,
  model_list,
  serial_number_list,
  movement_type_list } from '../data/selectionLists'


function App() {
  const [route, setRoute] = useState('')
  const [serialList, setSerialList] = useState('')
  const [locationList, setLocationList] = useState('')

  const onRouteChange = (route) => {
    setRoute(route)
  }

  useEffect(() => {
    // get serial number list from database
    fetch('http://localhost:3000/serial_list', {
      method: 'get'
    })
    .then(response => response.json())
    .then(serial_list => setSerialList(serial_list))
    .catch(err => console.log(err))

    // get location list with location_id and location_name from database
    fetch('http://localhost:3000/locationlist', {
      method: 'get'
    })
    .then(response => response.json())
    .then(locationlist => setLocationList(locationlist))
    .catch(err => console.log(err))

    // Run whenever route changes ensure list is updated on changes
    }, [route])

  return (
    <div>
      <div className="pa2 pa2-ns center-l center-ns mw4 mw6-ns bb">
        <Navibar onRouteChange={onRouteChange}/>
        <div className="pt2 ph1-ns mh1">
          { route === 'add' 
          ? <Add 
              add_list={add_option} 
              stock_type_list={stock_type_list} 
              supplier_list={supplier_list}
              serial_number_list={serial_number_list}
              make_list={make_list}
              model_list={model_list}
              onRouteChange={onRouteChange}
            />
          : route === 'view_edit' 
          ? <ViewEdit 
              serial_list={serialList}
              location_list={locationList}
              movement_type_list={movement_type_list}
            />
          : <div></div>
          }
        </div>
      </div>
    </div>


  );
}

export default App;
