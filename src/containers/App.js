import React, {useEffect} from 'react';
import './App.css';
import { useSelector, useDispatch } from 'react-redux';
import { fetchSuggestLists } from '../components/SuggestBox/suggestBoxSlice'
import Navibar from '../components/Navibar/Navibar';
import Add from './Add';
import ViewEdit from './ViewEdit';
import  MovementPDF  from '../components/MovementPDF/MovementPDF';
import { PDFDownloadLink } from '@react-pdf/renderer';
import { 
  add_option, 
  movement_type_list } from '../data/selectionLists';


function App() {
  const dispatch = useDispatch()

  const route = useSelector(state => state.route.value)


  useEffect(() => {
    // Set Suggestbox list states from database
    dispatch(fetchSuggestLists())
    }, [dispatch])


  const returnRoute = () => {
    switch(route) {
        case 'add':
            return (
              <Add 
                  add_list={add_option} 
                />
            );
        case 'view_edit':
            return (
                <ViewEdit 
                    movement_type_list={movement_type_list}
                />
            );
        case 'reports':
            return (
                <MovementPDF/>
            )
        default:
            return(
                <div>CHOOSE</div>
            )
    }
  }

  return (
    <div>
      <div className="pa2 pa2-ns center-l center-ns mw4 mw6-ns bb">
        <Navibar />
        <div className="pt2 ph1-ns mh1">
          { 
            returnRoute()
          }
        </div>
      </div>
    </div>


  );
}

export default App;
