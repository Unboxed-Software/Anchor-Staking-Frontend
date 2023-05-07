export type NftStakingDemo = {
  version: "0.1.0"
  name: "nft_staking_test"
  instructions: [
    {
      name: "stake"
      accounts: [
        {
          name: "userInfo"
          isMut: true
          isSigner: false
          pda: {
            seeds: [
              {
                kind: "const"
                type: "string"
                value: "user"
              },
              {
                kind: "account"
                type: "publicKey"
                path: "initializer"
              }
            ]
          }
        },
        {
          name: "stakingInfo"
          isMut: true
          isSigner: false
          pda: {
            seeds: [
              {
                kind: "const"
                type: "string"
                value: "stake_info"
              },
              {
                kind: "account"
                type: "publicKey"
                path: "initializer"
              },
              {
                kind: "account"
                type: "publicKey"
                account: "Mint"
                path: "mint"
              }
            ]
          }
        },
        {
          name: "initializer"
          isMut: true
          isSigner: true
        },
        {
          name: "userNftAccount"
          isMut: true
          isSigner: false
        },
        {
          name: "pdaNftAccount"
          isMut: true
          isSigner: false
        },
        {
          name: "mint"
          isMut: false
          isSigner: false
        },
        {
          name: "tokenProgram"
          isMut: false
          isSigner: false
        },
        {
          name: "associatedTokenProgram"
          isMut: false
          isSigner: false
        },
        {
          name: "systemProgram"
          isMut: false
          isSigner: false
        },
        {
          name: "rent"
          isMut: false
          isSigner: false
        }
      ]
      args: []
    },
    {
      name: "redeem"
      accounts: [
        {
          name: "userInfo"
          isMut: true
          isSigner: false
          pda: {
            seeds: [
              {
                kind: "const"
                type: "string"
                value: "user"
              },
              {
                kind: "account"
                type: "publicKey"
                path: "payer"
              }
            ]
          }
        },
        {
          name: "stakingInfo"
          isMut: true
          isSigner: false
          pda: {
            seeds: [
              {
                kind: "const"
                type: "string"
                value: "stake_info"
              },
              {
                kind: "account"
                type: "publicKey"
                path: "payer"
              },
              {
                kind: "account"
                type: "publicKey"
                account: "Mint"
                path: "mint"
              }
            ]
          }
        },
        {
          name: "payer"
          isMut: true
          isSigner: true
        },
        {
          name: "mint"
          isMut: false
          isSigner: false
        },
        {
          name: "systemProgram"
          isMut: false
          isSigner: false
        }
      ]
      args: []
    },
    {
      name: "unstake"
      accounts: [
        {
          name: "userInfo"
          isMut: true
          isSigner: false
          pda: {
            seeds: [
              {
                kind: "const"
                type: "string"
                value: "user"
              },
              {
                kind: "account"
                type: "publicKey"
                path: "initializer"
              }
            ]
          }
        },
        {
          name: "stakingInfo"
          isMut: true
          isSigner: false
          pda: {
            seeds: [
              {
                kind: "const"
                type: "string"
                value: "stake_info"
              },
              {
                kind: "account"
                type: "publicKey"
                path: "initializer"
              },
              {
                kind: "account"
                type: "publicKey"
                account: "Mint"
                path: "mint"
              }
            ]
          }
        },
        {
          name: "initializer"
          isMut: true
          isSigner: true
        },
        {
          name: "userNftAccount"
          isMut: true
          isSigner: false
        },
        {
          name: "pdaNftAccount"
          isMut: true
          isSigner: false
        },
        {
          name: "mint"
          isMut: false
          isSigner: false
        },
        {
          name: "tokenProgram"
          isMut: false
          isSigner: false
        },
        {
          name: "systemProgram"
          isMut: false
          isSigner: false
        }
      ]
      args: []
    }
  ]
  accounts: [
    {
      name: "userInfo"
      type: {
        kind: "struct"
        fields: [
          {
            name: "isInitialized"
            type: "bool"
          },
          {
            name: "pointBalance"
            type: "u64"
          },
          {
            name: "activeStake"
            type: "u16"
          }
        ]
      }
    },
    {
      name: "userStakeInfo"
      type: {
        kind: "struct"
        fields: [
          {
            name: "staker"
            type: "publicKey"
          },
          {
            name: "mint"
            type: "publicKey"
          },
          {
            name: "stakeStartTime"
            type: "u64"
          },
          {
            name: "lastStakeRedeem"
            type: "u64"
          },
          {
            name: "stakeState"
            type: {
              defined: "StakeState"
            }
          }
        ]
      }
    }
  ]
  types: [
    {
      name: "StakeState"
      type: {
        kind: "enum"
        variants: [
          {
            name: "Staked"
          },
          {
            name: "Unstaked"
          }
        ]
      }
    }
  ]
}

