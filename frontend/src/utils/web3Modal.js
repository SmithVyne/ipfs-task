import { createWeb3Modal, defaultConfig } from "@web3modal/ethers/react";

const metadata = {
  name: "Enjoy IPFS",
  description: "An app by Smith for enjoying IPFS",
  url: "https://mywebsite.com", // origin must match your domain & subdomain
  icons: ["https://avatars.mywebsite.com/"],
};

const mainnet = {
  chainId: 1,
  name: "Ethereum",
  currency: "ETH",
  explorerUrl: "https://etherscan.io",
  rpcUrl: "https://cloudflare-eth.com",
};

createWeb3Modal({
  ethersConfig: defaultConfig({
    metadata,
  }),
  chains: [mainnet],
  projectId: "ec727c7559f5b406de6495664a01307a",
});
