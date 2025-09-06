import { SarosStakeServices } from "@saros-finance/sdk/src/stake/SarosStakeServices.js";
import { Connection, Keypair, PublicKey, LAMPORTS_PER_SOL } from "@solana/web3.js";
import BN from "bn.js";

const connection = new Connection("https://api.devnet.solana.com");

const payerAccount = Keypair.generate();

await connection.requestAirdrop(payerAccount.publicKey, 2 * LAMPORTS_PER_SOL);

const lpAddress = new PublicKey("<MINT_ADDRESS_OF_TOKEN_STAKED>")

const sarosFarmProgramAddress = new PublicKey("SFarmWM5wLFNEw1q5ofqL7CrwBMwdcqQgK6oQuoBGZJ");

const amount = new BN(10);

const poolAddress = new PublicKey("<ADDRESS_OF_TOKEN_VAULT>");

let sig;

try {

    sig = SarosStakeServices.stakePool(

        connection,

        payerAccount,

        poolAddress,

        amount,

        sarosFarmProgramAddress,

        [],

        lpAddress

    );


} catch(err) {

    console.error(err);
}

const result = await connection.confirmTransaction(sig, "confirmed");

console.log("Your tokens have been staked!");


let sig2;

const amount2 = new BN(5);

const isMaxBalance = false;

try {

    sig2 = SarosStakeServices.unstakePool(

        connection, // SOLANA RPC DEVNET connection, same as stake function

        payerAccount, // Same Keypair as the one that staked

        poolAddress, // address of the pool that has the tokens, same as stake function

        lpAddress, // mint address of the token that was staked, same as stake

        amount2, // amount that user wants unstaked

        sarosFarmProgramAddress, // same as stake

        [],

        isMaxBalance // set to true if user wants to unstake all previously staked tokens

    )

} catch(err) {

    console.err(err);

}

await connection.confirmTransaction(sig2, "confirmed");

console.log("Tokens have been unstaked!");


