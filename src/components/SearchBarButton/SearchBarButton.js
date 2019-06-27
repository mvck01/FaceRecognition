
import React from 'react'
import './SearchBarButton.css'
const SearchBarButton=({onSearchField, onDetectField})=> {
	return (
		<div >
			<p className='f4 tc'>
			{`App Detects Image Enter URL`}
			</p>
			<div className='center'>
			<div className='form center pa4 br3 shadow-5'>
				<input className='f4 pa2 w-70 center'type='text' placeholder='Enter Image Url' onChange={onSearchField}/>
				<button className='w-30 grow f4 link ph3 pv2 dib white bg-light-purple' onClick={onDetectField} > Detect </button>
			</div>
			</div>
		</div>
	)
}
export default SearchBarButton;

