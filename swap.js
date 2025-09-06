import { swapSaros } from "@saros-finance/sdk/src/swap/index.js";
import { TokenProgramService }  from "@saros-finance/sdk/src/TokenProgramService/service.js";

import { Connection, Keypair, PublicKey, LAMPORTS_PER_SOL } from "@solana/web3.js";

const connection = new Connection("https://api.devnet.solana.com");

const wallet = Keypair.generate();

console.log(wallet.publicKey.toBase58());

await connection.requestAirdrop(wallet.publicKey, 2 * LAMPORTS_PER_SOL);

const mintAddressUSDC = new PublicKey("4zMMC9srt5Ri5X14GAgXhaHii3GnPAEERYPJgZJDncDU");

const mintAddressWSOL = new PublicKey("So11111111111111111111111111111111111111112");

let ataUSDC;

try {
    
    ataUSDC = await TokenProgramService.findAssociatedTokenAddress(wallet.publicKey, mintAddressUSDC);

} catch(err) {

    console.error(err);
}

let ataWSOL;

try {

    ataWSOL = await TokenProgramService.findAssociatedTokenAddress(wallet.publicKey, mintAddressWSOL);

} catch(err) {

    console.error(err);
}

console.log(ataUSDC.toBase58());

console.log(ataWSOL.toBase58());

const poolAddress = new PublicKey("<SOL-USDC-DEVNET-POOL-ADDRESS-HERE>");

try {
    
    const { isError, mess } = await swapSaros(

    connection,

    ataWSOL,

    ataUSDC,

    1.0,

    0.9,

    null,

    poolAddress,

    wallet.publicKey,

    mintAddressWSOL.toBase58(),

    mintAddressUSDC.toBase58()
)

} catch(err) {

    console.log(err);

}

if(isError) {

    console.error("Swap failed: ", mess);

} else {

    await connection.confirmTransaction(mess, "confirmed");

    console.log("Swap successful. Transaction hash is: ", mess);
}