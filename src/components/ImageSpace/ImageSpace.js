
import React from 'react'
import './imageSpace.css'

const ImageSpace=({ detectImg,box })=> {
	return (
		<div  className='center ma3' >
			<div className='absolute mt2' style={{}}>
				<img id='ispace'alt='' src={detectImg} width='500' height='auto'/>
				<div className='bounding-box' style={{top:box.topRow, bottom:box.bottomRow, right:box.rightCol, left:box.leftCol}}>
				</div>
			</div>
		</div>
	)
}
export default ImageSpace;