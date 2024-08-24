import { useMutation } from '@tanstack/react-query';
import { signUp as signUpApi } from '../../services/apiAuth';
import toast from 'react-hot-toast';

export function useSignUp() {
	const { mutate: signUp, isLoading } = useMutation({
		mutationFn: signUpApi,
		onSuccess: (user) => {
			toast.success(
				"User created!  Please verify the new acccount from the user's new account from the registered email address."
			);
		},
		// onError: (error) => {
		// 	setError('email', {
		// 		type: 'manual',
		// 		message: error.message,
		// 	});
		// },
	});

	return { signUp, isLoading };
}
