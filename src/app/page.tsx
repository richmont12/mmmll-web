import Image from "next/image";
import styles from "./page.module.css";
import Link from "next/link";

/*
Wähle zwischen
Blitzwortlesen (Wort wird für ms sekunden angezeigt)
  - Anzeigezeit eingebbar
  - Angabe pro Wort ob es gelesen werden konnte
  - Wiederholungen möglich
  - mit auswertung
Text lesen
  - Zeit messen anfang bis ende
  - mit pause option
  - textgröße einstellbar
  - mit auswertung

Design
  - hintergrund nicht ganz weiß
  - wenig text
  - schwarze schrift
  - dark mode für mich?
*/

export default function HomePage() {
  return (
    <main className={styles.main}>
      <div className={styles.headline}>
        <b>Willkommen bei &quot;Mach Mir Mein Leben Leichter&quot;</b>
      </div>

      <div className={styles.content}>
        <div className={styles.function}>
          <Link href="/fast-word-reading">
            <button>Blitzwort lesen</button>
          </Link>
        </div>
        <div className={styles.function}>
          <Link href="/text-reading">
            <button>Text lesen</button>
          </Link>
        </div>
      </div>

      <div className={styles.footer}>
        <div className={styles.footerHeadline}>
          <p>
            Implementiert von{" "}
            <a href="https://github.com/richmont12">richmont</a> mit Hilfe von
          </p>
        </div>
        <div className={styles.footerImages}>
          <Image
            src="/next.svg"
            alt="Next.js Logo"
            width={90}
            height={18}
            priority
          />
          <Image
            src="/mui.svg"
            alt="Material UI Logo"
            width={90}
            height={18}
            priority
          />
        </div>
      </div>
    </main>
  );
}
