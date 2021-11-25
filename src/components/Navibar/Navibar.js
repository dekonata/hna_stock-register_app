import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setRoute } from './navibarSlice';

const Navibar = ({onRouteChange}) => {
	const dispatch = useDispatch();
	const route = useSelector(state => state.route.value);

	return (
		<nav className="pa2 pa2-ns mw1 mw6-ns center bb">
		    <h1 className="tc">
        		HNA Stock Manager
      		</h1>
		  <div className="tc pb1">
		    <p onClick={() => dispatch(setRoute('add'))} className={`link dim gray f6 f5-ns dib mr3 pointer ${route === 'add' ? 'b' : ''}`}>Add</p>
		    <p onClick={() => dispatch(setRoute('view_edit'))} className={`link dim gray f6 f5-ns dib mr3 pointer ${route === 'view_edit' ? 'b' : ''}`}>View/Edit</p>
		    <p onClick={() => dispatch(setRoute('reports'))} className={`link dim gray f6 f5-ns dib mr3 pointer ${route === 'reports' ? 'b' : ''}`}>Reports</p>
		  </div>
		</nav>
	);
}

export default Navibar