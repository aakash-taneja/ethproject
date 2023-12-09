import React, { useState } from "react";

interface MessageInputProps {
  onSendMessage: (message: string) => void;
  replyingToMessage?: any; // Update with the actual type of the replyingToMessage
  isPWA?: boolean;
}

const MessageInput: React.FC<MessageInputProps> = ({
  onSendMessage,
  replyingToMessage,
  isPWA = false,
}) => {
  const [newMessage, setNewMessage] = useState<string>("");
  const styles = {
    newMessageContainer: {
      display: "flex",
      alignItems: "center",
      paddingLeft: "10px",
      paddingRight: "10px",
      flexWrap: "wrap" as const, // Explicitly define the type
      paddingBottom: "10px",
    },
    messageInputField: {
      flexGrow: 1,
      padding: "5px",
      border: "1px solid #ccc",
      borderRadius: "5px",
      fontSize: isPWA ? "1.2em" : ".9em",
      width: isPWA ? "82%" : "",
      outline: "none",
    },
    sendButton: {
      padding: "5px 10px",
      marginLeft: "5px",
      border: "1px solid #ccc",
      cursor: "pointer",
      borderRadius: "5px",
      textAlign: "center" as const, // Explicitly define the type
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      fontSize: isPWA ? "1.0em" : ".6em",
      width: isPWA ? "12%" : "",
    },
  };

  const handleInputChange = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      onSendMessage(newMessage);
      setNewMessage("");
    } else {
      setNewMessage((event.target as HTMLInputElement).value);
    }
  };

  return (
    <div style={styles.newMessageContainer}>
      <input
        style={styles.messageInputField}
        type="text"
        value={newMessage}
        onKeyPress={handleInputChange}
        onChange={(e) => setNewMessage(e.target.value)}
        placeholder="Type your message..."
      />
      <button
        style={styles.sendButton}
        onClick={() => {
          onSendMessage(newMessage);
          setNewMessage("");
        }}
      >
        {isPWA ? "📤" : "Send"}
      </button>
    </div>
  );
};

export default MessageInput;
