import * as anchor from "@project-serum/anchor"
import { Metadata, Metaplex, PublicKey } from "@metaplex-foundation/js"
import { getAssociatedTokenAddress } from "@solana/spl-token"
import { NftStakingDemo } from "./idl/nft_staking_test"
import { Connection } from "@solana/web3.js"

export const getUserInfo = async (
  program: anchor.Program<NftStakingDemo>,
  userPubkey: PublicKey
) => {
  const [userInfo, _userInfoBump] = PublicKey.findProgramAddressSync(
    [Buffer.from("user"), userPubkey.toBuffer()],
    program.programId
  )
  try {
    const userInfoData = await program.account.userInfo.fetch(userInfo)
    return userInfoData
  } catch (error) {
    console.log(error)
    return null
  }
}

export const getAllUserStakeInfo = async (
  program: anchor.Program<NftStakingDemo>,
  userPubkey: PublicKey
) => {
  const filter = [
    {
      memcmp: {
        offset: 8, //prepend for anchor's discriminator & tokenAccount
        bytes: userPubkey.toBase58(),
      },
    },
  ]
  const res = await program.account.userStakeInfo.all(filter)
  const metaplex = new Metaplex(program.provider.connection)
  const data = await Promise.all(
    res.map(async (item) => {
      const tokenInfo = await metaplex
        .nfts()
        .findByMint({ mintAddress: item.account.mint })
      return { pdaInfo: item, tokenInfo }
    })
  )
  return data
}

const COLLECTION_MINT = process.env.NEXT_PUBLIC_COLLECTION_MINT

export const getAllNftsOwnedByUser = async (
  connection: Connection,
  userPubkey: PublicKey
) => {
  const metaplex = new Metaplex(connection)

  const allNfts = await metaplex.nfts().findAllByOwner({ owner: userPubkey })
  const eligibleMints = allNfts.filter(
    (nft) => COLLECTION_MINT === nft.collection?.address.toString()
  )
  const data = await Promise.all(
    eligibleMints.map(
      async (item) =>
        await metaplex
          .nfts()
          .findByMint({ mintAddress: (item as Metadata).mintAddress })
    )
  )
  return data
}

export const getProgramPdaAddresses = async (
  program: anchor.Program<NftStakingDemo>,
  staker: PublicKey,
  mint: PublicKey
) => {
  const metaplex = new Metaplex(program.provider.connection)
  const { metadataAddress } = await metaplex
    .nfts()
    .findByMint({ mintAddress: mint })

  const [userStakeInfo, _userStakeInfoBump] = PublicKey.findProgramAddressSync(
    [
      Buffer.from(anchor.utils.bytes.utf8.encode("stake_info")),
      staker.toBuffer(),
      mint.toBuffer(),
    ],
    program.programId
  )
  const userNftAccount = await getAssociatedTokenAddress(mint, staker)

  const pdaNftAccount = await getAssociatedTokenAddress(
    mint,
    userStakeInfo,
    true
  )

  const [userInfo, _userInfoBump] = PublicKey.findProgramAddressSync(
    [Buffer.from(anchor.utils.bytes.utf8.encode("user")), staker.toBuffer()],
    program.programId
  )

  return {
    metadataAddress,
    userNftAccount,
    pdaNftAccount,
    userStakeInfo,
    userInfo,
  }
}
