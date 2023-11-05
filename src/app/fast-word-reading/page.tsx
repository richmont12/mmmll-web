"use client";

import { FastWordReadingConfiguration } from "./FastWordReadingConfiguration";
import { RunTimeData } from "./RunTimeData";
import styles from "./page.module.css";
import { useState } from "react";

export default function FastWordReadingPage() {
  const [configuration, setConfiguration] =
    useState<FastWordReadingConfiguration>({
      ConfigurationName: "TestConfiguration",
      FontSizeInPixel: 12,
      WordDisplayTimeInMilliseconds: 600,
      Words: ["Test", "Wörter", "Testwörter"],
    });

  const [runTimeData, setRunTimeData] = useState<RunTimeData>(() => {
    var arr = new Array(configuration.Words.length);
    for (let i = 0; i < configuration.Words.length; i++) {
      arr[i] = 0;
    }
    return { CurrentWordIndex: 0, ReadTryCount: arr };
  });

  const currentWord = configuration.Words[runTimeData.CurrentWordIndex];

  const configurations = [configuration];

  const [wordIsVisible, setWordIsVisible] = useState(false);

  function increaseRetryCount(): RunTimeData {
    let readTryCount = runTimeData.ReadTryCount;
    readTryCount[runTimeData.CurrentWordIndex] =
      readTryCount[runTimeData.CurrentWordIndex] + 1;
    const data: RunTimeData = {
      CurrentWordIndex: runTimeData.CurrentWordIndex,
      ReadTryCount: readTryCount,
    };
    return data;
  }

  function increaseCurrentWordIndexAndThenRetryCount(): RunTimeData {
    let readTryCount = runTimeData.ReadTryCount;
    readTryCount[runTimeData.CurrentWordIndex + 1] =
      readTryCount[runTimeData.CurrentWordIndex + 1] + 1;
    const data: RunTimeData = {
      CurrentWordIndex: runTimeData.CurrentWordIndex + 1,
      ReadTryCount: readTryCount,
    };
    return data;
  }

  function start() {
    const data = increaseRetryCount();
    setWordIsVisible(true);

    setTimeout(() => {
      setWordIsVisible(false);
      setRunTimeData(data);
    }, configuration.WordDisplayTimeInMilliseconds);
  }

  function retry() {
    const data = increaseRetryCount();
    setWordIsVisible(true);

    setTimeout(() => {
      setWordIsVisible(false);
      setRunTimeData(data);
    }, configuration.WordDisplayTimeInMilliseconds);
  }

  function next() {
    const data = increaseCurrentWordIndexAndThenRetryCount();
    setRunTimeData(data);
    setWordIsVisible(true);

    setTimeout(() => {
      setWordIsVisible(false);
      setRunTimeData(data);
      console.log(data);
    }, configuration.WordDisplayTimeInMilliseconds);
  }
  function increaseFontSize() {
    configuration.FontSizeInPixel++;
    setConfiguration(configuration);
  }

  function setWordDisplayTime(wordDisplayTimeInMilliseconds: number) {
    const conf: FastWordReadingConfiguration = {
      ConfigurationName: configuration.ConfigurationName,
      FontSizeInPixel: configuration.FontSizeInPixel,
      WordDisplayTimeInMilliseconds: wordDisplayTimeInMilliseconds,
      Words: configuration.Words,
    };

    setConfiguration(conf);
  }

  function setFontSize(fontSize: number) {
    const conf: FastWordReadingConfiguration = {
      ConfigurationName: configuration.ConfigurationName,
      FontSizeInPixel: fontSize,
      WordDisplayTimeInMilliseconds:
        configuration.WordDisplayTimeInMilliseconds,
      Words: configuration.Words,
    };

    setConfiguration(conf);
  }

  return (
    <>
      <div className={styles.main}>
        <div className={styles.content}>
          {wordIsVisible && (
            <p style={{ fontSize: `${configuration.FontSizeInPixel}px` }}>
              {currentWord}
            </p>
          )}
        </div>
        <div className={styles.controlBar}>
          <div>
            <p>Kontrollleiste</p>
            <div>
              Gewählte Konfiguration{" "}
              <select>
                {configurations.map((cfg) => {
                  return (
                    <option
                      value={cfg.ConfigurationName}
                      key={cfg.ConfigurationName}
                    >
                      {cfg.ConfigurationName}
                    </option>
                  );
                })}
              </select>
            </div>
            <p>Aktionen</p>
            <div>
              <button
                disabled={
                  wordIsVisible ||
                  runTimeData.CurrentWordIndex !== 0 ||
                  runTimeData.ReadTryCount[runTimeData.CurrentWordIndex] !== 0
                }
                onClick={start}
              >
                Start
              </button>
              <button
                disabled={
                  wordIsVisible ||
                  runTimeData.ReadTryCount[runTimeData.CurrentWordIndex] === 0
                }
                onClick={retry}
              >
                Wort wiederholen
              </button>
              <button
                disabled={
                  wordIsVisible ||
                  runTimeData.ReadTryCount[runTimeData.CurrentWordIndex] ===
                    0 ||
                  runTimeData.CurrentWordIndex >= configuration.Words.length - 1
                }
                onClick={next}
              >
                Nächstes Wort anzeigen
              </button>
              <button disabled={wordIsVisible}>
                Durchlauf beenden und Auswertung anzeigen
              </button>
            </div>
            <p>Einstellungen</p>
            <div className={styles.settings}>
              <button
                onClick={() => {
                  setWordDisplayTime(
                    configuration.WordDisplayTimeInMilliseconds - 100
                  );
                }}
              >
                --
              </button>
              <p>
                Aktuelle Wortanzeigezeit:{" "}
                {configuration.WordDisplayTimeInMilliseconds} Millisekunden
              </p>
              <button
                onClick={() => {
                  setWordDisplayTime(
                    configuration.WordDisplayTimeInMilliseconds + 100
                  );
                }}
              >
                ++
              </button>
              |
              <button
                onClick={() => {
                  setFontSize(configuration.FontSizeInPixel - 2);
                }}
              >
                --
              </button>
              <p>Schriftgröße: {configuration.FontSizeInPixel} px</p>
              <button
                onClick={() => {
                  setFontSize(configuration.FontSizeInPixel + 2);
                }}
              >
                ++
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
