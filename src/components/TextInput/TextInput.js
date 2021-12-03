const TextInput = ({label, handleInputChange}) => {
	return (
		<div>
			<label className="dib w4 pr5 mv2"> {label} </label>
			<div className="dib">
				<input 
					title=""
					type="text" 
					required 
					onChange={handleInputChange}/> 
			</div>
		</div>
		)
}

export default TextInput