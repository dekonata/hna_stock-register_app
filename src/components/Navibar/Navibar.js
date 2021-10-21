import React from 'react'

const Navibar = ({onRouteChange}) => {
	return (
		<nav className="pa2 pa2-ns mw1 mw6-ns center bb">
		    <h1 className="tc">
        		HNA Stock Manager
      		</h1>
		  <div className="tc pb1">
		    <p onClick={() => onRouteChange('add')} className="link dim gray f6 f5-ns dib mr3 pointer">Add</p>
		    <p onClick={() => onRouteChange('view_edit')} className="link dim gray f6 f5-ns dib mr2 pointer">View/Edit</p>
		    <p onClick={() => onRouteChange('reports')} className="link dim gray f6 f5-ns dib mr2 pointer">Reports</p>
		  </div>
		</nav>
	);
}

export default Navibar