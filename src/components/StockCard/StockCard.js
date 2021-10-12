import React from 'react'

const StockCard = ({stock_type, make, model, serial, location }) => {


	return(
		<div>
			<div>
				<span className="dib w4 pr5 mv2">Stock Type:</span><span>{stock_type}</span><br/>
				<span className="dib w4 pr5 mv2">Make:</span><span>{make}</span><br/>
				<span className="dib w4 pr5 mv2">Model:</span><span>{model}</span><br/>
				<span className="dib w4 pr5 mv2">Serial:</span><span>{serial}</span><br/>
				<span className="dib w4 pr5 mv2">Location:</span><span>{location}</span>
			</div>
		</div>
	)
}

export default StockCard