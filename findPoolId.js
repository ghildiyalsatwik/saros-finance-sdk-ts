import { Connection, PublicKey } from "@solana/web3.js";
import { getPoolInfo } from "@saros-finance/sdk/src/swap/index.js";

const connection = new Connection("https://api.devnet.solana.com");

const SAROS_SWAP_PROGRAM_ADDRESS_V1 = new PublicKey("SSwapUtytfBdBn1b9NUGG6foMVPtcWgpRU32HToDUZr");

const pools = await connection.getProgramAccounts(SAROS_SWAP_PROGRAM_ADDRESS_V1);

const SOL_MINT = "So11111111111111111111111111111111111111112";

const USDC_MINT = "4zMMC9srt5Ri5X14GAgXhaHii3GnPAEERYPJgZJDncDU";

let poolId

for(let pool of pools) {

    const poolInfo = await getPoolInfo(connection, pool.pubkey);

    if(!poolInfo) continue;

    const token0Mint = poolInfo.token0Mint.toBase58();

    const token1Mint = poolInfo.token1Mint.toBase58();

    if(token0Mint === USDC_MINT || token1Mint === USDC_MINT) {

        console.log("USDC mint address found!");
    }

    if((token0Mint === SOL_MINT && token1Mint === USDC_MINT) || (token0Mint === USDC_MINT && token1Mint === SOL_MINT)) {
     
        poolId = pool.pubkey;
        
        break;
    
    }
}

console.log(poolId);