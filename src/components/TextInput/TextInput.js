const TextInput = ({label, handleInputChange}) => {
	return (
		<div>
			<label className="dib w4 pr5 mv2"> {label} </label>
			<input type="text" required onChange={handleInputChange}/> 
		</div>
		)
}

export default TextInput