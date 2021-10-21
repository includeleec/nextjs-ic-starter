import type { Principal } from '@dfinity/principal';
export interface _SERVICE {
  'id' : () => Promise<Principal>,
  'whoami' : () => Promise<Principal>,
}
