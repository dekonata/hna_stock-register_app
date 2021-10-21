import React, {useState} from 'react'

const StockCard = ({stock_type, make, model, serial, location }) => {
	const [changeType, setChangeType] = useState(false);


	return(
		<div>
			<div>
				<span className="dib w4 pr5 mv2">Stock Type:</span>
				<span className="">{stock_type}</span>
				<p onClick={() => setChangeType(true)} className="link dim gray f6 f5-ns dib mr3 mv2 pointer fr" href=''>Change</p>
			</div>
			<div>
				<span className="dib w4 pr5 mv2">Make:</span><span className="">{make}</span>
			</div>
			<div>
				<span className="dib w4 pr5 mv2">Model:</span><span>{model}</span><br/>
			</div>
			<div>
				<span className="dib w4 pr5 mv2">Serial:</span><span>{serial}</span><br/>
			</div>
			<div>
				<span className="dib w4 pr5 mv2">Location:</span><span>{location}</span>
			</div>
		</div>
	)
}

export default StockCard