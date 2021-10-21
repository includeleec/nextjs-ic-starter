import type { Principal } from '@dfinity/principal';
export interface Counter {
  'bump' : () => Promise<bigint>,
  'inc' : () => Promise<undefined>,
  'read' : () => Promise<bigint>,
}
export interface _SERVICE extends Counter {}
