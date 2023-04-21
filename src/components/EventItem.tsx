import Link from 'next/link';
import Image from 'next/image';
import styles from '@/styles/EventItem.module.css';

export default function EventItem({ evt }: any) {

    const { attributes } = evt;
    const src = attributes.image.data.attributes.formats.thumbnail.url;
    return (
        <div className={styles.event}>
            <div className={styles.img}>
                <Image src={!src ? '/images/event-default.png' : attributes.image.data.attributes.formats.thumbnail.url} width={170} height={100} alt="" />
            </div>

            <div className={styles.info}>
                <span>
                    {new Date(attributes.date).toLocaleDateString('en-GB')} at {attributes.time}
                </span>
                <h3>{attributes.name}</h3>
            </div>

            <div className={styles.link}>
                <Link href={`/events/${attributes.slug}`} legacyBehavior>
                    <a className="btn">Details</a>
                </Link>
            </div>
        </div>
    )
}
