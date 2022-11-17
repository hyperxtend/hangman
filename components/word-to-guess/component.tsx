import { View, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  letterPlaceHolder: {
    display: 'flex',
    flexDirection: 'row',
    gap: '.25em',
    fontSize: '6rem',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    fontFamily: 'monospace',
  },
  bottom: { borderBottomColor: 'black', borderBottomWidth: 2 },
});

const letterStyles = (
  guessedLetters: string[],
  letter: string,
  reveal: boolean
) =>
  StyleSheet.create({
    charStyle: {
      opacity: guessedLetters.includes(letter) || reveal ? 1 : 0,
      color: !guessedLetters.includes(letter) && reveal ? 'red' : 'black',
    },
  });

type WordToGuessProps = {
  guessedLetters: string[];
  wordToGuess: string;
  reveal?: boolean;
};

function WordToGuess({
  guessedLetters,
  wordToGuess,
  reveal = false,
}: WordToGuessProps) {
  return (
    <View style={styles.letterPlaceHolder}>
      {wordToGuess.split('').map((letter, index) => (
        <View style={styles.bottom} key={index}>
          <View style={letterStyles(guessedLetters, letter, reveal).charStyle}>
            {letter}
          </View>
        </View>
      ))}
    </View>
  );
}
export default WordToGuess;
