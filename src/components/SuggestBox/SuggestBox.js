import { useState, useRef, useLayoutEffect, useEffect } from 'react';
import useRoveFocus from "./useRoveFocus";
import ListItem from "./ListItem"


const SuggestBox = ({initial_input ,label, suggestlist, addNewEnabled, handleInputChange}) => {
	const [suggestOpen, setSuggestOpen] = useState(false)
	const [filteredList, setFilteredList] = useState([]);
	useEffect(() => {
    // Set filteredList value to first 10 values of suggestlist provided
    	if (Array.isArray(suggestlist)) {
    		const shortlist = suggestlist.slice(0,10)
    		setFilteredList(shortlist)
    	}
    }, [suggestlist]);

	const [inputValue, setInputValue] = useState('')
	useEffect(() => {
    // If initial_input is provides, set inputValue
    	if (initial_input) {
    		setInputValue(initial_input)
    	}
    }, [initial_input]);

	// Set/Change list item focus using arrow keys or during events
	const [focus, setFocus] = useRoveFocus(filteredList.length)

	useEffect(() => {
    // Set filteredList value to first 10 values of suggestlist provided
    	if (Array.isArray(suggestlist)) {
    		const shortlist = suggestlist.slice(0,10)
    		setFilteredList(shortlist)
    	}
    }, [suggestlist]);

    // Ref added to input to enable closing suggestbox when user clicks outside this div
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
		if(suggestOpen) {
			setSuggestOpen(false)
			setFocus(-1)
		} else {
			setSuggestOpen(true)
			setFocus(-1)
		}
	}

	const handleInput = (event) => {
		setInputValue(event.target.value)
		handleInputChange(''); 
		setSuggestOpen(true)
		if (event.target.value) {
			const filtered = suggestlist.filter(serial => {
				return serial.toLowerCase().includes(event.target.value.toLowerCase());
			});
			setFilteredList(filtered.slice(0,10))
		} else {
			setFilteredList(suggestlist.slice(0,10));
		}
	}

	const handleSelect = (event) => {
		setInputValue(event.target.innerHTML);
		handleInputChange(event.target.innerHTML);
		setFilteredList(suggestlist.slice(0,10));
		setSuggestOpen(false);
		setFocus(event.target.value)
		}

	const handleAddNew = event => {
		handleInputChange(inputValue)
		setSuggestOpen(false);
		setFilteredList([])
	}

	const handleKeyPress = (event) => {
		// Incomplete
		if(event.key === 'ArrowDown') {
			setSuggestOpen(true);
		} else if(event.key === 'Enter' ) {
			// Add function to select entered value if in list when enter is pressed
			console.log('Enter')
		} else {
			return
		}
	}

	return (
	<div ref={inputEl}>
		{ Array.isArray(suggestlist) ?
			<div>
				<label className="dib w4 pr5 mv2">{label} </label>
				<div className="dib" >
					<input 
						className=""
						type='text'
						autoComplete='off'
						value={inputValue}
						onChange={handleInput}
						onClick={toggleSuggest}
						onKeyDown={handleKeyPress}
						tabIndex={0}
						/>
					{suggestOpen ?
						<div className="">
						 	<ul className="absolute w5 bg-white list ml0 mt0 pa1 center ba overflow z-max">
							 	{filteredList.map((item, index) => {
							 		return(
							 			<ListItem
							 				key={index}
							 				setFocus={setFocus}
							 				index={index}
							 				focus={focus === index}
							 				value={item}
							 				handleSelect={handleSelect}
							 			/>
							 		)

							 	})}
							 	{!filteredList.length && addNewEnabled ?
								 	<p onClick={handleAddNew} className="f6 link underline  b mv1 pointer">New {label}</p>
								 	: !filteredList.length ?
								 		<div className='b f6'>Invalid {label}</div>
								 		:
								 		<div></div>
							 	}
							</ul>
						</div>
					:
					<div></div>
					}
				</div>
			</div>
			:
			<div>Suggestlist not in correct Format</div>
		}
	</div>
	)
}


export default SuggestBox;