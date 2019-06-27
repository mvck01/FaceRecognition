
import React from 'react'

const dataRank=({rank ,name})=> {
	return (
		<div >
			<div className ='white center f3'>
				{`${name}, Your Rank is`}
			</div>
			<div className ='white center f3'>
				{`${rank}`}
			</div>
		</div>
	)
}
export default dataRank;