const IntuABI =  [
    {
      "inputs": [],
      "stateMutability": "payable",
      "type": "constructor"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "bool",
          "name": "readyToRotate",
          "type": "bool"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "_vote",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "address",
          "name": "_rotationThreshold",
          "type": "address"
        }
      ],
      "name": "ParticipantRotationComplete",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "address",
          "name": "_userAddress",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "_vote",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "_rotationThreshold",
          "type": "uint256"
        }
      ],
      "name": "ParticipantRotationVote",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "vault_id",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "address",
          "name": "proposedRotateUser",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "userVotes",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "addOrRemove",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "bool",
          "name": "readyToRotate",
          "type": "bool"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "rotationThreshold",
          "type": "uint256"
        }
      ],
      "name": "RotateUser",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "address",
          "name": "_userAddress",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "bytes",
          "name": "txData",
          "type": "bytes"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "count",
          "type": "uint256"
        }
      ],
      "name": "SubmitTransaction",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "threshold",
          "type": "uint256"
        }
      ],
      "name": "ThreshldRotationReached",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "txId",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "threshold",
          "type": "uint256"
        }
      ],
      "name": "ThreshldTxReached",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "vaultID",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "string",
          "name": "_type",
          "type": "string"
        },
        {
          "indexed": false,
          "internalType": "address",
          "name": "thresholdUser",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "thProposed",
          "type": "uint256"
        }
      ],
      "name": "ThresholdVote",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "address",
          "name": "_userAddress",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "txId",
          "type": "uint256"
        }
      ],
      "name": "TransactionConfirm",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "txId",
          "type": "uint256"
        }
      ],
      "name": "TransactionSent",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "idVault",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "address",
          "name": "userProposedToRotate",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "bool",
          "name": "canBeRotate",
          "type": "bool"
        }
      ],
      "name": "dataAfterRotation",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "idVault",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "address",
          "name": "userProposedToRotate",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "bool",
          "name": "canBeRotate",
          "type": "bool"
        }
      ],
      "name": "dataBeforeRotation",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "vid",
          "type": "uint256"
        }
      ],
      "name": "idv",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "countapprouve",
          "type": "uint256"
        }
      ],
      "name": "info",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "i",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "bytes32",
          "name": "b",
          "type": "bytes32"
        },
        {
          "indexed": false,
          "internalType": "string",
          "name": "str",
          "type": "string"
        }
      ],
      "name": "look",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "vaultId",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "bool",
          "name": "isThresholdCanChange",
          "type": "bool"
        }
      ],
      "name": "thCanChange",
      "type": "event"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "admin",
      "outputs": [
        {
          "internalType": "string",
          "name": "newName",
          "type": "string"
        },
        {
          "internalType": "uint256",
          "name": "newThreshold",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "thresholdType",
          "type": "uint256"
        },
        {
          "internalType": "bool",
          "name": "isThresholdCanChange",
          "type": "bool"
        },
        {
          "internalType": "bool",
          "name": "isNameCanChange",
          "type": "bool"
        },
        {
          "internalType": "uint256",
          "name": "AdminThreshold",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "thresholdVotes",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "nameVotes",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_vaultId",
          "type": "uint256"
        },
        {
          "internalType": "address[]",
          "name": "_userAddresses",
          "type": "address[]"
        }
      ],
      "name": "cleanupNameProposal",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_vaultId",
          "type": "uint256"
        },
        {
          "internalType": "address[]",
          "name": "_userAddresses",
          "type": "address[]"
        }
      ],
      "name": "cleanupRotation",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_vaultId",
          "type": "uint256"
        },
        {
          "internalType": "address[]",
          "name": "_userAddresses",
          "type": "address[]"
        }
      ],
      "name": "cleanupThresholdProposal",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address[]",
          "name": "_proposedAddresses",
          "type": "address[]"
        },
        {
          "internalType": "string",
          "name": "_vaultName",
          "type": "string"
        },
        {
          "internalType": "uint256[3]",
          "name": "_thresholds",
          "type": "uint256[3]"
        },
        {
          "internalType": "string",
          "name": "_userPublicKeyForEncryption",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "_encryptionMessage",
          "type": "string"
        }
      ],
      "name": "create",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "createdVaults",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "id",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "registered",
          "type": "uint256"
        },
        {
          "internalType": "string",
          "name": "vaultName",
          "type": "string"
        },
        {
          "internalType": "uint256",
          "name": "rotateThreshold",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "transactionThreshold",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "adminThreshold",
          "type": "uint256"
        },
        {
          "internalType": "string",
          "name": "encryptionMessage",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "encryptedShares",
          "type": "string"
        },
        {
          "internalType": "bytes",
          "name": "masterPubKey",
          "type": "bytes"
        },
        {
          "internalType": "uint256",
          "name": "createdDate",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "vaultId",
          "type": "uint256"
        },
        {
          "internalType": "string",
          "name": "_userPublicKeyForEncryption",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "_userEncryptedShare",
          "type": "string"
        }
      ],
      "name": "doRotation",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_txId",
          "type": "uint256"
        },
        {
          "internalType": "address[]",
          "name": "registeredUsers",
          "type": "address[]"
        }
      ],
      "name": "gatherSignedShares",
      "outputs": [
        {
          "internalType": "string[]",
          "name": "",
          "type": "string[]"
        },
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        },
        {
          "internalType": "address[]",
          "name": "",
          "type": "address[]"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_txId",
          "type": "uint256"
        },
        {
          "internalType": "address",
          "name": "userAddress",
          "type": "address"
        }
      ],
      "name": "gatherUserSignedShare",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_vaultId",
          "type": "uint256"
        },
        {
          "internalType": "address",
          "name": "_voterAddress",
          "type": "address"
        }
      ],
      "name": "getRotationDetails",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        },
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        },
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        },
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        },
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_vaultId",
          "type": "uint256"
        }
      ],
      "name": "getRotationDetailsForRotate",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        },
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        },
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_vaultId",
          "type": "uint256"
        }
      ],
      "name": "getRotationInfo",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        },
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        },
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        },
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        },
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_vaultId",
          "type": "uint256"
        }
      ],
      "name": "getThresholdStatusForChange",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        },
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        },
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        },
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        },
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_vaultId",
          "type": "uint256"
        }
      ],
      "name": "getThresholdStatusForVault",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        },
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        },
        {
          "internalType": "bool[2]",
          "name": "",
          "type": "bool[2]"
        },
        {
          "internalType": "bool[2]",
          "name": "",
          "type": "bool[2]"
        },
        {
          "internalType": "uint256[3]",
          "name": "",
          "type": "uint256[3]"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_txId",
          "type": "uint256"
        },
        {
          "internalType": "address",
          "name": "addr",
          "type": "address"
        }
      ],
      "name": "getTransactionDetails",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        },
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        },
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        },
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "txId",
          "type": "uint256"
        }
      ],
      "name": "getTransactionInfo",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        },
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        },
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        },
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_txId",
          "type": "uint256"
        },
        {
          "internalType": "address",
          "name": "userAddress",
          "type": "address"
        }
      ],
      "name": "getUserSignedShares",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getUserVaults",
      "outputs": [
        {
          "internalType": "uint256[]",
          "name": "",
          "type": "uint256[]"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_vaultId",
          "type": "uint256"
        }
      ],
      "name": "getVaultChangeProposalInfo",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        },
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        },
        {
          "internalType": "bool[2]",
          "name": "",
          "type": "bool[2]"
        },
        {
          "internalType": "bool[2]",
          "name": "",
          "type": "bool[2]"
        },
        {
          "internalType": "uint256[3]",
          "name": "",
          "type": "uint256[3]"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "vaultId",
          "type": "uint256"
        }
      ],
      "name": "getVaultInfo",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        },
        {
          "internalType": "address[]",
          "name": "",
          "type": "address[]"
        },
        {
          "internalType": "uint256[2]",
          "name": "",
          "type": "uint256[2]"
        },
        {
          "internalType": "bytes",
          "name": "",
          "type": "bytes"
        },
        {
          "internalType": "uint256[3]",
          "name": "",
          "type": "uint256[3]"
        },
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        },
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_vaultId",
          "type": "uint256"
        }
      ],
      "name": "getVaultTransactions",
      "outputs": [
        {
          "internalType": "uint256[]",
          "name": "",
          "type": "uint256[]"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "vaultId",
          "type": "uint256"
        }
      ],
      "name": "performNameChange",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "vaultId",
          "type": "uint256"
        }
      ],
      "name": "performThresholdChange",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "vaultId",
          "type": "uint256"
        },
        {
          "internalType": "string",
          "name": "newName",
          "type": "string"
        },
        {
          "internalType": "uint256",
          "name": "vaultCurrentThreshold",
          "type": "uint256"
        }
      ],
      "name": "proposeNameChange",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "vaultId",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "newThreshold",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "thresholdType",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "vaultCurrentThreshold",
          "type": "uint256"
        }
      ],
      "name": "proposeThresholdChange",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "abiEncodedTx",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "emptyTx",
          "type": "string"
        },
        {
          "internalType": "uint256",
          "name": "vaultId",
          "type": "uint256"
        }
      ],
      "name": "proposeTransaction",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "vaultId",
          "type": "uint256"
        },
        {
          "internalType": "address",
          "name": "addressProposed",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "addOrRemove",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "thresholdRotation",
          "type": "uint256"
        }
      ],
      "name": "proposeUserForRotation",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "vaultId",
          "type": "uint256"
        },
        {
          "internalType": "string",
          "name": "_userPublicKeyForEncryption",
          "type": "string"
        }
      ],
      "name": "register",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_number",
          "type": "uint256"
        }
      ],
      "name": "safeNumber",
      "outputs": [],
      "stateMutability": "pure",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_vaultId",
          "type": "uint256"
        },
        {
          "internalType": "string",
          "name": "_name",
          "type": "string"
        },
        {
          "internalType": "uint256",
          "name": "_adminTH",
          "type": "uint256"
        }
      ],
      "name": "submitNameChangeProposal",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_vaultId",
          "type": "uint256"
        },
        {
          "internalType": "address",
          "name": "_proposedRotateUser",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "_addOrRemove",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "_rotationThreshold",
          "type": "uint256"
        },
        {
          "internalType": "address",
          "name": "proposer",
          "type": "address"
        }
      ],
      "name": "submitRotationProposal",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_vaultId",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "_NewThreshold",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "_thTypes",
          "type": "uint256"
        },
        {
          "internalType": "address",
          "name": "_addressproposer",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "_VaultCurrentThreshold",
          "type": "uint256"
        }
      ],
      "name": "submitThresholdChangeProposal",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "abiEncodedTx",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "emptyTx",
          "type": "string"
        },
        {
          "internalType": "address",
          "name": "addr",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "_vaultID",
          "type": "uint256"
        }
      ],
      "name": "submitTransaction",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "transactionsInVault",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "txApprovedCount",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "txEmpty",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "txList",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_txId",
          "type": "uint256"
        }
      ],
      "name": "txReadyToBeSent",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "txSendingPeriod",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "txSent",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        },
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "name": "userApprovedTx",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "vaultId",
          "type": "uint256"
        },
        {
          "internalType": "string[]",
          "name": "encryptedShares",
          "type": "string[]"
        },
        {
          "internalType": "bytes",
          "name": "_masterPubKey",
          "type": "bytes"
        }
      ],
      "name": "userCompleteVault",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_vaultId",
          "type": "uint256"
        },
        {
          "internalType": "address",
          "name": "_voter",
          "type": "address"
        }
      ],
      "name": "userConfirmRotation",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_txId",
          "type": "uint256"
        },
        {
          "internalType": "string",
          "name": "_confirmation",
          "type": "string"
        },
        {
          "internalType": "address",
          "name": "addr",
          "type": "address"
        }
      ],
      "name": "userConfirmTransaction",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "txId",
          "type": "uint256"
        },
        {
          "internalType": "string",
          "name": "confirmation",
          "type": "string"
        },
        {
          "internalType": "uint256",
          "name": "vaultId",
          "type": "uint256"
        }
      ],
      "name": "userConfirmTx",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        },
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "name": "userEncryptedShareForVaults",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        },
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "name": "userIsRegistered",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        },
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "name": "userPublicKeyForEncryption",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
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
      "name": "userVaults",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "vaultId",
          "type": "uint256"
        }
      ],
      "name": "userVoteForRotation",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_vaultId",
          "type": "uint256"
        },
        {
          "internalType": "address",
          "name": "_addressVoter",
          "type": "address"
        }
      ],
      "name": "userVoteOnNameChange",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_vaultId",
          "type": "uint256"
        },
        {
          "internalType": "address",
          "name": "_addressVoter",
          "type": "address"
        }
      ],
      "name": "userVoteOnThresholdChange",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "vaultId",
          "type": "uint256"
        }
      ],
      "name": "voteOnNameChange",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "vaultId",
          "type": "uint256"
        }
      ],
      "name": "voteOnThresholdChange",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    }
]


export {
    IntuABI
}