/* eslint-disable react/prop-types */
import { useForm } from 'react-hook-form';

import Input from '../../ui/Input';
import Form from '../../ui/Form';
import Button from '../../ui/Button';
import FileInput from '../../ui/FileInput';
import Textarea from '../../ui/Textarea';
import FormRow from '../../ui/FormRow';

import { useCreateCabin } from './useCreateCabin';
import { useEditCabin } from './useEditCabin';

function CreateCabinForm({ cabinToEdit = {}, onCloseModal }) {
	const { isCreating, createCabin } = useCreateCabin();
	const { isEditing, editCabin } = useEditCabin();
	const isWorking = isCreating || isEditing;

	const { id: editId, ...editValues } = cabinToEdit;
	const isEditSession = Boolean(editId);

	const { register, handleSubmit, reset, getValues, formState } = useForm({
		defaultValues: isEditSession ? editValues : {},
	});

	const { errors } = formState;

	function onSubmit(data) {
		console.log('DATA', data);
		const image =
			typeof data.image === 'string' ? data.image : data.image[0];

		if (isEditSession) {
			console.log('EDITING', {
				newCabinData: { ...data, image },
				id: editId,
			});
			editCabin(
				{ newCabinData: { ...data, image }, id: editId },
				{
					onSuccess: () => {
						reset(data);
						onCloseModal?.();
					},
				}
			);

			return;
		} else
			createCabin(
				{ ...data, image: image },
				{
					onSuccess: () => {
						reset();
						onCloseModal?.();
					},
				}
			);
	}

	function onError(errors) {}

	return (
		<Form
			onSubmit={handleSubmit(onSubmit, onError)}
			type={onCloseModal ? 'modal' : 'regular'}
		>
			<FormRow label='Cabin name' error={errors?.name?.message}>
				<Input
					type='text'
					id='name'
					disabled={isWorking}
					{...register('name', {
						required: 'This field is required',
					})}
				/>
			</FormRow>

			<FormRow
				label='Maximum capacity'
				error={errors?.maxCapacity?.message}
			>
				<Input
					type='number'
					id='maxCapacity'
					disabled={isWorking}
					{...register('maxCapacity', {
						required: 'This field is required',
						min: {
							value: 1,
							message: 'Capacity should be at least 1',
						},
					})}
				/>
			</FormRow>

			<FormRow
				label='Regular Price'
				error={errors?.regularPrice?.message}
			>
				<Input
					type='number'
					id='regularPrice'
					disabled={isWorking}
					{...register('regularPrice', {
						required: 'This field is required',
						min: {
							value: 1,
							message: 'Capacity should be at least 1',
						},
					})}
				/>
			</FormRow>

			<FormRow label='Discount' error={errors?.discount?.message}>
				<Input
					type='number'
					id='discount'
					disabled={isWorking}
					defaultValue={0}
					{...register('discount', {
						required: 'This field is required',
						validate: (value) =>
							value <= getValues().regularPrice ||
							'Discount should be less than regular price',
					})}
				/>
			</FormRow>

			<FormRow label='Description for website'>
				<Textarea
					type='number'
					id='description'
					disabled={isWorking}
					defaultValue=''
					{...register('description', {
						required: 'This field is required',
					})}
				/>
			</FormRow>

			<FormRow label='Cabin Photo' error={errors?.image?.message}>
				<FileInput
					id='image'
					accept='image/*'
					{...register('image', {
						required: isEditSession
							? false
							: 'This field is required',
					})}
				/>
			</FormRow>

			<FormRow>
				<Button
					size='medium'
					variation='secondary'
					type='reset'
					onClick={() => onCloseModal?.()}
				>
					Cancel
				</Button>
				<Button size='medium' variation='primary' disabled={isWorking}>
					{isEditSession ? 'Edit cabin' : 'Create new cabin'}
				</Button>
			</FormRow>
		</Form>
	);
}

export default CreateCabinForm;
