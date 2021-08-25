/* 	General use dropdown selector which takes a list of options to be show in selector
	*/

const Selector = ({ value ,option_list, handleInputChange}) => {
	/*  */
	return (
		<div className="dib w3">
			<select value={value} onChange={handleInputChange}>
				{ option_list.map((item, i) => {
					return <option value={item} key={i}> {item} </option>;
					})
				}	
			</select>
		</div>
	);
}



export default Selector
