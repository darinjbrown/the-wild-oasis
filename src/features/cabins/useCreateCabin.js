import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { createEditCabin } from '../../services/apiCabins';

export function useCreateCabin() {
	const queryClient = useQueryClient();
	const { isLoading: isCreating, mutate: createCabin } = useMutation({
		mutationFn: (cabin) => createEditCabin(cabin),
		onSuccess: () => {
			toast.success('Cabin created successfully');
			queryClient.invalidateQueries('cabins');
		},
		onError: (error) => {
			toast.error(error.message);
		},
	});

	return { isCreating, createCabin };
}
