import { useIsFetching } from '@tanstack/react-query'
import React from 'react'

const HamburgerLoadingSpinner = () => {

	const isFetching = useIsFetching();

	return isFetching ? (
		<div id="hamburger-wrapper">
			<div className="hamburger-spinner">
				<span className="hamburger">🍔</span>
				<span className="visually-hidden">Loading...</span>
			</div>
		</div>  )
		:
		(
			null
		)
}

export default HamburgerLoadingSpinner
