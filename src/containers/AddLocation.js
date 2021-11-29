import React, { useState} from 'react';
import SuggestBox from '../components/SuggestBox/SuggestBox';
import TextInput from '../components/TextInput/TextInput';

const AddLocation = () => {
	const [locationType, setLocationType] = useState('');
	const [locationID, setLocationID] = useState('');
	const [locationName, setLocationName] = useState('');

	const onSubmitAddLocation = (event) => {
	event.preventDefault()

	const postAddLocation= async () => {
		try {
			const url = 'http://localhost:3000/addlocation'
			const config = {
				method: 'post',
				headers: {'Content-Type': 'application/json'},
				body: JSON.stringify({
					location_type: locationType,
					location_id: locationID,
					location_name: locationName
				})
			} 
			const response = await fetch(url, config);
			const json_response =  await response.json()
			console.log(json_response)
			if(!response.ok) {
				throw new Error(json_response.code)
			} 
			alert(`Location with location id ${json_response} has been added`)
		} catch (errcode) {
			console.log(errcode)
			if (errcode.message === '23505') {
				alert('Another location has already been assigned this name or Location ID. Enter a different Location ID and/or name')
			}
			console.log('POST submit add stock failed with error: ', errcode)
		}
	}

	postAddLocation()
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
					onClick={onSubmitAddLocation}
					/>
			}
		</form>
	</div>
	)	
}

export default AddLocation