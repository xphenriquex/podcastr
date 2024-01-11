import "../styles/global.scss";

import { AppProps } from "next/app";
import { Header } from "@/components/Header";
import { Player } from "@/components/Player";

import styles from "../styles/app.module.scss";
import { PlayerContext } from "@/contexts/PlayerContext";
import { useState } from "react";

export default function App({ Component, pageProps }: AppProps) {
  const [episodeList, setEpisodeList] = useState([] as any);
  const [currentEpisodeIndex, setCurrentEpisodeIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  function play(episode: any) {
    setEpisodeList([episode]);
    setCurrentEpisodeIndex(0);
    setIsPlaying(true);
  }

  function togglePlay() {
    setIsPlaying(!isPlaying);
  }

  function setPlayingState(state: boolean) {
    setIsPlaying(state);
  }

  return (
    <PlayerContext.Provider value={{ episodeList, currentEpisodeIndex, isPlaying , play, togglePlay: togglePlay, setPlayingState }}>
      <div className={styles.wrapper}>
        <main>
          <Header />
          <Component {...pageProps} />
        </main>
        <Player />
      </div>
    </PlayerContext.Provider>
  )
}
