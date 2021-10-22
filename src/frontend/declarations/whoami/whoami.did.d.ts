import type { Principal } from '@dfinity/principal';
export interface _SERVICE {
  'id' : () => Promise<string>,
  'whoareyou' : (arg_0: string) => Promise<string>,
}
