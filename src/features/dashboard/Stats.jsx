import {
	HiOutlineBanknotes,
	HiOutlineBriefcase,
	HiOutlineCalendarDays,
	HiOutlineChartBar,
} from 'react-icons/hi2';
import Stat from './Stat';
import { formatCurrency } from '../../utils/helpers';

/* eslint-disable react/prop-types */
function Stats({ bookings, confirmedStays, numDays, cabinCount }) {
	const numBookings = bookings?.length || 0;
	const sales = bookings.reduce(
		(acc, booking) => acc + booking.totalPrice,
		0
	);
	const numCheckins = confirmedStays.length;

	// Calculate occupancy rate by total number of occupied nights divided by total available nights
	const occupiedNights = confirmedStays.reduce(
		(acc, stay) => acc + stay.numNights,
		0
	);

	const availableNights = Number(numDays) * Number(cabinCount);
	const occupancyRate =
		(Number(occupiedNights) / Number(availableNights)) * 100;

	return (
		<>
			<Stat
				title='bookings'
				color='blue'
				value={numBookings}
				icon={<HiOutlineBriefcase />}
			/>
			<Stat
				title='Sales'
				color='green'
				value={formatCurrency(sales)}
				icon={<HiOutlineBanknotes />}
			/>
			<Stat
				title='check ins'
				color='indigo'
				value={numCheckins}
				icon={<HiOutlineCalendarDays />}
			/>
			<Stat
				title='occupancy rate'
				color='yellow'
				value={occupancyRate.toFixed(2) + '%'}
				icon={<HiOutlineChartBar />}
			/>
		</>
	);
}

export default Stats;
