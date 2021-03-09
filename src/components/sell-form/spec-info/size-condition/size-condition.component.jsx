import React from 'react';

import { Input } from 'semantic-ui-react';

function AdditionalInfo (props) {

	return (
		<div>
			<div>
				<label> Size of your bicycle(cm) </label>
					<input
						name='size' 
						type='text'
						autoComplete="off" 
						value={props.size} 
						onChange={props.handleChange}
						/>
			</div>
			<div>
				<label> Condition </label>
					<div class="field" onChange={props.onRadioChange}>
				      <div class="ui radio checkbox">
				        <input type="radio" name="frequency" value="New" />
				        <label>New</label>
				      </div>
				      <div class="ui radio checkbox">
				        <input type="radio" name="frequency" value="Used" />
				       <label>Used</label>
				      </div>
					</div>
			</div>
				<div>
					<label> Additional information </label>
						<input
							style={{height: '90px'}}
							name='info' 
							type='text'
							autoComplete="off" 
							value={props.info} 
							onChange={props.handleChange}
							/>
					</div>
		</div>
		)
}

export default AdditionalInfo; 