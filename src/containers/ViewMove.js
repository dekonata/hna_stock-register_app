import React, { useState, useEffect } from 'react';
import SuggestBox from '../components/SuggestBox/SuggestBox';
import StockCard from '../components/StockCard/StockCard';
import StockMovementCard from '../components/StockMovementCard/StockMovementCard';


const ViewMove = ({serial_list}) => {
	const [searchValue, setSearchValue] = useState('');
	const [stockitem, setStockItem] = useState('');

    useEffect(() => {
    	// when a search value is selected, fetch the data for that value and assign it to stockitem state
    	searchValue ?
    	fetch('http://localhost:3000/stockitem/' + searchValue, {
		      method: 'get',
	      })
	    .then(response => response.json())
	    .then(stockitemdata => setStockItem(stockitemdata[0]))
	    .then(() => console.log('bang'))
	    .catch(err => console.log(err))
	    : console.log('no')
   	}, [searchValue])

	return (
		<div>
			{console.log(stockitem)}
			<form className="">
				<SuggestBox 
					label="Search"
					suggestlist={serial_list}
					handleInputChange={(input_value) => setSearchValue(input_value)}
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
					<StockMovementCard
						movement_list={['from here to there', 'from here to there', 'from here to there']}

					/>
				</div>
			}
		</div>
	);
}

export default ViewMove