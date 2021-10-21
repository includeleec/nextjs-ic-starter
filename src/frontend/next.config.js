const CanisterIds = require("./canister_ids.json");

const DFX_NETWORK = process.env.NEXT_PUBLIC_DFX_NETWORK || "local"

const getCanisterId = (canisterId) => {
    return CanisterIds[canisterId][DFX_NETWORK]
}

const HELLO_CANISTER_ID = getCanisterId('hello')
const WHOAMI_CANISTER_ID = getCanisterId('whoami')

    
console.log(`DFX_NETWORK=${DFX_NETWORK}`);
console.log(`HELLO_CANISTER_ID=${HELLO_CANISTER_ID}`);
console.log(`WHOAMI_CANISTER_ID=${WHOAMI_CANISTER_ID}`);

module.exports = {
    env: {
        HELLO_CANISTER_ID,
        WHOAMI_CANISTER_ID
      },
    async rewrites() {
        return [
            {
                source: '/api/:slug*',
                destination: `http://localhost:8000/api/:slug*`
            }
        ]
    }
}
