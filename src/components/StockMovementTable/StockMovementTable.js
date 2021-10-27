import React from 'react'
import { DateFormatter } from '../../utils/utils'


const StockMovementTable = ({ movement_list, deleteMovement }) => {
	return(
		<div className="pa2">
			<div className="overflow-auto">
			    <table className="f7 w-100 mw8 center" cellSpacing="0">
				    <thead>
				      	<tr className="stripe-dark">
				      	 	<th className="fw6 tl pa2 bg-white">Moved To</th>
				      	 	<th className="fw6 tl pa2 bg-white">Movement Type</th>
				      	 	<th className="fw6 tl pa2 bg-white">Movement Date</th>
			      	 	</tr>
			      	</thead>

			      	<tbody className="lh-copy">		
	    				{movement_list.map((movement,i) => {
	    					// UTC dates converted to browser timezone and formatterd
	    					const date = new Date(movement.movement_date);
							const formatted_date = DateFormatter(date)
							return (
								<tr 
									className="stripe-dark" 
									key={'movement ' + i}
									onClick={event => console.log(movement)}>
										<td className="pa1">{movement.location_name}</td>
										<td className="pa1">{movement.movement_type}</td>
										<td className="pa1">{formatted_date}</td>
										<td 
											className="fw6 bold link dim  pointer pr2"
											onClick={() => deleteMovement(movement.stock_movement_id)}
											>x</td>
								</tr>
							)
						})}
					</tbody>
				</table>
			</div>
		</div>
	)
}




export default StockMovementTable