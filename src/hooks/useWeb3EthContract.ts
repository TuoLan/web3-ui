import Web3 from 'web3';

export function useWeb3EthContract() {
  let web3Provider
  if (window.ethereum) {
    console.log(window.ethereum);

    web3Provider = window.ethereum
    window.ethereum.on('accountsChanged', (accounts: string[]) => {
      console.log(accounts[0]);
    })
    try {
      window.ethereum.request({ method: 'eth_requestAccounts' })
    } catch {
      console.error('error')
    }
  }
  const web3 = new Web3(web3Provider)
  // 编译后的 合约名+_metadata 中的
  const abi = [
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "_name",
          "type": "string"
        },
        {
          "internalType": "uint256",
          "name": "_count",
          "type": "uint256"
        }
      ],
      "name": "addTodo",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_i",
          "type": "uint256"
        }
      ],
      "name": "deleteTodo",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getUserTodoList",
      "outputs": [
        {
          "components": [
            {
              "internalType": "string",
              "name": "name",
              "type": "string"
            },
            {
              "internalType": "uint256",
              "name": "count",
              "type": "uint256"
            }
          ],
          "internalType": "struct TodoList.todoList[]",
          "name": "",
          "type": "tuple[]"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "userTodoList",
      "outputs": [
        {
          "internalType": "string",
          "name": "name",
          "type": "string"
        },
        {
          "internalType": "uint256",
          "name": "count",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    }
  ]

  // 合约地址
  const address = "0x1F1a97796A21E4975c52394f226096837651985A"
  const ethContract = new web3.eth.Contract(abi, address)
  const getAccounts = () => web3.eth.getAccounts()

  return {
    ethContract,
    getAccounts
  }
}