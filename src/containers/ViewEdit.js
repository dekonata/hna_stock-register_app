import React, { useState, useEffect } from 'react';
import SuggestBox from '../components/SuggestBox/SuggestBox';
import StockCard from '../components/StockCard/StockCard';
import StockMovementTable from '../components/StockMovementTable/StockMovementTable';
import DatePicker from "react-datepicker";


const ViewEdit= ({serial_list, location_list, movement_type_list}) => {
	const [searchValue, setSearchValue] = useState('');
	const [stockitem, setStockItem] = useState('');
	const [itemMovements, setItemMovements] = useState([])
	const [moveOpen, setMoveOpen] = useState(false)
	const [newLocation, setNewLocation] = useState('')
	const [movementDate, setMovementDate] = useState(new Date())
	const [movementType, setMovementType] = useState('')
	const [moveToLocationsList, setMoveToLocationList] = useState([])
	const [update, setUpdate] = useState(0)

    useEffect(() => {
    	// when a search value is selected, fetch the data for that value and assign it to stockitem state
    	if(searchValue) {
    		// Get stock item details
	    	fetch('http://localhost:3000/stockitem/' + searchValue, {
			      method: 'get',
		      })
		    .then(response => response.json())
		    .then(stockitemdata => setStockItem(stockitemdata[0]))
		    .catch(err => console.log(err))
		    
		    // Get stock item movement list
		    fetch('http://localhost:3000/stockmovements/' + searchValue, {
			      method: 'get',
		      })
		    .then(response => response.json())
		    .then(movements => setItemMovements(movements))
		    .catch(err => console.log(err));
	    }
   	}, [searchValue, moveOpen, update])

   	const onSearchSelect = (selected) => {
   		setSearchValue(selected)
   		setMoveOpen(false)

   	}

   	const toggleMoveOpen = () => {
   		setMoveOpen(true)
   		// remove current location from Move To suggestbox list
   		const move_location_list = location_list.filter(location => location !== `${stockitem.location_to_id} ${stockitem.location_name}`)
   		setMoveToLocationList(move_location_list)
   	}



   	const onSubmitMovement = (event) => {
   		// Extract location id for database entry
   		event.preventDefault()
   		const location_id = newLocation.split(' ')[0]
   		fetch('http://localhost:3000/movestock', {
			method: 'post',
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify({
			    movement_type: movementType,
			    stock_item_serial: searchValue,
			    location_to_id: location_id,
			    movement_date: movementDate
   				})
		})
		.then(response => response.json())
		.then(movement_id => alert('Movement with id ' + movement_id + ' added'))
		// Wait 1 second for database update to be completed, 
		// then increase update state value by 1 to trigger useState and update values
		.then(setTimeout(() =>  {
				setUpdate(update + 1)
				}, 1000))
		.catch(err => console.log(err))

		// setMoveOpen(false)
	}

	return (
		<div>
			{console.log(itemMovements)}
			<form className="">
				<SuggestBox 
					label="Search"
					suggestlist={serial_list}
					handleInputChange={onSearchSelect}
				/>
			</form>
			{stockitem &&
				<div>
					<StockCard
						stock_type={stockitem.stock_type}
						model={stockitem.model}
						make={stockitem.make}
						serial={stockitem.stock_item_serial}
						condition={stockitem.stock_condition}
						owner={stockitem.stock_owner}
						location={`${stockitem.location_to_id} ${stockitem.location_name}`}
					/>
					{moveOpen 
					?	
					<form className='bg-light-silver'>
						<SuggestBox 
							label="Move To"
							suggestlist={moveToLocationsList}
							handleInputChange={selected => setNewLocation(selected)}
						/>
						<label className="dib w4 pr5 mv2"> Movement Date: </label>
							<div className="dib">
								<DatePicker 
									selected={movementDate} 
									onChange={(date) => setMovementDate(date)} /><br/>
							</div>
						<SuggestBox 
							label="Movement Type"
							suggestlist={movement_type_list}
							handleInputChange={selected => setMovementType(selected)}
						/>
						<input
							type='submit'
							value='Capture'
							onClick={onSubmitMovement}
						/>
					</form>
					: 
					<button 
						onClick={toggleMoveOpen}
						>Capure Stock Movement</button>
					}
					<StockMovementTable
						movement_list={itemMovements}
					/>
				</div>
			}
			<button onClick={() => setUpdate(update + 1)}></button>
		</div>
	);
}

export default ViewEdit