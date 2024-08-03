import { useState } from 'react';
import Button from '../../ui/Button';
import CreateCabinForm from './CreateCabinForm';
import Row from '../../ui/Row';
import Modal from '../../ui/Modal';

function AddCabin() {
	const [isOpenModal, setIsOpenModal] = useState(false);
	return (
		<Row>
			<Button
				variation='primary'
				size='large'
				onClick={() => setIsOpenModal((show) => !show)}
			>
				Add new cabin
			</Button>
			{isOpenModal && (
				<Modal onClose={() => setIsOpenModal(false)}>
					<CreateCabinForm
						onCloseModal={() => setIsOpenModal(false)}
					/>
				</Modal>
			)}
		</Row>
	);
}

export default AddCabin;
