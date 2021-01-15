import { connect } from 'react-redux';

import { createStructuredSelector } from 'reselect'

import { compose } from 'redux';

import { SelectIsLoaded } from '../../redux/sell/sell.selectors';

import WithSpinner from '../with-spinner/with-spinner.component';

import SellForm from './sell-form.component';

const mapStateToProps = createStructuredSelector ({
	isLoading: SelectIsLoaded 
});

const SellFormContainer = compose(
	connect(mapStateToProps),
	WithSpinner
	)(SellForm);

export default SellFormContainer;
