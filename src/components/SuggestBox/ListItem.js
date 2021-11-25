import { useRef, useEffect } from 'react';

const ListItem = ({ value, focus, index, setFocus, handleSelect }) => {
	const itemRef = useRef(null);

	useEffect(() => {
		if (focus) {
			// Focus on this element if its index is equal to focus value as set in paramaters 
			itemRef.current.focus();
		}
	}, [focus]);

	const handleKeyPres = (event) => {
		if (event.key === "Enter") {
			handleSelect(event)
		}
	};

	return(
 		<li 
 			// set value as index to set focus on this element when selected using handleselect
 			value={index}
	 		className="hover-bg-gray pointer" 
	 		tabIndex={focus ? 0 : -1}
	 		ref={itemRef}
	 		onClick={handleSelect}
	 		onKeyPress={handleKeyPres}
 		>{value}</li>
	)
}

export default ListItem