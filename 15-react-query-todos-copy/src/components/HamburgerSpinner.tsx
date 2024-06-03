import { useIsFetching, useIsMutating } from '@tanstack/react-query'
import React from 'react'

const HamburgerLoadingSpinner = () => {

	const isFetching = useIsFetching();
	const isMutating = useIsMutating();


	return isFetching || isMutating ? (
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

{/* <div id="global-loading-spinner-wrapper"> */}
{/* <PacmanLoader
	color="#007bff"
	loading={!!isFetching || !!isMutating}
	size={20}
	speedMultiplier={1.5}
/>
</div> */}
