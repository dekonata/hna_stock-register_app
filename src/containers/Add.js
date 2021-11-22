import React, { useState } from 'react';
import AddStock from './AddStock';
import AddLocation from './AddLocation';
import SuggestBox from '../components/SuggestBox/SuggestBox';


const Add = ({add_list, stock_type_list, supplier_list, make_list, model_list }) => {
	const [addValue, setAddValue] = useState('')
	const [addList] = useState(['Stock', 'Location'])

	const onAddSelect = (input_value) => {
		setAddValue(input_value)
	}

	const returnAddType = (addType) => {
		switch (addType){
			case "Stock":
				return <AddStock 
							stock_type_list={stock_type_list} 
							supplier_list={supplier_list}
							make_list={make_list}
             				model_list={model_list}
             				// onRouteChange={onRouteChange}
             				 />
             case "Location":
             	return <AddLocation/>
			default:
				return <div></div>
		}
	}

	return (
		<div>
			<form className="">
				<SuggestBox 
					label="Add"
					handleInputChange={onAddSelect} 
					suggestlist={addList} />
			</form>
			{returnAddType(addValue)}
		</div>
	);
}

export default Add