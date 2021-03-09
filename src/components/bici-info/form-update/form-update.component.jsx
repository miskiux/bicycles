import React, {useState} from 'react';

import {useDispatch, useSelector} from 'react-redux'
import { useForm } from "react-hook-form";

import {DotsOverlay ,Dots} from '../../with-spinner/dots-spinner.styles.jsx' 

import { bicycleUpdateStart } from '../../../redux/shop/shop.actions'
import FormInput from '../../form-input/form-input.component';
import {Container, Row, Col} from 'react-bootstrap';

import './form-update.styles.scss'
function FormUpdate ({inputData, edit, toggleEdit}) {

const { register, handleSubmit } = useForm();
const dispatch = useDispatch()
const isBicycleUpdating = useSelector(state => state.shop.isUpdating) 

const {item, id} = inputData

const [update, setUpdate] = useState({
       manufacturer: item.manufacturer,
       model: item.model,
       price: item.price,
       year: item.year,
       size: item.size,
       condition: item.condition,
       info: item.info,
       address: item.address,
       phone: inputData.phone
   });

const {manufacturer, model, price, year, size, condition, info, address, phone} = update

const handleChange = event => {
    const {value, name} = event.target;
    setUpdate({...update, [name]: value}) 
  }

const onSubmit = data => {
  dispatch(bicycleUpdateStart({data, id}));
  toggleEdit();
};

const renderView = () => {
	return (
		<Container className='details-container' fluid>
    { isBicycleUpdating ?
       <DotsOverlay>
          <Dots />
       </DotsOverlay>
       :
      <Row>
        <Col>
    		  <div className="form-group row">
              <label className="form-label">Manufacturer</label>
              <div className="input-label">
                <label type="text" name="manufacturer" className="form-control">
                  {item.manufacturer}
                </label>
                </div>
            </div>
            <div className="form-group row">
              <label className="form-label">Model</label>
              <div className="nput-label">
                <label type="text" name="model" className="form-control"> 
                  {item.model}
                </label>
              </div>
            </div>
            <div className="form-group row">
              <label className="form-label">Price</label>
              <div className="input-label">
                <label type="text" name="Bicycle Type" className="form-control">
                  {item.price}
                </label>
              </div>
              </div>
              <div className="form-group row">
              <label className="form-label">Year</label>
              <div className="input-label">
                <label type="text" name="Bicycle Type" className="form-control">
                  {item.year}
                </label>
                </div>
              </div>
              <div className="form-group row">
              <label className="form-label">Price</label>
              <div className="input-label">
                <label type="text" name="Bicycle Type" className="form-control">
                  {item.price}
                </label>
              </div>
              </div>
              <div className="form-group row">
              <label className="form-label">Size</label>
              <div className="input-label">
                <label type="text" name="Bicycle Type" className="form-control">
                  {item.size}
                </label>
                </div>
              </div>
              <div className="form-group row">
              <label className="form-label">Condition</label>
              <div className="input-label">
                <label type="text" name="Bicycle Type" className="form-control">
                  {item.condition}
                </label>
              </div>
              </div>
              <div className="form-group row">
              <label className="form-label">Information</label>
              <div className="input-label">
                <label type="text" name="Bicycle Type" className="form-control">
                  {item.info}
                </label>
              </div>
              </div>
              </Col>
                <Col>
                  <div className="form-group row">
                    <label className="form-label">Address</label>
                    <div className="input-label">
                      <label type="text" name="Bicycle Type" className="form-control">
                        {item.address}
                      </label>
                    </div>
                    </div>
                    <div className="form-group row">
                    <label className="form-label">Phone</label>
                    <div className="input-label">
                      <label type="text" name="Bicycle Type" className="form-control">
                        {inputData.phone}
                      </label>
                    </div>
                    </div>
                </Col>
            </Row>
          }
       </Container>
		)
}

const renderInputs = () => {
  return (
    <Container className='details-container' fluid>
    <form id="hook-form" onSubmit={handleSubmit(onSubmit)}>
      <Row>
        <Col>
          <div className="form-group row">
              <FormInput
                name='manufacturer' 
                type='text' 
                value={manufacturer} 
                handleChange={handleChange}
                label='manufacturer'
                register={register}
                />
            </div>
            <div className="form-group row">
            <FormInput
                name='model' 
                type='text' 
                value={model} 
                handleChange={handleChange}
                label='model'
                register={register}
                />
            </div>
            <div className="form-group row">
              <FormInput
                name='price' 
                type='text' 
                value={price} 
                handleChange={handleChange}
                label='price'
                register={register}
                />
              </div>
              <div className="form-group row">
              <FormInput
                name='year' 
                type='text' 
                value={year} 
                handleChange={handleChange}
                label='year'
                register={register}
                />
              </div>
               <div className="form-group row">
                <FormInput
                name='size' 
                type='text' 
                value={size} 
                handleChange={handleChange}
                label='size'
                register={register}
                />
             </div>
             <div className="form-group row">
                <FormInput
                name='condition' 
                type='text' 
                value={condition} 
                handleChange={handleChange}
                label='condition'
                register={register}
                />
              </div>
                 <div className="form-group row">
              <FormInput
                name='info' 
                type='text' 
                value={info} 
                handleChange={handleChange}
                label='information'
                register={register}
                />
              </div>
              </Col>
                <Col>
                  <div className="form-group row">
                   <FormInput
                name='address' 
                type='text' 
                value={address} 
                handleChange={handleChange}
                label='address'
                register={register}
                />
                </div>
                    <div className="form-group row">
                     <FormInput
                      name='phone' 
                      type='text' 
                      value={phone} 
                      handleChange={handleChange}
                      label='phone'
                      register={register}
                      />
                    </div>
                </Col>
            </Row>
            </form>
       </Container>
    )
}

	return (
		<div className='form-update'>
    { edit ?
      renderInputs()
      :
      renderView()
    }
		</div>
		)
}

export default FormUpdate;

