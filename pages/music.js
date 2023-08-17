import Link from "next/link";
import MusicPlayer from "./components/musicplayer";

export default function Music() {
  return <div>
    <p>Aaron is cool!</p>

    <MusicPlayer />

    <Link href="/" legacyBehavior>
        <a>back</a>
    </Link>

    

    </div>

}