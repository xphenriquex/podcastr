import { GetStaticPaths, GetStaticProps } from "next";

import Image from "next/image";
import { format, parseISO } from "date-fns";
import { ptBR }  from 'date-fns/locale/pt-BR';
import { convertDurationToTimeString } from "@/utils/convertDurationToTimeString";
import { api } from "@/services/api";

import styles from './episode.module.scss';
import Link from "next/link";

type Episode = {
  id: string;
  title: string;
  members: string;
  description: string;
  thumbnail: string;
  duration: number;
  durationAsString: string;
  url: string;
  publishedAt: string;
};

type EpisodeProps = {
  episode: Episode
};

export default function Episode({ episode }: EpisodeProps) {
  return (
    <div className={styles.episode}>
      <div className={styles.thumbnailContainer}>

        <Link href="/">
          <button type="button">
            <img src='/arrow-left.svg' alt='Voltar' />
          </button>
        </Link>
        <Image
          width={700}
          height={160}
          src={episode.thumbnail}
          alt={episode.title}
          style={{ objectFit: 'cover' }}
        />
        <button type="button">
          <img src='/play.svg' alt='Tocar episódio' />
        </button>
      </div>

      <header>
        <h1>{episode.title}</h1>
        <span>{episode.members}</span>
        <span>{episode.publishedAt}</span>
        <span>{episode.durationAsString}</span>
      </header>

      <div className={styles.description}
        dangerouslySetInnerHTML={{ __html: episode.description }} />
    </div>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: 'blocking'
  }
}

export const getStaticProps: GetStaticProps = async (ctx) => {
  const { slug } = ctx.params as any;
  const { data } = await api.get(`/episodes/${slug}`);

  const episode =  {
    id: data.id,
    title: data.title,
    members: data.members,
    thumbnail: data.thumbnail,
    description: data.description,
    publishedAt: format(parseISO(data.published_at), 'd MMM yy', { locale: ptBR}),
    durationAsString: convertDurationToTimeString(data.file.duration),
    duration: data.file.duration,
    url: data.file.url,
  };

  return {
    props: {
      episode,
    },
    revalidate: 60 * 60 * 24 //24 hours
  }
}