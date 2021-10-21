import React, { useState } from 'react'
import SuggestBox from '../components/SuggestBox/SuggestBox';
import DatePicker from 'react-datepicker';

const MoveStockItem = ({location_list, movement_type_list  }) => {
	const [movementDate, setMovementDate] = useState(new Date())
	const [locationTo, setLocationTo] = useState('')
	const [movementType, setMovementType] = useState('')

	const onMovementSubmit = (event) => {
		
	}


	return(
		<div className="pa2">
			<form>
				<div>
					<label className="dib w4 pr5 mv2"> Movement Date: </label>
						<div className="dib">
							<DatePicker 
								selected={movementDate} 
								onChange={(date) => setMovementDate(date)} /><br/>
						</div>
				</div>
			<SuggestBox 
				label="Locaton To:"
				value={locationTo} 
				suggestlist={location_list}
				handleInputChange={input_value => setLocationTo(input_value)}
				/>
			<SuggestBox 
				label="Movement Type:"
				value={movementType} 
				suggestlist={movement_type_list}
				handleInputChange={input_value => setMovementType(input_value)}
				/>	
			</form>
		</div>
	)
}

export default MoveStockItem