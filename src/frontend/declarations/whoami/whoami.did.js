export const idlFactory = ({ IDL }) => {
  return IDL.Service({
    'id' : IDL.Func([], [IDL.Principal], []),
    'whoami' : IDL.Func([], [IDL.Principal], []),
  });
};
export const init = ({ IDL }) => { return []; };
