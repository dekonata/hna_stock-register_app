import React from 'react'
import { useSelector } from 'react-redux'
import ViewEditField from '../ViewEditField/ViewEditField'

const StockCard = ({stock_type, make, model, condition, owner, serial, location }) => {
	const { types, makes, models, conditions } = useSelector(state => state.suggestlists.stocklists)

	return(
		<div>
			<ViewEditField
				serial={serial}
				suggestlist={types}
				label= 'Stock Type'
				value={stock_type}
				data_field='stock_type'
				/>
			<ViewEditField
				serial={serial}
				suggestlist={makes}
				label= 'Make:'
				value={make}
				data_field='make'
				/>
			<ViewEditField
				serial={serial}
				suggestlist={models}
				label= 'Model:'
				value={model}
				data_field='model'
				/>
			<ViewEditField
				serial={serial}
				suggestlist={conditions}
				label= 'Condition:'
				value={condition}
				data_field='stock_condition'
				/>
			<span className="dib w4 pr5 mv2">Serial:</span><span>{serial}</span><br/>
			<div>
				<span className="dib w4 pr5 mv2">Location:</span><span>{location}</span>
			</div>
		</div>
	)
}

export default StockCard