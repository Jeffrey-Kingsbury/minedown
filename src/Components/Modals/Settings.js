import { styled } from 'styled-components';

const Settings = ({ setSettingsOpen }) => {
	return (
		<Wrapper className='window'>
			<div className='title-bar'>
				<div className='title-bar-text'>Settings</div>
				<div className='title-bar-controls'>
					<button
						aria-label='Close'
						onClick={() => {
							setSettingsOpen(false);
						}}
					/>
				</div>
			</div>
			<div className='window-body'>
				<button
					onClick={() => {
						localStorage.clear();
						window.location.reload();
					}}
				>
					RESET PROGRESS
				</button>
			</div>
		</Wrapper>
	);
};

const Wrapper = styled.div`
	font-family: monospace;
	width: 100%;
	display: flex;
	flex-direction: column;

	.window-body {
		box-sizing: border-box;
		padding: 0 1rem;
		overflow-y: auto;
		max-height: 70dvh;

		button {
			width: 200px;
			height: 50px;
			font-weight: bold;
		}
	}

	li {
		margin: 0 0 0.25rem 0;
		list-style: circle;
	}
	h3 {
		font-size: larger;
		font-weight: bold;
		margin: 0 0 1rem 0;
	}

	hr {
		margin: 1rem auto;
		width: 90%;
	}
`;
export default Settings;
