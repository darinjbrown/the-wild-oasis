/* eslint-disable react/prop-types */
import { useCheckout } from '../../hooks/useCheckout';
import Button from '../../ui/Button';

function CheckoutButton({ id }) {
	const { checkout, isCheckingOut } = useCheckout();
	console.log('id', id);
	return (
		<Button
			variation='primary'
			size='small'
			onClick={() => checkout(id)}
			disabled={isCheckingOut}
		>
			Check out
		</Button>
	);
}

export default CheckoutButton;
