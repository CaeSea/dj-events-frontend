
const qs = require('qs');
import { useRouter } from 'next/router';
import Link from 'next/link';
import Layout from "@/components/Layout";
import EventItem from "@/components/EventItem";
import { API_URL } from '@/config/index';

export async function getServerSideProps({ query: { term } }: any) {
    const query = qs.stringify(
        {
            filters: {
                $or: [
                    {
                        name: {
                            $contains: term,
                        },
                    },
                    {
                        performers: {
                            $contains: term,
                        },
                    },
                    {
                        description: {
                            $contains: term,
                        },
                    },
                    {
                        venue: {
                            $contains: term,
                        },
                    },
                ],
            },
        },
        {
            encodeValuesOnly: true, // prettify URL
        }
    );
    const res = await fetch(`${API_URL}/api/events?${query}&populate=*`);
    const json = await res.json();
    const events = await json.data;

    return {
        props: { events: events }
    }
}

export default function SearchPage({ events }: any) {
    const router = useRouter();

    return (
        <Layout title="Search results">
            <Link href="/events">Go back</Link>
            <h1>Search results for {router.query.term}</h1>
            {events.length === 0 && <h3>No events to show.</h3>}

            {events.map((evt: any) => (
                <EventItem key={evt.id} evt={evt} />
            ))}
        </Layout>
    )
}
