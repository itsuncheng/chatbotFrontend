import React, { useState, useEffect } from 'react';
import { Container } from 'semantic-ui-react';

//Do not call hooks in loops
//Only call hooks in react functions

export default function HomePage() {
  const [numberState, setNumberState] = useState(0); //useState(initialState)
  const [stringState, setStringState] = useState('String!!');
  const [arrayState, setArrayState] = useState([
    { item: 'First Item' },
    { item: 'Second Item' }
  ]);

  useEffect(() => {
    console.log('component did mount / component did update');
    const numberStateTimeInterval = setInterval(
      () => setNumberState(numberState => numberState + 1),
      1000
    ); //Same purpose as ComponentDidMount, ComponentDidUpdate
    const stringStateTimeInterval = setInterval(
      () =>
        setStringState(stringState =>
          stringState === 'String!!' ? 'String?!' : 'String!!'
        ),
      2000
    );
    const arrayStateTimeInterval = setInterval(
      () => setArrayState(arrayState => [arrayState[1], arrayState[0]]),
      1000
    );
    // Same purpose as ComponentWillUnmout
    return () => {
      console.log('Component will unmount');
      clearInterval(numberStateTimeInterval);
      clearInterval(stringStateTimeInterval);
      clearInterval(arrayStateTimeInterval);
    };
  }, []); // Values inside array indicates that useEffect should be called when the value inside the array is called.

  useEffect(() => {
    if (numberState === 10) {
      setNumberState(0);
    }
  }, [numberState]);

  return (
    <Container>
      Hello World! <br />
      NumberState: {numberState} <br />
      StringState: {stringState} <br />
      ArrayState: {arrayState[0].item}, {arrayState[1].item}
    </Container>
  );
}
