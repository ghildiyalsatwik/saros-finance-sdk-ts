import { createPool } from "@saros-finance/sdk/src/swap/index.js";
import { Connection, Keypair, LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js";
import { TokenProgramService }  from "@saros-finance/sdk/src/TokenProgramService/service.js";

const connection = new Connection("https://api.devnet.solana.com");

const wallet = Keypair.generate();

await connection.requestAirdrop(wallet.publicKey, 2 * LAMPORTS_PER_SOL);

const owner = wallet.publicKey.toBase58();

const feeOwnerAddress = new PublicKey("<PROTOCOL_ADDRESS>");

const token0MintAddress = new PublicKey("<TOKEN_0_MINT_ADDRESS>");

const token1MintAddress = new PublicKey("<TOKEN_1_MINT_ADDRESS>");

let token0ATA;

let token1ATA;

try {

    token0ATA = TokenProgramService.findAssociatedTokenAddress(wallet.publicKey, token0MintAddress);

    token1ATA = TokenProgramService.findAssociatedTokenAddress(wallet.publicKey, token1MintAddress);


} catch(err) {

    console.log(err);
}


const USDTMintAddress = new PublicKey("<DEVNET_USDT_MINT_ADDRESS>");

const USDCMintAddress = new PublicKey("<DEVNET_USDC_MINT_ADDRESS>");

const flag = (token0MintAddress === USDCMintAddress && token1MintAddress === USDTMintAddress)
|| (token0MintAddress === USDTMintAddress && token1MintAddress === USDCMintAddress) ? 1 : 0;


const curveType = flag;

const curveParameters = flag

const TOKEN_PROGRAM_ID = new PublicKey("TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA");

const SAROS_SWAP_PROGRAM_ADDRESS_V1 = new PublicKey("SSwapUtytfBdBn1b9NUGG6foMVPtcWgpRU32HToDUZr");

const token0Amount = 1 * LAMPORTS_PER_SOL //assuming token0 to have 9 decimals

const token1Amount = 1 * LAMPORTS_PER_SOL //assuming token1 to have 9 decimals too

let result;

try {
    
    result = await createPool(

    connection,

    owner,

    token0MintAddress,

    token1MintAddress,

    token0ATA,

    token1ATA,

    token0Amount,

    token1Amount,

    curveType,

    curveParameters,

    TOKEN_PROGRAM_ID,

    SAROS_SWAP_PROGRAM_ADDRESS_V1
)

} catch(err) {

    console.log(err);
}

const { isError } = result

if(isError) {

    console.log("Pool creation failed!");

} else {

    const { hash } = result

    await connection.confirmTransaction(hash, "confirmed");

    console.log("Pool creation has succeeded!");
}
