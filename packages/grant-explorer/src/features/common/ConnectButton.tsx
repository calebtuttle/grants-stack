import { useConnect, useAccount } from "wagmi";
import { InjectedConnector } from "wagmi/connectors/injected";
import { ConnectButton as RainbowConnectButton } from "@rainbow-me/rainbowkit";

export default function ConnectButton() {
  // const { connect } = useConnect()
  // use injected connector
  const { connect } = useConnect({
    connector: new InjectedConnector(),
  });
  const { isConnected } = useAccount();

  async function onClick() {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    await window.ethereum.login();

    connect();
  }

  return (
    <>
      {isConnected ? (
        <RainbowConnectButton />
      ) : (
        <button
          // className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition duration-200 ease-in-out"
          // On hover, make the button slightly bigger
          className="bg-blue-500 text-white font-bold py-2 px-4 rounded-lg transition duration-200 ease-in-out hover:scale-105"
          onClick={onClick}
        >
          Connect Wallet
        </button>
      )}
    </>
  );
}
