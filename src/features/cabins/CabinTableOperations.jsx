import TableOperations from '../../ui/TableOperations';
import Filter from '../../ui/Filter';
import SortBy from '../../ui/SortBy';

function CabinTableOperations() {
	const filterOptions = [
		{ value: 'all', label: 'All' },
		{ value: 'no-discount', label: 'No discount' },
		{ value: 'with-discount', label: 'With discount' },
	];

	const sortOptions = [
		{ value: 'name-asc', label: 'Name: A to Z' },
		{ value: 'name-desc', label: 'Name: Z to A' },
		{ value: 'regularPrice-asc', label: 'Price: Low to High' },
		{ value: 'regularPrice-desc', label: 'Price: High to Low' },
		{ value: 'discount-asc', label: 'Discount: Low to High' },
		{ value: 'discount-desc', label: 'Discount: High to Low' },
		{ value: 'maxCapacity-asc', label: 'Capacity: Low to High' },
		{ value: 'maxCapacity-desc', label: 'Capacity: High to Low' },
	];
	return (
		<TableOperations>
			<Filter filterField={'discount'} options={filterOptions} />
			<SortBy options={sortOptions} />
		</TableOperations>
	);
}

export default CabinTableOperations;
