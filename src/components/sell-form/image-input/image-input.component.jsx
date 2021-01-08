import React, {useState, useCallback, useEffect} from 'react';
 
import {useDropzone} from 'react-dropzone';


import './image-input.styles.css';

// setting primary photo
// be able to push files into dropzone individually
// draggable
//remove

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
  width: 150,
  height: 150,
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
      acceptedFiles.map(file => Object.assign(file, {
        preview: URL.createObjectURL(file)}))
        ])
  }, [imageFiles])

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
  })

  const removeFile = file => () => {
    const newFiles = [...imageFiles]
    newFiles.splice(newFiles.indexOf(file), 1)
    setFiles(newFiles)
  }

  const removeAll = () => {
    setFiles([])
  }

  const images = imageFiles.map(file => (
    <li key={file.path}>
      {file.path} - {file.size} bytes{" "}
      <button onClick={removeFile(file)}>Remove File</button>
    </li>
  ))

  //  useEffect(() => () => {
  //   files.forEach(file => URL.revokeObjectURL(file.preview));
  // }, [files]);


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
            <p>Drag 'n' drop some files here, or click to select files</p>
          </div>
          <aside>
            <h4>Files</h4>
            <ul>{images}</ul>
          </aside>
          {imageFiles.length > 0 && <button onClick={removeAll}>Remove All</button>}
        </section>
        : ""
    }   
    </div>
  )
}

export default ImageInput
