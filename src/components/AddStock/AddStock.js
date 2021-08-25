import React, { useState } from 'react';
import Selector from '../Selector/Selector';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const AddStock = ({stock_type_list, supplier_list}) => {
	const [stockTypeValue, setStockTypeValue] = useState("");
	const [supplierValue, setSupplierValue] = useState("");
	const [startDate, setStartDate] = useState("");

	const returnIfModem = (stockTypeValue) => {
		if (stockTypeValue === 'Modem') {
			return (
				<div>
					<label className="dib w4 pr4 mv2">IMEI: </label>
						<input type="text" name="supplier" /><br/>
				</div>
				)
		}
	}

	return (
		<div className="pt2">
			<form>
				<label className="dib w4 pr4 mv2"> Stock Type: </label>
					<Selector 
						value={stockTypeValue} 
						option_list={stock_type_list} 
						handleInputChange={event => setStockTypeValue(event.target.value)}
						/><br/>
				<label className="dib w4 pr4 mv2"> Date Received: </label>
					<div className="dib">
						<DatePicker selected={startDate} onChange={(date) => setStartDate(date)} /> <br/>
					</div>
				<label htmlFor="add" className="dib w4 pr4 mv2"> Supplier: </label>
					<Selector 
						value={supplierValue} 
						option_list={supplier_list} 
						handleInputChange={event => setSupplierValue(event.target.value)}
						/><br/>
				<label className="dib w4 pr4 mv2">Make: </label>
					<input type="text" name="supplier" /><br/>
				<label className="dib w4 pr4 mv2">Model: </label>
					<input type="text" name="supplier" /><br/>
				<label className="dib w4 pr4 mv2">Serial Number: </label>
					<input type="text" name="supplier" /><br/>
				{returnIfModem(stockTypeValue)}
				{ stockTypeValue  && supplierValue && startDate && <input type="submit" value="Submit" />}
			</form>
		</div>
	)
} 

export default AddStock