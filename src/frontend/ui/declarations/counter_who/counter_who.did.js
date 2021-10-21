export const idlFactory = ({ IDL }) => {
  const Counter = IDL.Service({
    'bump' : IDL.Func([], [IDL.Nat], []),
    'inc' : IDL.Func([], [], []),
    'read' : IDL.Func([], [IDL.Nat], []),
  });
  return Counter;
};
export const init = ({ IDL }) => { return [IDL.Nat]; };
