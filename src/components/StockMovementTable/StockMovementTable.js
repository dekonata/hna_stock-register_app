import React from 'react'

const StockMovementTable = ({ movement_list }) => {


	return(
		<div className="pa2">
			<div className="overflow-auto">
			    <table className="f7 w-100 mw8 center" cellSpacing="0">
				    <thead>
				      	<tr className="stripe-dark">
				      	 	<th className="fw6 tl pa3 bg-white">Moved To</th>
				      	 	<th className="fw6 tl pa3 bg-white">Movement Type</th>
				      	 	<th className="fw6 tl pa3 bg-white">Movement Date</th>
			      	 	</tr>
			      	</thead>
			      	<tbody className="lh-copy">		    			
	    				{movement_list.map((movement,i) => {
							return (
								<tr className="stripe-dark" key={i}>
									<td className="pa1">{movement.location_name}</td>
									<td className="pa1">{movement.movement_type}</td>
									<td className="pa1">{movement.movement_date.slice(0,10)}</td>
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