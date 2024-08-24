import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

import { updateCurrentUser } from '../../services/apiAuth';

function useUpdateUser() {
	const queryClient = useQueryClient();

	const { isLoading: isUpdating, mutate: updateUser } = useMutation({
		mutationFn: updateCurrentUser,
		onSuccess: ({ user }) => {
			console.log('user', user);
			toast.success('User updated successfully');
			queryClient.setQueryData(['user'], user);
			queryClient.invalidateQueries({ queryKey: ['user'] });
		},
		onError: (error) => {
			toast.error(error.message);
		},
	});

	return { isUpdating, updateUser };
}

export default useUpdateUser;
