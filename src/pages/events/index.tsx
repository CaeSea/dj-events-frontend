import Layout from "@/components/Layout";
import EventItem from "@/components/EventItem";
import { API_URL } from '@/config/index';

export async function getStaticProps() {
    const res = await fetch(`${API_URL}/api/events?[populate]=*&_sort=date:ASC`);
    const json = await res.json();
    const events = await json.data;

    return {
        props: { events: events },
        revalidate: 1
    }
}

export default function EventsPage({ events }: any) {
    return (
        <Layout>
            <h1>Events</h1>
            {events.length === 0 && <h3>No events to show.</h3>}

            {events.map((evt: any) => (
                <EventItem key={evt.id} evt={evt} />
            ))}
        </Layout>
    )
}
