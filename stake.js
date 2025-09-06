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
