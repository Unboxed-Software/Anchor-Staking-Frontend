import { useAnchorWallet, useConnection } from "@solana/wallet-adapter-react"
import {
  HeaderContainer,
  HeaderInfo,
  HeaderInfoContainer,
  HeaderTitle,
  HomeContainer,
  ImageButton,
  ImageCard,
  Vault,
  VaultContainer,
  VaultItems,
  VaultTitle,
} from "@/styles/home"
import { useEffect, useState } from "react"
import { PublicKey, Transaction } from "@solana/web3.js"
import { IdlAccounts, Program, ProgramAccount } from "@project-serum/anchor"
import Image from "next/image"
import { NftStakingDemo, IDL } from "@/utils/idl/nft_staking_test"
import { Nft, NftWithToken, Sft, SftWithToken } from "@metaplex-foundation/js"

type UserStakeInfoStruct = IdlAccounts<NftStakingDemo>["userStakeInfo"]
type UserInfoStruct = IdlAccounts<NftStakingDemo>["userInfo"]
interface UserStakeInfoType {
  pdaInfo: ProgramAccount<UserStakeInfoStruct>
  tokenInfo: Sft | SftWithToken | Nft | NftWithToken
}

export default function Home() {
  useEffect(() => {
    // Set initial state for the app
    // 1. Set your anchor program
    // 2. Set the user's staked NFTs (Vault)
    // 3. Set the user info (point balance)
    // 4. Set the user's NFTs in their wallet
  }, [])

  const handleStake = async (mint: PublicKey) => {
    // 1. Create the stake instruction
    // 2. Sign and send the transaction
    // 3. Update the user's staked NFTs (Vault)
    // 4. Update the user's NFTs in their wallet
  }

  const handleRedeem = async (mint: PublicKey) => {
    // 1. Create the redeem instruction
    // 2. Sign and send the transaction
    // 3. Update the use info (point balance)
  }

  const handleUnstake = async (mint: PublicKey) => {
    // 1. Create the unstake instruction
    // 2. Sign and send the transaction
    // 3. Update the user's staked NFTs (Vault)
    // 4. Update the user's NFTs in their wallet
    // 5. Update the user info (point balance)
  }

  return (
    <HomeContainer>
      <HeaderContainer>
        <HeaderInfoContainer>
          <HeaderTitle>NFT Staking Protocol</HeaderTitle>
          {/* Replace 0 with actual point balance */}
          <HeaderInfo>{`Total Rewards: ${0}`}</HeaderInfo>
        </HeaderInfoContainer>
      </HeaderContainer>
      <VaultContainer>
        <Vault>
          <VaultTitle>Wallet</VaultTitle>
          <VaultItems>
            <ImageCard>
              <Image
                src={
                  "https://arweave.net/YwUj2dD8gN9jViuDtsd0xGv_PNpeBvmEZ7B7TjVbJgg?ext=png"
                }
                alt={"Placeholder"}
                width={240}
                height={240}
              />
              <ImageButton
                onClick={() =>
                  handleStake(
                    new PublicKey(
                      "6HEYVpMjELoNavo2bUyxXAkjkA1feNUtDezJz8ef1MRB"
                    )
                  )
                }
              >
                Stake
              </ImageButton>
            </ImageCard>
          </VaultItems>
        </Vault>
        <Vault>
          <VaultTitle>Vault</VaultTitle>
          <VaultItems>
            <ImageCard>
              <Image
                src={
                  "https://arweave.net/YwUj2dD8gN9jViuDtsd0xGv_PNpeBvmEZ7B7TjVbJgg?ext=png"
                }
                alt={"Placeholder"}
                width={240}
                height={240}
              />
              <ImageButton
                onClick={() =>
                  handleUnstake(
                    new PublicKey(
                      "6HEYVpMjELoNavo2bUyxXAkjkA1feNUtDezJz8ef1MRB"
                    )
                  )
                }
              >
                Unstake
              </ImageButton>
              <ImageButton
                onClick={() =>
                  handleRedeem(
                    new PublicKey(
                      "6HEYVpMjELoNavo2bUyxXAkjkA1feNUtDezJz8ef1MRB"
                    )
                  )
                }
              >
                Redeem
              </ImageButton>
            </ImageCard>
          </VaultItems>
        </Vault>
      </VaultContainer>
    </HomeContainer>
  )
}
