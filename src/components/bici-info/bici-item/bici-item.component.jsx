import React, {useState} from 'react';

import FormUpdate from '../form-update/form-update.component'

import './bici-item.styles.css'

//refresing - make saga listen to changes
//show date under the picture

function BiciItem({biciInfo, edit, toggleEdit}) {
	const { item } = biciInfo

	return(
			<div className='bici-item'>
				<img className='bici-image' src={item.url}/>
					<div className='bici-detail'>
						<div className='bici-title'>
							<div className='bici-title-text'>
								<h3 className='bici-name'>{item.manufacturer}</h3>
								<h3 className='bici-name'>{item.model}</h3>
							</div>
								{
									edit ?
									<div className='update-options'>
										<span className='bici-update-text' onClick={toggleEdit}> CANCEL </span>
										<button type='submit' form="hook-form" className='bici-update-text'> SAVE </button>
									</div>
									: <span className='bici-update-text' onClick={toggleEdit}> CHANGE </span>
								}
						</div>
						<FormUpdate inputData={biciInfo} edit={edit} toggleEdit={toggleEdit}/>
					</div>
		</div>
		)
}

export default BiciItem;