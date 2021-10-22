import { Actor } from "@dfinity/agent";
import { idlFactory } from './hello.did.js';
export { idlFactory } from './hello.did.js';
// CANISTER_ID is replaced by webpack based on node environment
export const canisterId = process.env.HELLO_CANISTER_ID;

/**
 * 
 * @param {string | import("@dfinity/principal").Principal} canisterId Canister ID of Agent
 * @param {{agentOptions?: import("@dfinity/agent").HttpAgentOptions; actorOptions?: import("@dfinity/agent").ActorConfig}} [options]
 * @return {import("@dfinity/agent").ActorSubclass<import("./hello.did.js")._SERVICE>}
 */
 export const createActor = (canisterId, agent) => {
  
  // Fetch root key for certificate validation during development
  if (process.env.NEXT_PUBLIC_DFX_NETWORK === "local") {
    agent.fetchRootKey();
  }


  // Creates an actor with using the candid interface and the HttpAgent
  return Actor.createActor(idlFactory, {
    agent,
    canisterId,
  });
};
