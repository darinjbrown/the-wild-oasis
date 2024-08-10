import { useSearchParams } from 'react-router-dom';
import Select from './Select';

/* eslint-disable react/prop-types */
function SortBy({ options }) {
	const [searchParams, setSearchParams] = useSearchParams();
	const sortBy = searchParams?.get('sort') || '';

	function handleChange(event) {
		searchParams?.set('sort', event.target.value);
		setSearchParams(searchParams);
		console.log(searchParams, 'searchParams');
	}

	return (
		<Select
			options={options}
			type='white'
			onChange={handleChange}
			value={sortBy}
		></Select>
	);
}

export default SortBy;
