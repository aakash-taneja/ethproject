import React, { useState, useEffect, MouseEvent } from "react";
import { Client } from "@xmtp/xmtp-js";
import { ethers } from "ethers";
import ConversationContainer from "./ConversationContainer";
// import { ConversationContainer } from "./ConversationContainer";

interface FloatingInboxProps {
  wallet: any;
  env?: string;
  isPWA?: boolean;
  onLogout?: () => void;
  isContained?: boolean;
  isConsent?: boolean;
}

export default function FloatingInbox({
  wallet,
  env,
  isPWA = false,
  onLogout,
  isContained = false,
  isConsent = false,
}: FloatingInboxProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isOnNetwork, setIsOnNetwork] = useState(false);
  const [client, setClient] = useState<Client | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  useEffect(() => {
    const initialIsOpen =
      isPWA ||
      isContained ||
      localStorage.getItem("isWidgetOpen") === "true" ||
      false;
    const initialIsOnNetwork =
      localStorage.getItem("isOnNetwork") === "true" || false;
    const initialIsConnected =
      (localStorage.getItem("isConnected") && wallet === "true") || false;

    setIsOpen(initialIsOpen);
    setIsOnNetwork(initialIsOnNetwork);
    setIsConnected(initialIsConnected);
  }, [isPWA, isContained, wallet]);

  const [selectedConversation, setSelectedConversation] = useState<
    string | null
  >(null);
  const [signer, setSigner] = useState<any>();

  useEffect(() => {
    if (wallet) {
      setSigner(wallet);
      setIsConnected(true);
    }
    if (client && !isOnNetwork) {
      setIsOnNetwork(true);
    }
    if (signer && isOnNetwork && isConnected) {
      initXmtpWithKeys();
    }
  }, [wallet, isOnNetwork, isConnected, signer, client]);

  useEffect(() => {
    localStorage.setItem("isOnNetwork", isOnNetwork.toString());
    localStorage.setItem("isWidgetOpen", isOpen.toString());
    localStorage.setItem("isConnected", isConnected.toString());
  }, [isOpen, isConnected, isOnNetwork]);

  const styles: Record<string, React.CSSProperties> = {
    FloatingLogo: {
      position: "fixed",
      bottom: "20px",
      right: "20px",
      width: "40px",
      height: "40px",
      borderRadius: "50%",
      backgroundColor: "white",
      display: "flex",
      alignItems: "center",
      border: "1px solid #ccc",
      justifyContent: "center",
      cursor: "pointer",
      transition: "transform 0.3s ease",
      padding: "5px",
    },
    uContainer: {
      position: isContained ? "relative" : isPWA ? "relative" : "fixed",
      bottom: isContained ? "0px" : isPWA ? "0px" : "80px",
      right: isContained ? "0px" : isPWA ? "0px" : "20px",
      width: isContained ? "100%" : isPWA ? "100%" : "600px",
      height: isContained ? "100%" : isPWA ? "100vh" : "600px",
      border: isContained ? "0px" : isPWA ? "0px" : "1px solid #ccc",
      backgroundColor: "#f9f9f9",
      borderRadius: isContained ? "0px" : isPWA ? "0px" : "10px",
      zIndex: "1000",
      overflow: "hidden",
      display: "flex",
      flexDirection: "column",
    },
    logoutBtn: {
      // position: "absolute",
      // top: "10px",
      textDecoration: "none",
      color: "#000",
      // left: "5px",
      background: "transparent",
      border: "none",
      fontSize: isPWA === true ? "12px" : "10px",
      cursor: "pointer",
    },
    widgetHeader: {
      padding: "2px",
    },
    label: {
      fontSize: "10px",
      textAlign: "center",
      marginTop: "5px",
      cursor: "pointer",
      display: "block",
    },
    conversationHeader: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      background: "none",
      border: "none",
      width: "auto",
      margin: "0px",
    },
    conversationHeaderH4: {
      margin: "0px",
      padding: "4px",
      fontSize: isPWA === true ? "20px" : "14px",
    },
    backButton: {
      border: "0px",
      background: "#000",
      cursor: "pointer",
      fontSize: isPWA === true ? "20px" : "14px",
    },
    widgetContent: {
      flexGrow: 1,
      overflowY: "auto",
    },
    xmtpContainer: {
      display: "flex",
      justifyContent: "center",
      flexDirection: "column",
      alignItems: "center",
      height: "100%",
    },
    btnXmtp: {
      backgroundColor: "#f0f0f0",
      display: "flex",
      alignItems: "center",
      textDecoration: "none",
      color: "#000",
      justifyContent: "center",
      border: "1px solid grey",
      padding: isPWA === true ? "20px" : "10px",
      borderRadius: "5px",
      fontSize: isPWA === true ? "20px" : "14px",
    },
  };

  const connectWallet = async () => {
    if (typeof window.ethereum !== undefined) {
      try {
        await window.ethereum.enable();
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        setSigner(signer);
        console.log("Your address", await getAddress(signer));
        setIsConnected(true);
      } catch (error) {
        console.error("User rejected request", error);
      }
    } else {
      console.error("Metamask not found");
    }
  };

  const getAddress = async (signer: ethers.Signer) => {
    try {
      if (signer && typeof signer.getAddress === "function") {
        return await signer.getAddress();
      }
      //   if (signer && typeof signer.getAddresses === "function") {
      //     const [address] = await signer.getAddresses();
      //     return address;
      //   }
      return null;
    } catch (e) {
      console.log(e);
    }
  };

  const [isWalletCreated, setIsWalletCreated] = useState(false);

  const createNewWallet = async () => {
    const newWallet = ethers.Wallet.createRandom();
    console.log("Your address", newWallet.address);
    setSigner(newWallet);
    setIsConnected(true);
    setIsWalletCreated(true);
  };

  const openWidget = () => {
    setIsOpen(true);
  };

  const closeWidget = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    if (typeof window !== undefined) {
      (window as any).FloatingInbox = {
        open: openWidget,
        close: closeWidget,
      };
    }
  }, []);

  const handleLogout = async () => {
    setIsConnected(false);
    const address = await getAddress(signer as ethers.Signer);
    wipeKeys(address);
    console.log("wipe", address);
    setSigner(undefined);
    setIsOnNetwork(false);
    setClient(null);
    setSelectedConversation(null);
    localStorage.removeItem("isOnNetwork");
    localStorage.removeItem("isConnected");
    if (typeof onLogout === "function") {
      onLogout();
    }
  };

  const handleBack = async () => {
    setSelectedConversation(null);
  };

  const initXmtpWithKeys = async () => {
    if (!signer) {
      handleLogout();
      return;
    }
    let address = await getAddress(signer);
    let keys: any = loadKeys(address);
    const clientOptions: any = {
      env: env ? env : getEnv(),
    };
    if (!keys) {
      keys = await Client.getKeys(signer, {
        ...clientOptions,
        skipContactPublishing: true,
        persistConversations: false,
      });
      storeKeys(address, keys);
    }
    const xmtp: any = await Client.create(null, {
      ...clientOptions,
      privateKeyOverride: keys,
      useSnap: true,
    });
    setClient(xmtp);
    setIsOnNetwork(!!xmtp.address);
    if (isConsent) {
      await xmtp.contacts.refreshConsentList();
    }
  };

  return (
    <>
      {!isPWA && !isContained && (
        <div
          onClick={isOpen ? closeWidget : openWidget}
          className={`FloatingInbox ${
            isOpen ? "spin-clockwise" : "spin-counter-clockwise"
          }`}
          style={styles.FloatingLogo}
        >
          💬
        </div>
      )}
      {isOpen && (
        <div
          style={styles.uContainer}
          className={` ${isOnNetwork ? "expanded" : ""}`}
        >
          {isConnected && (
            <div style={{ display: "flex" }}>
              <button style={styles.logoutBtn} onClick={handleBack}>
                back
              </button>
              <button style={styles.logoutBtn} onClick={handleLogout}>
                Logout
              </button>
            </div>
          )}
          {isConnected && isOnNetwork && (
            <div style={styles.widgetHeader}>
              <div style={styles.conversationHeader}>
                {isOnNetwork && selectedConversation && (
                  <button
                    style={styles.backButton}
                    onClick={() => {
                      setSelectedConversation(null);
                    }}
                  >
                    ←
                  </button>
                )}
                <h4 style={styles.conversationHeaderH4}>Conversations</h4>
              </div>
            </div>
          )}
          {isConnected}
          <div style={styles.widgetContent}>
            {!isConnected && (
              <div style={styles.xmtpContainer}>
                <button style={styles.btnXmtp} onClick={connectWallet}>
                  Connect Wallet
                </button>
                <div style={styles.label} onClick={createNewWallet}>
                  or create new one
                </div>
              </div>
            )}
            {isConnected && !isOnNetwork && (
              <div style={styles.xmtpContainer}>
                <button style={styles.btnXmtp} onClick={initXmtpWithKeys}>
                  Connect to XMTP
                </button>
                {isWalletCreated && (
                  <button style={styles.label}>
                    Your addess: {(signer as ethers.Wallet).address}
                  </button>
                )}
              </div>
            )}
            {isConnected && isOnNetwork && client && (
              <ConversationContainer
                isPWA={isPWA}
                client={client}
                isConsent={isConsent}
                isContained={isContained}
                selectedConversation={selectedConversation}
                setSelectedConversation={setSelectedConversation}
              />
            )}
          </div>
        </div>
      )}
    </>
  );
}

const ENCODING = "binary";

export const getEnv = () => {
  return typeof process !== undefined && process.env.REACT_APP_XMTP_ENV
    ? (process.env.REACT_APP_XMTP_ENV as string)
    : "production";
};

export const buildLocalStorageKey = (walletAddress: string | null) => {
  return walletAddress ? `xmtp:${getEnv()}:keys:${walletAddress}` : "";
};

export const loadKeys = (walletAddress: any) => {
  const val = localStorage.getItem(buildLocalStorageKey(walletAddress));
  return val ? Buffer.from(val, ENCODING) : null;
};

export const storeKeys = (walletAddress: any, keys: any) => {
  localStorage.setItem(
    buildLocalStorageKey(walletAddress),
    Buffer.from(keys).toString(ENCODING)
  );
};

export const wipeKeys = (walletAddress: any) => {
  localStorage.removeItem(buildLocalStorageKey(walletAddress));
};
