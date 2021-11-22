import React, { useState} from 'react';
import SuggestBox from '../components/SuggestBox/SuggestBox';
import TextInput from '../components/TextInput/TextInput';

const AddLocation = () => {
	const [locationType, setLocationType] = useState('');
	const [locationID, setLocationID] = useState('');
	const [locationName, setLocationName] = useState('');

	const onSubmitAddStock = (event) => {
	event.preventDefault()

	const postAddStock = async () => {
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
			const json =  await response.json()
			if(!response.ok) {
				throw new Error(json.code)
			} 
			alert(json)
		} catch (errcode) {
			console.log(errcode)
			if (errcode.message === '23505') {
				alert('Another location has already been assigned this Location ID. Enter a different Location ID')
			}
			console.log('POST submit add stock failed with error: ' + errcode)
		}
	}

	postAddStock()
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