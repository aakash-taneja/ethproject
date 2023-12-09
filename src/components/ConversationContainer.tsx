import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import MessageContainer from "./MessageContainer";
import ListConversations from "./ListConversations";
import ListConversationsConsent from "./ListConversations-consent";

interface ConversationContainerProps {
  client: any; // Update with the actual type of the client
  selectedConversation: any; // Update with the actual type of the conversation
  setSelectedConversation: React.Dispatch<React.SetStateAction<any>>;
  isContained?: boolean;
  isPWA?: boolean;
  isConsent?: boolean;
}

const ConversationContainer: React.FC<ConversationContainerProps> = ({
  client,
  selectedConversation,
  setSelectedConversation,
  isContained = false,
  isPWA = false,
  isConsent = false,
}) => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [peerAddress, setPeerAddress] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingResolve, setLoadingResolve] = useState<boolean>(false);
  const [canMessage, setCanMessage] = useState<boolean>(false);
  const [conversationFound, setConversationFound] = useState<boolean>(false);
  const [createNew, setCreateNew] = useState<boolean>(false);

  const styles: Record<string, React.CSSProperties> = {
    conversations: {
      height: "100%",
      background: "#000",
    },
    conversationList: {
      padding: "0px",
      margin: "0",
      listStyle: "none",
      overflowY: "scroll",
    },
    conversationListItem: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      margin: "0px",
      border: "0px",
      borderBottom: "1px solid #e0e0e0",
      cursor: "pointer",
      backgroundColor: "#000",
      padding: "10px",
      marginTop: "0px",
      transition: "background-color 0.3s ease",
    },
    conversationDetails: {
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-start",
      width: "75%",
      marginLeft: "10px",
      overflow: "hidden",
    },
    conversationName: {
      fontSize: "16px",
      fontWeight: "bold",
    },
    messagePreview: {
      fontSize: "14px",
      color: "#666",
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis",
    },
    conversationTimestamp: {
      fontSize: "12px",
      color: "#999",
      width: "25%",
      textAlign: "right",
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-end",
      justifyContent: "space-between",
    },
    createNewButton: {
      border: "1px",
      padding: "5px",
      borderRadius: "5px",
      marginTop: "10px",
    },
    peerAddressInput: {
      width: "100%",
      padding: "10px",
      boxSizing: "border-box",
      border: "0px solid #ccc",
    },
  };

  const selectConversation = async (conversation: any) => {
    setSelectedConversation(conversation);
  };

  const isValidEthereumAddress = (address: string) => {
    return /^0x[a-fA-F0-9]{40}$/.test(address);
  };

  const handleSearchChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setCreateNew(false);
    setConversationFound(false);
    setSearchTerm(e.target.value);
    setMessage("Searching...");
    const addressInput = e.target.value;
    const isEthDomain = /\.eth$/.test(addressInput);
    let resolvedAddress: any = addressInput;
    if (isEthDomain) {
      setLoadingResolve(true);
      try {
        const provider = new ethers.providers.CloudflareProvider();
        resolvedAddress = await provider.resolveName(resolvedAddress);
      } catch (error) {
        console.log(error);
        setMessage("Error resolving address");
        setCreateNew(false);
      } finally {
        setLoadingResolve(false);
      }
    }
    if (resolvedAddress && isValidEthereumAddress(resolvedAddress)) {
      processEthereumAddress(resolvedAddress);
      setSearchTerm(resolvedAddress);
    } else {
      setMessage("Invalid Ethereum address");
      setPeerAddress("");
      setCreateNew(false);
    }
  };

  const processEthereumAddress = async (address: string) => {
    setPeerAddress(address);
    if (address === client.address) {
      setMessage("No self messaging allowed");
      setCreateNew(false);
    } else {
      const canMessageStatus = await client?.canMessage(address);
      if (canMessageStatus) {
        setPeerAddress(address);
        setMessage("Address is on the network ✅");
        setCreateNew(true);
        // setCanMessage(true);
      } else {
        setMessage("Address is not on the network ❌");
        setCreateNew(false);
      }
    }
  };

  if (loading) {
    return (
      <div style={{ textAlign: "center", fontSize: "small" }}>Loading...</div>
    );
  }
  // console.log(canMessage, peerAddress, "canmessage, peeraddress");
  return (
    <div style={styles.conversations}>
      {!selectedConversation && (
        <ul style={styles.conversationList}>
          <input
            type="text"
            placeholder="Enter a 0x wallet or ENS address"
            value={searchTerm}
            onChange={handleSearchChange}
            style={styles.peerAddressInput}
          />
          {loadingResolve && searchTerm && <small>Resolving address...</small>}
          {isConsent ? (
            <ListConversationsConsent
              isPWA={isPWA}
              client={client}
              searchTerm={searchTerm}
              selectConversation={setSelectedConversation}
              onConversationFound={(state: any) => {
                setConversationFound(state);
                if (state) {
                  setCanMessage(false);
                  setCreateNew(false);
                }
              }}
            />
          ) : (
            <ListConversations
              isPWA={isPWA}
              client={client}
              searchTerm={searchTerm}
              selectConversation={setSelectedConversation}
              onConversationFound={(state: any) => {
                setConversationFound(state);
                if (state) {
                  setCanMessage(false);
                  setCreateNew(false);
                }
              }}
            />
          )}
          {message && !conversationFound && <small>{message}</small>}

          {peerAddress && canMessage && (
            <button
              style={styles.createNewButton}
              onClick={() => {
                setSelectedConversation({ messages: [] });
              }}
            >
              Create new conversation
            </button>
          )}
        </ul>
      )}
      {selectedConversation && (
        <MessageContainer
          client={client}
          isContained={isContained}
          conversation={selectedConversation}
          searchTerm={searchTerm}
          isConsent={isConsent}
          selectConversation={selectConversation}
        />
      )}
    </div>
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

export default ConversationContainer;
