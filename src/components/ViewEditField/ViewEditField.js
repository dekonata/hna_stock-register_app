import React, { useState, useEffect } from 'react'

import SuggestBox from '../SuggestBox/SuggestBox';

const ViewEditField = ({serial, suggestlist, label, value, data_field}) => {
	const [ editOpen, setEditOpen ] = useState(false)
	const [ editValue, setEditValue ] = useState('')

	// Close edit if different stock item is selected
	useEffect(() => {
		setEditOpen(false)
	}, [serial])

	const onSubmitEdit = (event) => {
		event.preventDefault();
		if (!editValue) {
			alert(`Select a new ${label}  value.`);
		} else {
			const putEditField = async () => {
				try {
				const url = 'http://localhost:3000/editstockitem';
				const config = {
					method: 'put',
					headers: {'Content-Type': 'application/json'},
					body: JSON.stringify({
						stock_item_serial: serial,
						update_hash: {
						[data_field]: editValue	
						}
					})
				};

				const response = await fetch(url, config);
				const json_response =  await response.json();

				if(!response.ok) {
					throw new Error(json_response.code);
				} 
				} catch(err) {
					console.log(err);
				}
			}

			putEditField();
			setEditOpen(false);
		}
	}

	return(
		<div>
		{ !editOpen 
			?
			<div>
				<span className="dib w4 pr5 mv2">{label}</span>
				<span className="dib w-40">{value}</span>
				<button className="link dim gray f6 f5-ns mr3 mv2 pointer" href=''
					value='stock_type'
					onClick={() => setEditOpen(true)}>
						Edit
				</button>
			</div>
			:
			<div>
				<form className="bg-light-silver">
					<SuggestBox 
						initial_input={value}
						label={label}
						suggestlist={suggestlist} 
						addNewEnabled={true}
						handleInputChange={input_value => setEditValue(input_value)}
						/>
						<input
							className="mr2"
							type='submit'
							value='Submit Edit'
							id='test'
							onClick={event => onSubmitEdit(event)}
						/>
						<input
							type='submit'
							value='Cancel Edit'
							onClick={() => setEditOpen(false)}
						/>
				</form>
			</div>
		}
		</div>
	)
}

export default ViewEditField