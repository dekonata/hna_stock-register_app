import React from 'react'

const StockMovementCard = ({ movement_list }) => {


	return(
		<div class="pa3">
			<div class="overflow-auto">
			    <table class="f6 w-100 mw8 center" cellspacing="0">
				    <thead>
				      	<tr class="stripe-dark">
				      	 	<th class="fw6 tl pa3 bg-white">From</th>
				      	 	<th class="fw6 tl pa3 bg-white">To</th>
				      	 	<th class="fw6 tl pa3 bg-white">Date</th>
			      	 	</tr>
			      	</thead>
			      	<tbody class="lh-copy">		    			
	    				{movement_list.map((user,i) => {
							return (
								<tr class="stripe-dark">
									<td class="pa3">{user}</td>
									<td class="pa3">test1</td>
									<td class="pa3">test2</td>
								</tr>
							)
						})}
					</tbody>
				</table>
			</div>
		</div>
	)
}




export default StockMovementCard