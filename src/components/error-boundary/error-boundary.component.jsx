import React from 'react'

class ErrorBoundary extends React.Component {
		constructor() {
			super();

			this.state = {
				error: false
			}
		}
		static getDerivedStateFromError(error) {
			//process error
		return { error:true }
	}

	componentDidCatch(error, info) {
		console.log(error)
	}
	render() {
			if(this.state.error) {
				return <div> something went wrong </div>
			}

			return this.props.children
	}
}

export default ErrorBoundary;