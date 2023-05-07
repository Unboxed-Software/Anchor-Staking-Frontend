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
import {
  getAllNftsOwnedByUser,
  getAllUserStakeInfo,
  getUserInfo,
} from "@/utils/accounts"
import {
  createRedeemIx,
  createStakeIx,
  createUnstakeIx,
} from "@/utils/instructions"
import { getNftStakingProgram, signAndSendTx } from "@/utils/anchor"
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
  const [mintsInWallet, setMintsInWallet] = useState<
    (Sft | SftWithToken | Nft | NftWithToken)[]
  >([])
  const [nftStakingProgram, setNftStakingProgram] =
    useState<Program<NftStakingDemo> | null>(null)
  const [userInfo, setUserInfo] = useState<UserInfoStruct | null>(null)
  const [allUserStakeInfo, setAllUserStakeInfo] = useState<
    UserStakeInfoType[] | null
  >(null)
  const { connection } = useConnection()
  const wallet = useAnchorWallet()

  useEffect(() => {
    if (wallet) {
      ;(async () => {
        const program = getNftStakingProgram(
          connection,
          wallet,
          IDL,
          new PublicKey(process.env.NEXT_PUBLIC_NFT_STAKING_PROGRAM_ID ?? "")
        )
        const allUserStakeInfo = await getAllUserStakeInfo(
          program,
          wallet.publicKey
        )
        setNftStakingProgram(program)
        const userInfo = await getUserInfo(program, wallet.publicKey)
        setUserInfo(userInfo)

        setAllUserStakeInfo(allUserStakeInfo)
        const eligibleMints = await getAllNftsOwnedByUser(
          program.provider.connection,
          wallet.publicKey
        )
        setMintsInWallet(eligibleMints)
      })()
    }
  }, [wallet])

  // Allow user to select a mint and stake

  const handleStake = async (mint: PublicKey) => {
    if (wallet && nftStakingProgram && mint) {
      const stakeIx = await createStakeIx(
        nftStakingProgram,
        wallet.publicKey,
        mint // Selected Mint
      )

      const tx = new Transaction()
      tx.add(stakeIx)
      const txSig = await signAndSendTx(connection, tx, wallet)
      console.log(`https://solscan.io/tx/${txSig}?cluster=devnet`)
      const allUserStakeInfo = await getAllUserStakeInfo(
        nftStakingProgram,
        wallet.publicKey
      )

      setAllUserStakeInfo(allUserStakeInfo)
      const eligibleMint = await getAllNftsOwnedByUser(
        nftStakingProgram.provider.connection,
        wallet.publicKey
      )
      setMintsInWallet(eligibleMint)
    }
  }
  const handleRedeem = async (mint: PublicKey) => {
    if (wallet && nftStakingProgram && mint) {
      const stakeIx = await createRedeemIx(nftStakingProgram, mint)

      const tx = new Transaction()
      tx.add(stakeIx)
      const txSig = await signAndSendTx(connection, tx, wallet)
      console.log(`https://solscan.io/tx/${txSig}?cluster=devnet`)
      const userInfo = await getUserInfo(nftStakingProgram, wallet.publicKey)
      setUserInfo(userInfo)
    }
  }
  const handleUnstake = async (mint: PublicKey) => {
    if (wallet && nftStakingProgram && mint) {
      const stakeIx = await createUnstakeIx(
        nftStakingProgram,
        wallet.publicKey,
        mint
      )

      const tx = new Transaction()
      tx.add(stakeIx)
      const txSig = await signAndSendTx(connection, tx, wallet)
      console.log(`https://solscan.io/tx/${txSig}?cluster=devnet`)
      const allUserStakeInfo = await getAllUserStakeInfo(
        nftStakingProgram,
        wallet.publicKey
      )
      setAllUserStakeInfo(allUserStakeInfo)
      const eligibleMint = await getAllNftsOwnedByUser(
        nftStakingProgram.provider.connection,
        wallet.publicKey
      )
      setMintsInWallet(eligibleMint)
      const userInfo = await getUserInfo(nftStakingProgram, wallet.publicKey)
      setUserInfo(userInfo)
    }
  }

  return (
    <HomeContainer>
      <HeaderContainer>
        <HeaderInfoContainer>
          <HeaderTitle>NFT Staking Protocol</HeaderTitle>
          {userInfo && (
            <HeaderInfo>{`Total Rewards: ${userInfo.pointBalance}`}</HeaderInfo>
          )}
        </HeaderInfoContainer>
      </HeaderContainer>
      <VaultContainer>
        <Vault>
          <VaultTitle>Wallet</VaultTitle>
          <VaultItems>
            {mintsInWallet &&
              mintsInWallet.map((mintInfo, key) => (
                <ImageCard key={key}>
                  <Image
                    src={mintInfo.json?.image || ""}
                    alt={mintInfo.name}
                    width={240}
                    height={240}
                  />
                  <ImageButton
                    onClick={() => handleStake(mintInfo.mint.address)}
                  >
                    Stake
                  </ImageButton>
                </ImageCard>
              ))}
          </VaultItems>
        </Vault>
        <Vault>
          <VaultTitle>Vault</VaultTitle>
          <VaultItems>
            {allUserStakeInfo &&
              allUserStakeInfo.map(
                (userStakeInfo, key) =>
                  Object.keys(
                    userStakeInfo.pdaInfo.account.stakeState
                  ).includes("staked") && (
                    <ImageCard key={key}>
                      <Image
                        src={userStakeInfo.tokenInfo.json?.image || ""}
                        alt={userStakeInfo.tokenInfo.name}
                        width={240}
                        height={240}
                      />
                      <ImageButton
                        onClick={() =>
                          handleUnstake(userStakeInfo.pdaInfo.account.mint)
                        }
                      >
                        Unstake
                      </ImageButton>
                      <ImageButton
                        onClick={() =>
                          handleRedeem(userStakeInfo.pdaInfo.account.mint)
                        }
                      >
                        Redeem
                      </ImageButton>
                    </ImageCard>
                  )
              )}
          </VaultItems>
        </Vault>
      </VaultContainer>
    </HomeContainer>
  )
}
