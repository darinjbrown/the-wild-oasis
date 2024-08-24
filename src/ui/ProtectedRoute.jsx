/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import styled from 'styled-components';
import { useUser } from '../features/authentication/useUser';
import Spinner from './Spinner';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const FullPage = styled.div`
	background-color: var(--color-grey-50);
	display: flex;
	justify-content: center;
	align-items: center;
	height: 100vh;
`;

function ProtectedRoute({ children }) {
	const navigate = useNavigate();

	//1 Load authenticated user from local storage
	const { user, isLoading, isAuthenticated, fetchStatus } = useUser();

	//3 if user is not authenticated, redirect to login page
	useEffect(() => {
		if (!isAuthenticated && !isLoading && fetchStatus !== 'fetching') {
			navigate('/login');
		}
	}, [isAuthenticated, isLoading, navigate]);

	//2 show spinner while loading
	if (isLoading) {
		return (
			<FullPage>
				<Spinner />
			</FullPage>
		);
	}

	//4 if user is authenticated, show children
	if (isAuthenticated) return children;
}

export default ProtectedRoute;
