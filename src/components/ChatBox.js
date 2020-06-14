import React from 'react'
import { Widget, addResponseMessage } from 'react-chat-widget'

function ChatBox({oponent, ...rest}) {
  const handleNewUserMessage = (newMessage) => {
    console.log(`New message incoming! ${newMessage}`);
    // Now send the message throught the backend API
    addResponseMessage('Welcome to this awesome chat!');
  }

  return (
    <Widget
      {...rest}
      title='Oponent'
      subtitle=''
      handleNewUserMessage={handleNewUserMessage}
    />
  )
}

export default ChatBox