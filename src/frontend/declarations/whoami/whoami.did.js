export const idlFactory = ({ IDL }) => {
  return IDL.Service({
    'id' : IDL.Func([], [IDL.Text], []),
    'whoareyou' : IDL.Func([IDL.Text], [IDL.Text], []),
  });
};
export const init = ({ IDL }) => { return []; };
