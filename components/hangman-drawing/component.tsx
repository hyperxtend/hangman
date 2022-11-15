import { View, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: { position: 'relative' },
  head: {
    width: '50px',
    height: '50px',
    borderRadius: 100,
    border: '10px solid black',
    position: 'absolute',
    top: '50px',
    right: '-20px',
  },
  body: {
    width: '10px',
    height: '100px',
    backgroundColor: 'black',
    position: 'absolute',
    top: '100px',
    right: 0,
  },
  rightArm: {
    width: '100px',
    height: '10px',
    backgroundColor: 'black',
    position: 'absolute',
    top: '150px',
    right: '-100px',
    rotate: '-30deg',
    transformOrigin: 'left bottom',
  },
  leftArm: {
    width: '100px',
    height: '10px',
    backgroundColor: 'black',
    position: 'absolute',
    top: '150px',
    right: '10px',
    rotate: '30deg',
    transformOrigin: 'right bottom',
  },
  rightLeg: {
    width: '100px',
    height: '10px',
    backgroundColor: 'black',
    position: 'absolute',
    top: '190px',
    right: '-90px',
    transformOrigin: 'left bottom',
  },
  leftLeg: {
    width: '100px',
    height: '10px',
    background: 'black',
    position: 'absolute',
    top: '210px',
    right: 0,
    rotate: '-60deg',
    transformOrigin: 'right bottom',
  },
});
const HEAD = <View style={styles.head} />;

const BODY = <View style={styles.body} />;

const RIGHT_ARM = <View style={styles.rightArm} />;

const LEFT_ARM = <View style={styles.leftArm} />;

const RIGHT_LEG = (
  <View
    style={[
      styles.rightLeg,
      {
        transform: [{ rotate: '60deg' }],
      },
    ]}
  />
);
const LEFT_LEG = (
  <View
    style={[
      styles.leftLeg,
      {
        transform: [{ rotate: '-60deg' }],
      },
    ]}
  />
);

const BODY_PARTS = [HEAD, BODY, RIGHT_ARM, LEFT_ARM, RIGHT_LEG, LEFT_LEG];

type HangmanDrawingProps = {
  numberOfGuesses: number;
};

function HangmanDrawing({ numberOfGuesses }: HangmanDrawingProps) {
  return (
    <View style={styles.container}>
      {BODY_PARTS.slice(0, numberOfGuesses)}
      <View
        style={{
          height: '50px',
          width: '10px',
          backgroundColor: 'black',
          position: 'absolute',
          top: 0,
          right: 0,
        }}
      />
      <View
        style={{
          height: '10px',
          width: '200px',
          backgroundColor: 'black',
          marginLeft: '120px',
        }}
      />
      <View
        style={{
          height: '400px',
          width: '10px',
          backgroundColor: 'black',
          marginLeft: '120px',
        }}
      />
      <View
        style={{ height: '10px', width: '250px', backgroundColor: 'black' }}
      />
    </View>
  );
}

export default HangmanDrawing;
