import supabase from './supabase';
import { supabaseUrl } from './supabase';

export async function getCabins() {
	const { data, error } = await supabase.from('cabins').select('*');

	if (error) {
		console.error(error);
		throw new Error("Cabins couldn't be fetched");
	}

	return data;
}

export async function createCabin(newCabin) {
	const imageName = `${Math.random()}-${newCabin.image.name}.jpg`.replaceAll(
		'/',
		''
	);

	const imagePath = `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

	console.log('newCabin', newCabin);
	const { data, error } = await supabase
		.from('cabins')
		.insert([{ ...newCabin, image: imagePath }])
		.select();

	if (error) {
		console.error(error);
		throw new Error("Cabin couldn't be created");
	}

	const { error: storageError } = await supabase.storage
		.from('cabin-images')
		.upload(imageName, newCabin.image);

	if (storageError) {
		await supabase.from('cabins').delete().eq('id', data.id);
		console.error(storageError);
		throw new Error(
			"Cabin image couldn't be uploaded, and the cabin was not created"
		);
	}

	return data;
}

export async function deleteCabin(id) {
	const { error } = await supabase.from('cabins').delete().eq('id', id);

	if (error) {
		console.error(error);
		throw new Error("Cabin couldn't be deleted");
	}
}
