import React, {useState, useCallback, useEffect} from 'react';
 
import {useDropzone} from 'react-dropzone';

import { v4 as uuidv4 } from 'uuid';

import './image-input.styles.css';


const thumbsContainer = {
  display: 'flex',
  flexDirection: 'column',
  marginTop: 16
};

const thumb = {
  display: 'inline-flex',
  borderRadius: 1,
  border: '1px solid #eaeaea',
  marginBottom: 8,
  marginRight: 8,
  width: 200,
  height: 200,
  padding: 4,
  boxSizing: 'border-box'
};

const thumbInner = {
  display: 'flex',
  minWidth: 0,
  overflow: 'hidden'
};

const img = {
  display: 'block',
  width: 'auto',
  height: '100%'
};


//getting current index after : MOVE, REMOVE

const arrayMove = require('array-move');

const ImageInput = (props) => {

const [imageFiles, setFiles] = useState([])

  //callback to parent
  const onDrop = useCallback(acceptedFiles => {
    setFiles([...imageFiles,
            ...acceptedFiles.map(file => Object.assign(file, {
            preview: URL.createObjectURL(file),
            id: uuidv4()
          }))
            ])
  }, [imageFiles])

  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/*',
    onDrop,
  })

  const removeFile = file => () => {
    const newFiles = [...imageFiles]
    newFiles.splice(newFiles.indexOf(file), 1)
    setFiles(newFiles)
  }

  const moveArray = (index) => {
    let arrImg = [...imageFiles];
    let arr = arrayMove(arrImg, index, 0);
    setFiles(arr)
  }

  const images = imageFiles.map((file, index) => (
      <div style={thumb} key={file.id}>
        <div style={thumbInner}>
          <img
            key={file.id}
            src={file.preview}
            style={img}
            onClick={removeFile(file)}
          />
      </div>
   <div>
      <input
      key={file.id}  
      type="radio" 
      name="frequency" 
      onChange={() => moveArray(index)} />
    </div>
    </div>
  ))

  //after form submit - images.forEach
  // useEffect(() => () => {
  //   imageFiles.forEach(file => URL.revokeObjectURL(file.preview));
  //  }, [imageFiles]);

  useEffect(() => {
    props.uploadImages(imageFiles)
  }, [imageFiles])



  return (
    <div>
    {
      props.currentStep == 3 ?
        <section className="container">
        {console.log(imageFiles)}
          <div 
          {...getRootProps({ className: "dropzone" })}
          style={{height: imageFiles.length == 0 ? '530px' : '130px' }}
          >
            <input {...getInputProps()} />
            <p>Drop bicycle photos here, or click to select it</p>
          </div>
          <aside style={thumbsContainer}>
            <ul>{images}</ul>
          </aside>
        </section>
        : ""
    }   
    </div>
  )
}

export default ImageInput
