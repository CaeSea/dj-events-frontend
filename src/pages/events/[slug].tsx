import Link from 'next/link';
import Image from 'next/image';
import { FaPencilAlt, FaTimes } from 'react-icons/fa';
import { API_URL } from '@/config/index';
import Layout from '@/components/Layout';
import styles from '@/styles/Event.module.css';

export async function getStaticPaths() {
    const res = await fetch(`${API_URL}/api/events`);
    const events = await res.json()
    const paths = events.map((evt: any) => ({
        params: { slug: evt.slug }
    }));
    return {
        paths,
        fallback: true
    }
}

export async function getStaticProps({ params: { slug } }: any) {
    const res = await fetch(`${API_URL}/api/events/${slug}`);
    const events = await res.json();
    return {
        props: { evt: events[0] },
        revalidate: 1
    }
}

// export async function getServerSideProps({ query: { slug } }: any) {
//     const res = await fetch(`${API_URL}/api/events/${slug}`);
//     const events = await res.json();
//     return {
//         props: { evt: events[0] }
//     }
// }

export default function EventPage({ evt }: any) {

    const deleteEvent = (e: any) => {
        console.log('delete');
    }

    return (
        <Layout>
            <div className={styles.event}>
                <div className={styles.controls}>
                    <Link href={`/events/edit/${evt.id}`} legacyBehavior>
                        <a>
                            <FaPencilAlt /> Edit event
                        </a>
                    </Link>
                    <a href="#" className={styles.delete} onClick={deleteEvent}>
                        <FaTimes /> Delete event
                    </a>
                </div>

                <span>
                    {evt.date} ay {evt.time}
                </span>

                <h2>{evt.name}</h2>
                {evt.image && (
                    <div className={styles.image}>
                        <Image src={evt.image} width={960} height={600} alt="" />
                    </div>
                )}

                <h3>Performers:</h3>
                <p>{evt.performers}</p>
                <h3>Description:</h3>
                <p>{evt.description}</p>
                <h3>Venue: {evt.venue}</h3>
                <p>{evt.address}</p>

                <Link href="/events" legacyBehavior>
                    <a className={styles.back}>{'<'}Go back</a>
                </Link>
            </div>
        </Layout>
    )
}
