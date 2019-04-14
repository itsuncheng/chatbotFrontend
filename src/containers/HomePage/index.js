import React from 'react';
import {
  Container,
  Header,
  Grid,
  Image,
  Input,
  Button,
  Popup
} from 'semantic-ui-react';
import axios from 'axios';

export default class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      currentMessage: ''
    };
  }
  handleChange = (e, data) => {
    this.setState({ currentMessage: data.value });
  };
  handleKeyPress = e => {
    const { messages, currentMessage } = this.state;
    if (e.key === 'Enter') {
      const newMessage = messages.concat({
        message: currentMessage,
        user: 'user'
      });
      this.setState({ currentMessage: '', messages: newMessage }, () => {
        axios
          .post('http://ec2-34-226-207-115.compute-1.amazonaws.com/', {
            question: currentMessage
          })
          .then(res => {
            console.log(res);
            const responseMessage = newMessage.concat({
              message: res.data[0][0],
              user: 'bot'
            });
            this.setState({
              currentMessage: '',
              messages: responseMessage,
              context: res.data[1][0]
            });
          });
      });
    }
  };
  scrollToBottom = () => {
    this.messagesEnd.scrollIntoView({ behavior: 'smooth' });
  };

  componentDidMount() {
    this.scrollToBottom();
  }
  componentDidUpdate() {
    this.scrollToBottom();
  }
  render() {
    const { messages, currentMessage, context } = this.state;
    return (
      <Container
        style={{
          height: '80vh',
          width: '50vw',
          minWidth: '500px',
          boxShadow: '0 1px 2px 0 rgba(34,36,38,.15)',
          marginRight: 0
        }}
      >
        <Container
          style={{
            height: '10%',
            width: '100%',
            padding: '1em',
            background: '#d1675a',
            display: 'flex',
            alignItems: 'center'
          }}
        >
          <Header as="h1" style={{ color: '#fff' }}>
            Beep Boop going through a chat loop
          </Header>
        </Container>
        <Container
          style={{
            height: '80%',
            width: '100%',
            padding: '1em',
            overflow: 'hidden',
            background: '#fff'
          }}
        >
          <Container
            style={{
              height: '100%',
              width: '100%',
              overflowY: 'scroll',
              paddingRight: '17px'
            }}
          >
            {messages.map(message => {
              return (
                <ChatBox
                  user={message.user}
                  message={message.message}
                  context={context}
                />
              );
            })}
            <div
              style={{ float: 'left', clear: 'both' }}
              ref={el => {
                this.messagesEnd = el;
              }}
            />
          </Container>
        </Container>
        <Container
          style={{
            height: '10%',
            width: '100%',
            padding: '1.2em',
            background: '#ffbf6b',
            display: 'flex',
            alignItems: 'center'
          }}
        >
          <Input
            fluid
            icon="paper plane"
            placeholder="Yum..."
            style={{ width: '100%', height: '100%' }}
            onChange={this.handleChange}
            onKeyPress={this.handleKeyPress}
            value={currentMessage}
          />
        </Container>
      </Container>
    );
  }
}

function ChatBox({ user, message, context }) {
  if (user !== 'user') {
    return (
      <Container
        style={{ height: '10%', margin: '1em', marginTop: 0, display: 'flex' }}
      >
        <Grid
          columns={2}
          style={{ width: '100%', height: '100%', padding: 0, margin: 0 }}
        >
          <Grid.Column width={1} style={{ padding: 0 }}>
            <Image
              style={{ borderRadius: '50%' }}
              src="https://media.istockphoto.com/photos/pepperoni-pizza-italian-pizza-on-white-background-picture-id804291810?s=2048x2048"
            />
          </Grid.Column>
          <Grid.Column width={15} style={{ padding: 0, paddingLeft: '1em' }}>
            <Grid.Row>
              <b>{user}</b>
            </Grid.Row>
            <Grid.Row>{message}</Grid.Row>
          </Grid.Column>
        </Grid>
      </Container>
    );
  }
  return (
    <Container
      style={{
        height: '10%',
        margin: '1em',
        padding: 0,
        display: 'flex',
        justifyContent: 'flex-end'
      }}
    >
      <Grid
        columns={2}
        style={{ width: '100%', height: '100%', padding: 0, margin: 0 }}
      >
        <Grid.Column width={15} style={{ padding: 0, paddingRight: '1em' }}>
          <Grid.Row style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <b>YOU</b>
          </Grid.Row>
          <Grid.Row style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Popup
              trigger={<Button>{message}</Button>}
              content={context}
              position="bottom center"
            />
          </Grid.Row>
        </Grid.Column>
        <Grid.Column width={1} style={{ padding: 0 }}>
          <Image
            size="massive"
            style={{ borderRadius: '50%' }}
            src="https://media.istockphoto.com/photos/burger-isolated-on-white-picture-id840902892?k=6&m=840902892&s=612x612&w=0&h=lA4ww5bmLwCzlRXYqHU_EkVC_xfgoOIsX9IvDu0rE1c="
          />
        </Grid.Column>
      </Grid>
    </Container>
  );
}
