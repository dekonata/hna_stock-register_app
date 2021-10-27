import { useState, useRef, useLayoutEffect } from 'react';


const SuggestBox = ({label, suggestlist, handleInputChange}) => {
	const [suggestOpen, setSuggestOpen] = useState(false)
	const [filteredList, setFilteredList] = useState(suggestlist);
	const [inputValue, setInputValue] = useState('')

	const inputEl = useRef(null)

	useLayoutEffect(() => {
		// Add Event listener to body to close suggestbox when clicked
		const onBodyClick = event => {
			if(inputEl.current.contains(event.target)) {
				return
			} else {
				setSuggestOpen(false)
			}
		}
		document.body.addEventListener("click", onBodyClick)
		// Cleanup = Remove event listener 
		return () => {
			document.body.removeEventListener("click", onBodyClick)
		}
	}, [])

	const toggleSuggest = (event) => {
		setSuggestOpen(!suggestOpen)
	}

	const handleInput = (event) => {
		setInputValue(event.target.value)
		// handleInputChange(event.target.value); 
		setSuggestOpen(true)
		event.target.value ?
			setFilteredList(suggestlist.filter(serial => {
			return serial.toLowerCase().includes(event.target.value.toLowerCase());
			}))
		:
		setFilteredList(suggestlist);
	}

	const handleSelect = (event) => {
		setInputValue(event.target.innerHTML);
		handleInputChange(event.target.innerHTML);
		setFilteredList(suggestlist);
		setSuggestOpen(false);
		}

	const handleKeyPress = (key) => {
		// Incomplete
		if(key.key === 'ArrowDown') {
			setSuggestOpen(true);}
	}

	return (
	<div ref={inputEl}>
		{ Array.isArray(suggestlist) ?
			<div>
				<label className="dib w4 pr5 mv2">{label} </label>
				<div className="dib" >
					<input 
						className="pr5"
						type='text'
						autoComplete='off'
						value={inputValue}
						onChange={handleInput}
						onClick={toggleSuggest}
						onKeyDown={handleKeyPress}
						/>
					{suggestOpen ?
						<div className="">
						 	<ul className="absolute bg-white list pl0 ml0 mt0 pr1 center ba overflow z-max">
							 	{filteredList.slice(0,10).map((item, i) => {
							 		return(
							 		<li 
							 		className="hover-bg-gray pointer" 
							 		key={i}
							 		value={item}
							 		tabIndex={0}
							 		onKeyDown={key => console.log(key.key)}
							 		onClick={(handleSelect)}
							 		>{item}</li>)
							 	})}
							</ul>
						</div>
					:
					<div></div>}
				</div>
			</div>
			:
			<div>Suggestlist not in correct Format</div>
		}
	</div>
	)
}


export default SuggestBox;