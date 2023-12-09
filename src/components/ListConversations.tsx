import React, { useState, useEffect } from "react";

interface ListConversationsProps {
  searchTerm: string;
  client: any; // Replace with the actual type of client
  selectConversation: (conversation: any) => void; // Replace with the actual type of conversation
  onConversationFound?: any;
  isPWA?: boolean;
}

const ListConversations: React.FC<ListConversationsProps> = ({
  searchTerm,
  client,
  selectConversation,
  onConversationFound,
  isPWA = false,
}) => {
  const [loading, setLoading] = useState(false);
  const [conversations, setConversations] = useState<any[]>([]);

  const styles: any = {
    conversationListItem: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      margin: "0px",
      border: "0px",
      borderBottom: "1px solid #e0e0e0",
      cursor: "pointer",
      backgroundColor: "#000",
      //   padding: "10px",
      transition: "background-color 0.3s ease",

      padding: isPWA == true ? "15px" : "10px",
    },
    conversationDetails: {
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-start",
      width: "75%",
      marginLeft: isPWA == true ? "15px" : "10px",
      overflow: "hidden",
    },
    conversationName: {
      fontSize: isPWA == true ? "20px" : "16px",
      fontWeight: "bold",
    },
    messagePreview: {
      fontSize: isPWA == true ? "18px" : "14px",
      color: "#666",
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis",
    },
    conversationTimestamp: {
      fontSize: isPWA == true ? "16px" : "12px",
      color: "#999",
      width: "25%",
      textAlign: "right",
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-end",
      justifyContent: "space-between",
    },
  };

  useEffect(() => {
    let isMounted = true;
    let stream: any;
    const fetchAndStreamConversations = async () => {
      setLoading(true);
      const allConversations = await client.conversations.list();

      const sortedConversations = allConversations.sort(
        (a: any, b: any) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
      if (isMounted) {
        setConversations(sortedConversations);
      }
      setLoading(false);
      stream = await client.conversations.stream();
      for await (const conversation of stream) {
        console.log(
          `New conversation started with ${conversation.peerAddress}`
        );
        if (isMounted) {
          setConversations((prevConversations) => {
            const newConversations = [...prevConversations, conversation];
            return newConversations.sort(
              (a, b) =>
                new Date(b.createdAt).getTime() -
                new Date(a.createdAt).getTime()
            );
          });
          if (onConversationFound) {
            onConversationFound();
          }
        }
        break;
      }
    };

    fetchAndStreamConversations();

    return () => {
      isMounted = false;
      if (stream) {
        stream.return();
      }
    };
  }, [client, onConversationFound]);

  const filteredConversations = conversations.filter(
    (conversation) =>
      conversation?.peerAddress
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) &&
      conversation?.peerAddress !== client.address
  );

  return (
    <>
      {filteredConversations.map((conversation, index) => (
        <li
          key={index}
          style={styles.conversationListItem}
          onClick={() => {
            selectConversation(conversation);
          }}
        >
          <div style={styles.conversationDetails}>
            <span style={styles.conversationName}>
              {conversation.peerAddress.substring(0, 6) +
                "..." +
                conversation.peerAddress.substring(
                  conversation.peerAddress.length - 4
                )}
            </span>
            <span style={styles.messagePreview}>...</span>
          </div>
          <div style={styles.conversationTimestamp}>
            {getRelativeTimeLabel(conversation.createdAt)}
          </div>
        </li>
      ))}
    </>
  );
};

const getRelativeTimeLabel = (dateString: string) => {
  const diff = new Date().getTime() - new Date(dateString).getTime();
  const diffMinutes = Math.floor(diff / 1000 / 60);
  const diffHours = Math.floor(diff / 1000 / 60 / 60);
  const diffDays = Math.floor(diff / 1000 / 60 / 60 / 24);
  const diffWeeks = Math.floor(diff / 1000 / 60 / 60 / 24 / 7);

  if (diffMinutes < 60)
    return `${diffMinutes} minute${diffMinutes > 1 ? "s" : ""} ago`;
  if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? "s" : ""} ago`;
  if (diffDays < 7) return `${diffDays} day${diffDays > 1 ? "s" : ""} ago`;
  return `${diffWeeks} week${diffWeeks > 1 ? "s" : ""} ago`;
};

export default ListConversations;