export const IDL: NftStakingDemo = {
  version: "0.1.0",
  name: "nft_staking_test",
  instructions: [
    {
      name: "stake",
      accounts: [
        {
          name: "userInfo",
          isMut: true,
          isSigner: false,
          pda: {
            seeds: [
              {
                kind: "const",
                type: "string",
                value: "user",
              },
              {
                kind: "account",
                type: "publicKey",
                path: "initializer",
              },
            ],
          },
        },
        {
          name: "stakingInfo",
          isMut: true,
          isSigner: false,
          pda: {
            seeds: [
              {
                kind: "const",
                type: "string",
                value: "stake_info",
              },
              {
                kind: "account",
                type: "publicKey",
                path: "initializer",
              },
              {
                kind: "account",
                type: "publicKey",
                account: "Mint",
                path: "mint",
              },
            ],
          },
        },
        {
          name: "initializer",
          isMut: true,
          isSigner: true,
        },
        {
          name: "userNftAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "pdaNftAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "mint",
          isMut: false,
          isSigner: false,
        },
        {
          name: "tokenProgram",
          isMut: false,
          isSigner: false,
        },
        {
          name: "associatedTokenProgram",
          isMut: false,
          isSigner: false,
        },
        {
          name: "systemProgram",
          isMut: false,
          isSigner: false,
        },
        {
          name: "rent",
          isMut: false,
          isSigner: false,
        },
      ],
      args: [],
    },
    {
      name: "redeem",
      accounts: [
        {
          name: "userInfo",
          isMut: true,
          isSigner: false,
          pda: {
            seeds: [
              {
                kind: "const",
                type: "string",
                value: "user",
              },
              {
                kind: "account",
                type: "publicKey",
                path: "payer",
              },
            ],
          },
        },
        {
          name: "stakingInfo",
          isMut: true,
          isSigner: false,
          pda: {
            seeds: [
              {
                kind: "const",
                type: "string",
                value: "stake_info",
              },
              {
                kind: "account",
                type: "publicKey",
                path: "payer",
              },
              {
                kind: "account",
                type: "publicKey",
                account: "Mint",
                path: "mint",
              },
            ],
          },
        },
        {
          name: "payer",
          isMut: true,
          isSigner: true,
        },
        {
          name: "mint",
          isMut: false,
          isSigner: false,
        },
        {
          name: "systemProgram",
          isMut: false,
          isSigner: false,
        },
      ],
      args: [],
    },
    {
      name: "unstake",
      accounts: [
        {
          name: "userInfo",
          isMut: true,
          isSigner: false,
          pda: {
            seeds: [
              {
                kind: "const",
                type: "string",
                value: "user",
              },
              {
                kind: "account",
                type: "publicKey",
                path: "initializer",
              },
            ],
          },
        },
        {
          name: "stakingInfo",
          isMut: true,
          isSigner: false,
          pda: {
            seeds: [
              {
                kind: "const",
                type: "string",
                value: "stake_info",
              },
              {
                kind: "account",
                type: "publicKey",
                path: "initializer",
              },
              {
                kind: "account",
                type: "publicKey",
                account: "Mint",
                path: "mint",
              },
            ],
          },
        },
        {
          name: "initializer",
          isMut: true,
          isSigner: true,
        },
        {
          name: "userNftAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "pdaNftAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "mint",
          isMut: false,
          isSigner: false,
        },
        {
          name: "tokenProgram",
          isMut: false,
          isSigner: false,
        },
        {
          name: "systemProgram",
          isMut: false,
          isSigner: false,
        },
      ],
      args: [],
    },
  ],
  accounts: [
    {
      name: "userInfo",
      type: {
        kind: "struct",
        fields: [
          {
            name: "isInitialized",
            type: "bool",
          },
          {
            name: "pointBalance",
            type: "u64",
          },
          {
            name: "activeStake",
            type: "u16",
          },
        ],
      },
    },
    {
      name: "userStakeInfo",
      type: {
        kind: "struct",
        fields: [
          {
            name: "staker",
            type: "publicKey",
          },
          {
            name: "mint",
            type: "publicKey",
          },
          {
            name: "stakeStartTime",
            type: "u64",
          },
          {
            name: "lastStakeRedeem",
            type: "u64",
          },
          {
            name: "stakeState",
            type: {
              defined: "StakeState",
            },
          },
        ],
      },
    },
  ],
  types: [
    {
      name: "StakeState",
      type: {
        kind: "enum",
        variants: [
          {
            name: "Staked",
          },
          {
            name: "Unstaked",
          },
        ],
      },
    },
  ],
}
