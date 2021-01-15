import { connect } from 'react-redux';

import { createStructuredSelector } from 'reselect'

import { compose } from 'redux';

import { selectIsBicyclesFetching } from '../../redux/shop/shop.selectors';

import WithSpinner from '../with-spinner/with-spinner.component'
import CollectionsOverview from './collections-overview.component'

const mapStateToProps = createStructuredSelector ({
	isLoading: selectIsBicyclesFetching //isLoading with-spinner prop
});

const CollectionsOverviewContainer = compose(
	connect(mapStateToProps),
	WithSpinner
	)(CollectionsOverview);

export default CollectionsOverviewContainer;