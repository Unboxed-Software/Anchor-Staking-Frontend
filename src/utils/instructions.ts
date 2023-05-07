import * as anchor from "@project-serum/anchor"
import { PublicKey } from "@solana/web3.js"
import { getProgramPdaAddresses } from "./accounts"
import { NftStakingDemo } from "./idl/nft_staking_test"

export const createStakeIx = async (
  program: anchor.Program<NftStakingDemo>,
  staker: PublicKey,
  nftMint: PublicKey
) => {
  const { userNftAccount, pdaNftAccount } = await getProgramPdaAddresses(
    program,
    staker,
    nftMint
  )

  const ix = await program.methods
    .stake()
    .accounts({
      userNftAccount: userNftAccount,
      pdaNftAccount: pdaNftAccount,
      mint: nftMint,
    })
    .instruction()

  return ix
}

export const createRedeemIx = async (
  program: anchor.Program<NftStakingDemo>,
  nftMint: PublicKey
) => {
  const ix = await program.methods
    .redeem()
    .accounts({
      mint: nftMint,
    })
    .instruction()

  return ix
}

export const createUnstakeIx = async (
  program: anchor.Program<NftStakingDemo>,
  staker: PublicKey,
  nftMint: PublicKey
) => {
  const { userNftAccount, pdaNftAccount } = await getProgramPdaAddresses(
    program,
    staker,
    nftMint
  )

  const ix = await program.methods
    .unstake()
    .accounts({
      userNftAccount: userNftAccount,
      pdaNftAccount: pdaNftAccount,
      mint: nftMint,
    })
    .instruction()

  return ix
}
