import Button from '../../ui/Button';
import CreateCabinForm from './CreateCabinForm';
import Modal from '../../ui/Modal';

function AddCabin() {
	return (
		<div>
			<Modal>
				<Modal.Open opens='cabin-form'>
					<Button variation='primary' size='large'>
						Add new cabin
					</Button>
				</Modal.Open>
				<Modal.Window name='cabin-form'>
					<CreateCabinForm />
				</Modal.Window>
			</Modal>
		</div>
	);
}

// function AddCabin() {
// 	const [isOpenModal, setIsOpenModal] = useState(false);
// 	return (
// 		<Row>
// 			<Button
// 				variation='primary'
// 				size='large'
// 				onClick={() => setIsOpenModal((show) => !show)}
// 			>
// 				Add new cabin
// 			</Button>
// 			{isOpenModal && (
// 				<Modal onClose={() => setIsOpenModal(false)}>
// 					<CreateCabinForm
// 						onCloseModal={() => setIsOpenModal(false)}
// 					/>
// 				</Modal>
// 			)}
// 		</Row>
// 	);
// }

export default AddCabin;
