import React, { useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSuggestLists } from '../components/SuggestBox/suggestBoxSlice'
import { setRoute } from '../components/Navibar/navibarSlice';
import SuggestBox from '../components/SuggestBox/SuggestBox';
import TextInput from '../components/TextInput/TextInput';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const AddStock = ({stock_type_list, supplier_list, make_list, model_list}) => {
	const [stockTypeValue, setStockTypeValue] = useState('');
	const [supplierValue, setSupplierValue] = useState('');
	const [receivedDate, setReceivedDate] = useState(new Date());
	const [makeValue, setMakeValue] = useState('');
	const [modelValue, setModelValue] = useState('');
	const [serialNumberValue, setSerialNumberValue] = useState('')
	const [IMEIValue, setIMEIValue] = useState('')

	const { types, makes, models, conditions } = useSelector(state => state.suggestlists.stocklists)
	const { suppliers } = useSelector(state => state.suggestlists.locationlists)


	const dispatch = useDispatch()

	const onSubmitAddStock = (event) => {
		event.preventDefault()

		// Get only ID value from supplier selected
		const supplierID = supplierValue.split(' ')[0]
		fetch('http://localhost:3000/addstock', {
			method: 'post',
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify({
				stock_item_serial: serialNumberValue.toUpperCase(),
			    stock_type: stockTypeValue,
			    supplier_id: supplierID,
			    make: makeValue,
			    model: modelValue,
			    stock_condition: "NEW",
			    stock_owner: "HNA",
			    movement_type: "purchase",
			    location_to_id: 1000,
			    movement_date: receivedDate,
			    imei: IMEIValue
			})
		})
		.then(response => response.json())
		.then(serial => alert(serial + ' added'))
		.then(() => {
			dispatch(setRoute(''))
			dispatch(fetchSuggestLists())
		})
		.catch(err => console.log(err))
	}

	return (
		<div className="pt2">
			<form>
				<SuggestBox 
					label="Stock Type:"
					suggestlist={types} 
					addNewEnabled={true}
					handleInputChange={input_value => setStockTypeValue(input_value)}
					/>
				<div>
					<label className="dib w4 pr5 mv2"> Date Received: </label>
						<div className="dib">
							<DatePicker 
								selected={receivedDate} 
								onChange={(date) => setReceivedDate(date)} /><br/>
						</div>
				</div>
				<SuggestBox 
					label="Supplier:"
					value={supplierValue} 
					suggestlist={suppliers}
					addNewEnabled={false} 
					handleInputChange={input_value => setSupplierValue(input_value)}
					/>
				<SuggestBox 
					label="Make:"
					value={makeValue} 
					suggestlist={makes} 
					addNewEnabled={true} 
					handleInputChange={input_value => setMakeValue(input_value)}
					/>
				<SuggestBox 
					label="Model:"
					value={modelValue} 
					suggestlist={models} 
					addNewEnabled={true} 
					handleInputChange={input_value => setModelValue(input_value)}
					/>				
				<TextInput
					label="Serial Number:"
					value={serialNumberValue}
					handleInputChange={event => setSerialNumberValue(event.target.value)}
					/>
				{ stockTypeValue === 'Modem' &&
					<TextInput
						label="IMEI"
						value={IMEIValue}
						handleInputChange={event => setIMEIValue(event.target.value)}
						/> 
					}
				{/*Conditionally render submit button only if fields specified have been filled*/}
				{ stockTypeValue  && supplierValue && receivedDate && makeValue && modelValue && serialNumberValue &&
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

export default AddStock