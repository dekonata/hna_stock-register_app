import React, { useState } from 'react';
import AddStock from '../AddStock/AddStock';
import Selector from '../Selector/Selector';


const Add = ({add_list, stock_type_list, supplier_list}) => {
	const [addValue, setAddValue] = useState('')

	const onAddSelect = (event) => {
		setAddValue(event.target.value)
	}

	const returnAddType = (addType) => {
		switch (addType){
			case "Stock":
				return <AddStock 
							stock_type_list={stock_type_list} 
							supplier_list={supplier_list} />
				default:
					return <div>Under Development</div>
		}
	}

	return (
		<div className="mw1 mw6-ns center pt2 ph1-ns mh1">
			<form className="">
				<label htmlFor="add" className="dib w4 pr4"> Add: </label>
				<Selector value={addValue} handleInputChange={onAddSelect} option_list={add_list} />
			</form>
			{returnAddType(addValue)}
		</div>
	);
}

export default Add