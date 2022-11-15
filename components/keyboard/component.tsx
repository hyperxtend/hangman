import { View, StyleSheet, Button, Text } from 'react-native';

const styles = StyleSheet.create({
  board: {
    display: 'flex',
    flexDirection: 'row',
    gap: '.5rem',
    border: '3px solid green',
    flexWrap: 'wrap',
    height: '500px',
  },
  btn: {
    width: 50,
    fontSize: 2.5,
    textTransform: 'uppercase',
    fontWeight: 'bold',
    color: 'black',
  },
  active: { backgroundColor: 'hsl(200, 100%, 50%)', color: 'white' },
  inactive: { opacity: 0.3 },
});

const KEYS = [
  'a',
  'b',
  'c',
  'd',
  'e',
  'f',
  'g',
  'h',
  'i',
  'j',
  'k',
  'l',
  'm',
  'n',
  'o',
  'p',
  'q',
  'r',
  's',
  't',
  'u',
  'v',
  'w',
  'x',
  'y',
  'z',
];

type KeyboardProps = {
  disabled?: boolean;
  activeLetters: string[];
  inactiveLetters: string[];
  addGuessedLetter: (letter: string) => void;
};

function Keyboard({
  activeLetters,
  inactiveLetters,
  addGuessedLetter,
  disabled = false,
}: KeyboardProps) {
  return (
    <View style={styles.board}>
      {KEYS.map((key) => {
        const isActive = activeLetters.includes(key);
        const isInactive = inactiveLetters.includes(key);
        return (
          <View style={styles.btn}>
            <Button
              onPress={() => addGuessedLetter(key)}
              disabled={isInactive || isActive || disabled}
              key={key}
              title={key}
            />
          </View>
        );
      })}
    </View>
  );
}

export default Keyboard;
