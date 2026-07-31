import Link from 'next/link';
import { api } from '../lib/api'
import { testUserId } from '../constants';

/* 

This is awful built only because of time constraints 
If I filter like this I have to bring every single booking
Not to mention the security risk that this account can then see ALL pii.
So just doing it because there isn't time to build another api endpoint that will allow
me to filter by user id.
Obviously, storing id's as constants would be re-placed when authentication is in too.
Also due to the lack of foreign keys and connections, all of these have to queried manually rather than one elegant query.
*/
async function getBookingsFilteredByUserId() {
    const booking = await api.get(`/bookings`);
    const userBookings = booking.data.data.filter((booking: any) => booking.user === testUserId)
    return userBookings;
}

async function enrichBookings(bookings: any[]) {
    return Promise.all(
        bookings.map(async (booking) => {
            const [userRes, parcRes] = await Promise.allSettled([
                api.get(`/users/${booking.user}`),
                api.get(`/parcs/${booking.parc}`),
            ]);

            return {
                ...booking,
                user: userRes.status === 'fulfilled' ? userRes.value.data : null,
                parc: parcRes.status === 'fulfilled' ? parcRes.value.data : null,
            };
        })
    );
}

export default async function HolidaysPage() {
    const bookingInformation = await getBookingsFilteredByUserId()
    const completeBookingInformation = await enrichBookings(bookingInformation)
    console.log(completeBookingInformation)

    return (
        <div id="page-wrapper" className="mx-auto w-3/4 my-8">
            <h1 className="text-3xl font-semibold tracking-tight my-8">Your bookings with us!</h1>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {completeBookingInformation.map((b: any) => (
                    <Link href='/holidays/${b.id}' className="rounded-lg border border-zinc-200 p-4 shadow-sm dark:border-zinc-700" key={b.id}>
                        <strong className="block text-lg text-zinc-900 dark:text-zinc-50">Name: {b.user.name}</strong>
                         <strong className="block text-lg text-zinc-900 dark:text-zinc-50">Parc: {b.parc?.name ?? 'Parc name unavailable'}</strong>
                          <strong className="block text-lg text-zinc-900 dark:text-zinc-50">Date: {b.bookingdate}</strong>
                    </Link>
                ))}
            </div>
        </div>
    )
}