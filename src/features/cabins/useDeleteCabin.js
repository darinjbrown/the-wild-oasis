import toast from 'react-hot-toast';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteCabin as deleteCabinApi } from '../../services/apiCabins';

export function useDeleteCabin() {
	const queryClient = useQueryClient();
	const { isLoading: isDeleting, mutate: deleteCabin } = useMutation({
		mutationFn: (id) => deleteCabinApi(id),
		onSuccess: () => {
			toast.success('Cabin deleted successfully');
			queryClient.invalidateQueries('cabins');
		},
		onError: (error) => {
			toast.error(error.message);
		},
	});

	return { isDeleting, deleteCabin };
}
