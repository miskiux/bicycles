import React, {useState, useEffect} from 'react';

import {storage} from "../firebase/firebase.utils";

import { useSelector, useDispatch } from "react-redux";

import { imageUploadSuccess } from '../redux/sell/sell.actions'

export const useStorage = (image, isLoading) => {

	const [url, setUrl] = useState([]);

	const userId = useSelector(state => state.user.currentUser)
	const dispatch = useDispatch()


//* Promise.all expects an array of promises | return Promise inside the map callback
// if there is no return value, will return an array with undefined values

//dispatching that it is done
	useEffect(() => {
		console.log(isLoading)
		if(isLoading === true && image) {
			const urlarray = [];
				let result = Promise.all(
					image.map((image) => {
						return new Promise ((resolve, reject) => {
						//storing image
						const uploadTask = storage.ref(`/images/${userId}/${image.name}`).put(image)
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
								storage.ref(`/images/${userId}`).child(image.name).getDownloadURL()
										.then(imgUrl => {
											imgUrl.split(',');
											urlarray.push(imgUrl)
											setUrl(urlarray)
											resolve(urlarray)
												})
											})
								})

							})
						)
					.then(() => dispatch(imageUploadSuccess()))
					//isLoading => false
			}
	}, [isLoading, image]);
	return { url }
}


