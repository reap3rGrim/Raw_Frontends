const { ethers } = require("ethers");
const { contractAddresses } = require("./constants");

if (typeof window.ethereum == "undefined") {
  document.getElementById("buttons").style.display = "none";
  document.getElementById("metadata").innerHTML = "Please install metamask!";
}

document.querySelector("#connectButton").addEventListener("click", connect);
document.querySelector("#enterRaffle").addEventListener("click", enterRaffle);

async function connect() {
  if (typeof window.ethereum !== "undefined") {
    try {
      await ethereum.request({ method: "eth_requestAccounts" });
    } catch (error) {
      console.log(error);
    }
    const accounts = await ethereum.request({ method: "eth_accounts" });
    if (accounts) {
      document.getElementById("connectButton").innerHTML = "Connected";
    }
  }
}

async function enterRaffle() {
  const contractAddress = "0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9";
  const abi = [
    {
      type: "constructor",
      payable: false,
      inputs: [
        { type: "address", name: "vrfCoordinatorV2" },
        { type: "uint256", name: "entranceFee" },
        { type: "bytes32", name: "gasLane" },
        { type: "uint64", name: "subscriptionId" },
        { type: "uint32", name: "callbackGasLimit" },
        { type: "uint256", name: "interval" },
      ],
    },
    {
      type: "error",
      name: "OnlyCoordinatorCanFulfill",
      inputs: [
        { type: "address", name: "have" },
        { type: "address", name: "want" },
      ],
    },
    { type: "error", name: "Raffle__NotEnoughETHEntered", inputs: [] },
    { type: "error", name: "Raffle__NotOpen", inputs: [] },
    { type: "error", name: "Raffle__TransferFailed", inputs: [] },
    {
      type: "error",
      name: "Raffle__UpkeepNotNeeded",
      inputs: [
        { type: "uint256", name: "currentBalance" },
        { type: "uint256", name: "numPlayers" },
        { type: "uint256", name: "raffleState" },
      ],
    },
    {
      type: "event",
      anonymous: false,
      name: "RaffleEnter",
      inputs: [{ type: "address", name: "player", indexed: true }],
    },
    {
      type: "event",
      anonymous: false,
      name: "RequestedRaffleWinner",
      inputs: [{ type: "uint256", name: "requestId", indexed: true }],
    },
    {
      type: "event",
      anonymous: false,
      name: "WinnerPicked",
      inputs: [{ type: "address", name: "winner", indexed: true }],
    },
    {
      type: "function",
      name: "checkUpkeep",
      constant: false,
      payable: false,
      gas: 29000000,
      inputs: [{ type: "bytes" }],
      outputs: [{ type: "bool", name: "upKeepNeeded" }, { type: "bytes" }],
    },
    {
      type: "function",
      name: "enterRaffle",
      constant: false,
      stateMutability: "payable",
      payable: true,
      gas: 29000000,
      inputs: [],
      outputs: [],
    },
    {
      type: "function",
      name: "getEntranceFee",
      constant: true,
      stateMutability: "view",
      payable: false,
      gas: 29000000,
      inputs: [],
      outputs: [{ type: "uint256" }],
    },
    {
      type: "function",
      name: "getInterval",
      constant: true,
      stateMutability: "view",
      payable: false,
      gas: 29000000,
      inputs: [],
      outputs: [{ type: "uint256" }],
    },
    {
      type: "function",
      name: "getLatestTimeStamp",
      constant: true,
      stateMutability: "view",
      payable: false,
      gas: 29000000,
      inputs: [],
      outputs: [{ type: "uint256" }],
    },
    {
      type: "function",
      name: "getNumWords",
      constant: true,
      stateMutability: "pure",
      payable: false,
      gas: 29000000,
      inputs: [],
      outputs: [{ type: "uint256" }],
    },
    {
      type: "function",
      name: "getNumberOfPlayers",
      constant: true,
      stateMutability: "view",
      payable: false,
      gas: 29000000,
      inputs: [],
      outputs: [{ type: "uint256" }],
    },
    {
      type: "function",
      name: "getPlayer",
      constant: true,
      stateMutability: "view",
      payable: false,
      gas: 29000000,
      inputs: [{ type: "uint256", name: "index" }],
      outputs: [{ type: "address" }],
    },
    {
      type: "function",
      name: "getRaffleState",
      constant: true,
      stateMutability: "view",
      payable: false,
      gas: 29000000,
      inputs: [],
      outputs: [{ type: "uint8" }],
    },
    {
      type: "function",
      name: "getRecentWinner",
      constant: true,
      stateMutability: "view",
      payable: false,
      gas: 29000000,
      inputs: [],
      outputs: [{ type: "address" }],
    },
    {
      type: "function",
      name: "getRequestConfirmations",
      constant: true,
      stateMutability: "pure",
      payable: false,
      gas: 29000000,
      inputs: [],
      outputs: [{ type: "uint256" }],
    },
    {
      type: "function",
      name: "performUpkeep",
      constant: false,
      payable: false,
      gas: 29000000,
      inputs: [{ type: "bytes" }],
      outputs: [],
    },
    {
      type: "function",
      name: "rawFulfillRandomWords",
      constant: false,
      payable: false,
      gas: 29000000,
      inputs: [
        { type: "uint256", name: "requestId" },
        { type: "uint256[]", name: "randomWords" },
      ],
      outputs: [],
    },
  ];

  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  const contract = new ethers.Contract(contractAddress, abi, signer);

  try {
    await contract.enterRaffle();
  } catch (error) {
    console.log(e);
  }
}
