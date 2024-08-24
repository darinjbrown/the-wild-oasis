import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { logout as logoutApi } from '../../services/apiAuth';

export function useLogout() {
	const queryClient = useQueryClient();
	const navigate = useNavigate();

	const { mutate: logout, isLoading } = useMutation({
		mutationFn: () => logoutApi(),
		onSuccess: () => {
			navigate('/login', { replace: true });
			queryClient.removeQueries();
			toast.success('log out successful');
		},
		onError: (error) => {
			toast.error('error logging out');
		},
	});

	return { logout, isLoading };
}
