import React, {useState, useCallback, useEffect} from 'react';
 
import {useDropzone} from 'react-dropzone';


import './image-input.styles.css';

// setting primary photo
// draggable


const thumbsContainer = {
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
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

const ImageInput = (props) => {

const [imageFiles, setFiles] = useState([])

  //callback to parent
  const onDrop = useCallback(acceptedFiles => {
    setFiles([...imageFiles,
          ...acceptedFiles.map(file => Object.assign(file, {
            preview: URL.createObjectURL(file)}))
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

  const images = imageFiles.map(file => (
    <div style={thumb} key={file.name}>
      <div style={thumbInner}>
        <img
          src={file.preview}
          style={img}
          onClick={removeFile(file)}
        />
      </div>
    </div>
  ))

  useEffect(() => () => {
    imageFiles.forEach(file => URL.revokeObjectURL(file.preview));
   }, [imageFiles]);

  useEffect(() => {
    props.uploadImages(imageFiles)
  }, [imageFiles])


  return (
    <div>
    {
      props.currentStep == 3 ?
        <section className="container">
          <div 
          {...getRootProps({ className: "dropzone" })}
          style={{height: imageFiles.length == 0 ? '530px' : '130px' }}
          >
            <input {...getInputProps()} />
            <p>Drop bicycle photos here, or click to select it</p>
          </div>
          <aside>
            <ul>{images}</ul>
          </aside>
        </section>
        : ""
    }   
    </div>
  )
}

export default ImageInput
