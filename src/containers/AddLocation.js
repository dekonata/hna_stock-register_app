import React, { useState} from 'react';
import SuggestBox from '../components/SuggestBox/SuggestBox';
import TextInput from '../components/TextInput/TextInput';

const AddLocation = () => {
		const [locationType, setLocationType] = useState('');
		const [locationID, setLocationID] = useState('');
		const [locationName, setLocationName] = useState('');

const onSubmitAddStock = (event) => {
	console.log(locationType)
	event.preventDefault()
		fetch('http://localhost:3000/addlocation', {
		method: 'post',
		headers: {'Content-Type': 'application/json'},
		body: JSON.stringify({
			location_type: locationType,
			location_id: locationID,
			location_name: locationName
			})
		})
		.then(response => response.json())
		.then(id => alert('Stock location with id ' + id + ' added'))
		.catch(err => console.log(err))
}

return (
	<div>
		<form>
			<SuggestBox 
				label="Location Type:"
				suggestlist= {["Club", "Supplier"]} 
				handleInputChange={(value) => setLocationType(value)}
				/>
			<TextInput
				label="Location ID:"
				handleInputChange={(event) => setLocationID(event.target.value)}
			/>
			<TextInput
				label="Location Name:"
				handleInputChange={(event) => setLocationName(event.target.value)}
			/>
			{ locationType  && locationID && locationName &&
				<input 
					type="submit" 
					value="Submit" 
					onClick={onSubmitAddStock}
					/>
			}
		</form>
	</div>
	)	
}

export default AddLocation