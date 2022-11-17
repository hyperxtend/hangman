import { useCallback, useEffect, useState } from 'react';
import HangmanDrawing from './components/hangman-drawing/component';
import WordToGuess from './components/word-to-guess/component';
import Keyboard from './components/keyboard/component';
import words from './words.json';
import { View, StyleSheet, Text, Button } from 'react-native';

const styles = StyleSheet.create({
  gameContainer: {
    maxWidth: '800px',
    display: 'flex',
    flexDirection: 'column',
    gap: '2rem',
    margin: 'auto',
    alignItems: 'center',
  },
  clueContainer: { flexDirection: 'row', gap: 50 },
  gameResult: { fontSize: 35, textAlign: 'center' },
  clue: {
    fontSize: 14,
    textTransform: 'uppercase',
    fontWeight: '600',
  },
});

function getSong() {
  return words[Math.floor(Math.random() * words.length)];
}

function App() {
  const [songToGuess, setSongToGuess] = useState(getSong);
  const songTitle = songToGuess.title;

  const songArtist = songToGuess.artist;
  const songAlbum = songToGuess.album;
  const songYear = songToGuess.year;

  const [wordToGuess] = useState(songTitle);
  const [guessedLetters, setGuessedLetters] = useState<string[]>([]);

  const [showSongArtist, setShowSongArtist] = useState<boolean>(false);
  const [showSongAlbum, setShowSongAlbum] = useState<boolean>(false);
  const [showSongYear, setShowSongYear] = useState<boolean>(false);

  const incorrectLetters = guessedLetters.filter(
    (letter) => !wordToGuess.includes(letter)
  );

  const isLoser = incorrectLetters.length >= 6;
  const isWinner = wordToGuess
    .split('')
    .every((letter) => guessedLetters.includes(letter));

  const addGuessedLetter = useCallback(
    (letter: string) => {
      if (guessedLetters.includes(letter) || isLoser || isWinner) return;

      setGuessedLetters((currentLetters) => [...currentLetters, letter]);
    },
    [guessedLetters, isWinner, isLoser]
  );

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const key = e.key;
      if (!key.match(/^[a-z]$/)) return;

      e.preventDefault();
      addGuessedLetter(key);
    };

    document.addEventListener('keypress', handler);

    return () => {
      document.removeEventListener('keypress', handler);
    };
  }, [guessedLetters]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const key = e.key;
      if (key !== 'Enter') return;

      e.preventDefault();
      setGuessedLetters([]);
      setSongToGuess(getSong());
    };

    document.addEventListener('keypress', handler);

    return () => {
      document.removeEventListener('keypress', handler);
    };
  }, []);
  function resetGame() {
    setSongToGuess(getSong());
    setGuessedLetters(wordToGuess.split());
    setShowSongArtist(false);
    setShowSongAlbum(false);
    setShowSongYear(false);
  }
  return (
    <View style={styles.gameContainer}>
      <View style={styles.clueContainer}>
        <View>
          <Button title="REST" onPress={() => resetGame()} />
        </View>
        <View>
          <Button
            title="show artist"
            onPress={() => {
              setShowSongArtist(true);
            }}
          />
          {showSongArtist ? (
            <Text style={styles.clue}>{songArtist}</Text>
          ) : null}
        </View>
        <View>
          <Button
            title="show album"
            onPress={() => {
              setShowSongAlbum(true);
            }}
          />
          {showSongAlbum ? <Text style={styles.clue}>{songAlbum}</Text> : null}
        </View>
        <View>
          <Button
            title="show artist"
            onPress={() => {
              setShowSongYear(true);
            }}
          />
          {showSongYear ? <Text style={styles.clue}>{songYear}</Text> : null}
        </View>
      </View>
      <View>
        {isWinner ? (
          <Text style={styles.gameResult}>{isWinner && 'Winner!'}</Text>
        ) : null}
        {isLoser ? (
          <Text style={styles.gameResult}>{isLoser && 'Nice Try'}</Text>
        ) : null}
      </View>
      <HangmanDrawing numberOfGuesses={incorrectLetters.length} />
      <WordToGuess
        reveal={isLoser}
        guessedLetters={guessedLetters}
        wordToGuess={wordToGuess}
      />
      <View style={{ alignSelf: 'stretch' }}>
        <Keyboard
          disabled={isWinner || isLoser}
          activeLetters={guessedLetters.filter((letter) =>
            wordToGuess.includes(letter)
          )}
          inactiveLetters={incorrectLetters}
          addGuessedLetter={addGuessedLetter}
        />
      </View>
    </View>
  );
}

export default App;
