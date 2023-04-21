import Link from 'next/link';
import Layout from "@/components/Layout";
import EventItem from "@/components/EventItem";
import { API_URL } from '@/config/index';

export async function getStaticProps() {
  const res = await fetch(`${API_URL}/api/events?[populate]=*&_sort=date:ASC&_limit=3`);
  const json = await res.json();
  const events = await json.data;

  return {
    props: { events },
    revalidate: 1
  }
}

export default function HomePage({ events }: any) {

  console.log(events);
  return (
    <Layout>
      <h1>Upcoming events</h1>
      {events.length === 0 && <h3>No events to show.</h3>}

      {events.map((evt: any) => (
        <EventItem key={evt.id} evt={evt} />
      ))}

      {events.length > 0 && (
        <Link href="/events" legacyBehavior>
          <a className="btn-secondary">View all events</a>
        </Link>
      )}
    </Layout>
  )
}
