import supabase, { supabaseUrl } from './supabase';

export async function getCabins() {
	const { data, error } = await supabase.from('cabins').select('*');

	if (error) {
		console.error(error);
		throw new Error("Cabins couldn't be fetched");
	}

	return data;
}

export async function createEditCabin(newCabin, id) {
	console.log(newCabin, id);

	const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl);

	const imageName = hasImagePath
		? newCabin.image
		: `${Math.random()}-${newCabin.image.name}.jpg`.replaceAll('/', '');

	const imagePath = hasImagePath
		? imageName
		: `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

	let query = supabase.from('cabins');

	//CREATE
	if (!id) {
		query = query.insert([{ ...newCabin, image: imagePath }]);
	}
	//EDIT
	else if (id) {
		query = query.update({ ...newCabin, image: imagePath }).eq('id', id);
	}

	const { data, error } = await query.select().single();

	if (error) {
		console.error(error);
		throw new Error("Cabin couldn't be created");
	}

	const { error: storageError } = await supabase.storage
		.from('cabin-images')
		.upload(imageName, newCabin.image);

	if (!hasImagePath && storageError) {
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
