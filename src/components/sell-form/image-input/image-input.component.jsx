import React, {useState, useCallback, useEffect} from 'react';

import {connect} from 'react-redux'

import { fileUpload } from '../../../redux/sell/sell.actions'
import { toggleImagePopUp } from '../../../redux/sell/sell.actions'

import SpecForm from '../spec-info/spec-form/spec-form.component'
 
import {useDropzone} from 'react-dropzone';

import './image-input.styles.css';

const thumbsContainer = {
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  marginTop: 16
};

const thumb = {
  display: 'inline-flex',
  borderRadius: 2,
  border: '1px solid #eaeaea',
  marginBottom: 8,
  marginRight: 8,
  width: 100,
  height: 100,
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

const ImageInput = ({fileUpload, toggleImagePopUp, callBack}) => {

const [files, setFiles] = useState([]);

const [open, setOpen] = useState(false);

const { getRootProps, getInputProps } = useDropzone({
	accept: 'image/*',
	onDrop: acceptedFiles => {
      setFiles(acceptedFiles.map(file => Object.assign(file, {
        preview: URL.createObjectURL(file)
      })));
    }
});

const thumbs = files.map(file => (
    <div style={thumb} key={file.name}>
      <div style={thumbInner}>
        <img
          src={file.preview}
          style={img}
        />
      </div>
    </div>
  ));

  useEffect(() => () => {
    files.forEach(file => URL.revokeObjectURL(file.preview));
  }, [files]);
 
  return (
    <section className="container">
      <div {...getRootProps({className: 'dropzone'})}>
        <input {...getInputProps()} />
        <p>Drag 'n' drop some files here, or click to select files</p>
      </div>
      <aside style={thumbsContainer}>
      {thumbs}
      </aside>

    
      <div
      onClick={(event) => {
    		event.preventDefault();
    		callBack(files)
        setOpen(!open)
    		toggleImagePopUp()
	}}
      className="image-confirm">Next
      </div>
      <div className="bicycle-dropdown">
            { open ?
              <div>
            <SpecForm />
            
              </div>
            : null
            }
        </div>
    </section>
  );
}


const mapDispatchToProps = dispatch => ({
	fileUpload: (files) => dispatch(fileUpload(files)),
	toggleImagePopUp: () => dispatch(toggleImagePopUp())
})

export default connect(null, mapDispatchToProps)(ImageInput)
