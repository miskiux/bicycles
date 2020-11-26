import React, {useState} from 'react';

import {storage} from "../../firebase/firebase.utils"

import './image-input.styles.css';
//opening it with ternary operator

const ImageInput = (props) => {

const[image, setImage] = useState(null);
const[url, setUrl] = useState("");

const uploadChange = event => {
		if (event.target.files[0]) {
			setImage(URL.createObjectURL(event.target.files[0]));
		}
	}

const uploadImage =  event => {
	return new Promise ((resolve, reject) => {
			console.log(image)
				//storing image
				const uploadTask = storage.ref(`/images/${image.name}`).put(image)
			//getting the image url
				uploadTask.on(
				"state_changed",
				(snapshot) => {
					const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
					console.log(progress)
				},
				error => {
					console.log(error);
				},
				() => {
					storage.ref("images").child(image.name).getDownloadURL()
					.then(imgUrl => {
						setUrl({url:imgUrl})
						console.log(url)
						resolve();
						})		
					})
				})
}

const onTrigger = (event) => {
	props.parentCallBack(image);
	event.preventDefault();
}

	return (
		<div className="image-input-group">
			<input 
				name='image'
				type='file'
				onChange={uploadChange}
				/>
			<button onClick={onTrigger}>Submit</button>
		</div>
		)
}

export default ImageInput
