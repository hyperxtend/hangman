import { useCallback, useEffect, useState } from 'react';
import HangmanDrawing from './components/hangman-drawing/component';
import WordToGuess from './components/word-to-guess/component';
import Keyboard from './components/keyboard/component';
import words from './words.json';
import { View, StyleSheet, Text } from 'react-native';

const styles = StyleSheet.create({
  gameContainer: {
    maxWidth: '800px',
    display: 'flex',
    flexDirection: 'column',
    gap: '2rem',
    margin: 'auto',
    alignItems: 'center',
  },
  gameResult: { fontSize: 35, textAlign: 'center' },
});

function getWord() {
  return words[Math.floor(Math.random() * words.length)].title;
}

function App() {
  const [wordToGuess, setWordToGuess] = useState(getWord);
  const [guessedLetters, setGuessedLetters] = useState<string[]>([]);

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
      setWordToGuess(getWord());
    };

    document.addEventListener('keypress', handler);

    return () => {
      document.removeEventListener('keypress', handler);
    };
  }, []);

  return (
    <View style={styles.gameContainer}>
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
