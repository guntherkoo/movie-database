import { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { toggleTap, incrementCount, decrementCount } from '../redux/actions';

import GlobalStyles from 'styles/styles.scss';

class Index extends Component {
	static getInitialProps ({ reduxStore, req }) {
		const isServer = !!req

		return {}
	}

	toggle = () => {
		const { toggleTap } = this.props
		toggleTap()
	}

	increment = () => {
		const { incrementCount } = this.props
		incrementCount()
	}

	decrement = () => {
		const { decrementCount } = this.props
		decrementCount()
	}

	render() {
		const { tap, count } = this.props;

		return (
			<section>
				<h1>
					This is my Next.js Boilerplate.
				</h1>
				<h2>
					{this.props.count}
				    <button onClick={this.increment}>+1</button>
				    <button onClick={this.decrement}>-1</button>
				</h2>
				<button onClick={this.toggle}>
					{tap ? 'Toggle Off' : 'Toggle On'}
				</button>
				{tap && 
					<h2>
						Toggler is ON
					</h2>
				}
			</section>
		)
	}
}

const mapStateToProps = state => {
	return {
		tap: state.tap,
		count: state.count
	}
}

const mapDispatchToProps = dispatch =>
	bindActionCreators({ toggleTap, incrementCount, decrementCount }, dispatch)

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Index);
