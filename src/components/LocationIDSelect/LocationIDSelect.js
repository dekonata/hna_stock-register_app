import { useState, useEffect} from 'react';
import { useSelector } from 'react-redux';
import { fetchSuggestLists } from '../SuggestBox/suggestBoxSlice';
import SuggestBox from '../SuggestBox/SuggestBox';


// Dropdown selector that only lists location ids not currently in use already in database
const LocationIdSelect = ({handleInputChange, location_type}) => {
	const [locationIDList, setLocationIDList] = useState('')

	const existingLocations = useSelector(state => state.suggestlists.locationlists.locations)

	useEffect(() => {

    	// take range of used ids and a range of number and return list of unud ids in that ragne
    	function free_ids_in_range(used_ids, size, startAt = 0) {
    		// Create the array with a range of numbers 
			const id_range = [...Array(size).keys()].map(i => i + startAt);
			// Create array of numbers in range but not in used_id array
			const free_ids = id_range.filter(id => !used_ids.find(used_id => used_id === id));
			return free_ids
    	}

		//Create Array of all location ids already used without location names
		if(Array.isArray(existingLocations)){
			const used_ids = existingLocations.map(location => Number(location.split(' ')[0]))

			switch(location_type) {
				 /* Set suggestlist as array of free ids in range for each location 
				 	type and convert to a string required for use in Suggestbox */
	       		 case 'Club':
	       		 	const free_club_ids = free_ids_in_range(used_ids, 1000).map(id => id.toString());
	       		 	setLocationIDList(free_club_ids)
	       		 	break;
	       		 case 'Supplier':
	       		 	const free_supplier_ids = free_ids_in_range(used_ids, 500, 1500).map(id => id.toString());
	       		 	setLocationIDList(free_supplier_ids)
	       		 	break;
	       		 case 'Albatros Warehouse':
	       		 	const free_warehouse_ids = free_ids_in_range(used_ids, 500, 1000).map(id => id.toString());
	       		 	setLocationIDList(free_warehouse_ids)
	       		 	break;       		 	
	       		 default:
	       		 	setLocationIDList([])
	       		}
       	}
	},[existingLocations, location_type])

	return(
		<div>
			<SuggestBox
				label="Location IDs:"
				suggestlist={locationIDList}
				handleInputChange={handleInputChange}
			/>
		</div>

	)
}

export default LocationIdSelect;