import Principal "mo:base/Principal";

actor { 
  // Return the principal identifier of the caller of this method.
  public shared (msg) func whoareyou(name: Text) : async Text {
    return "hello " # Principal.toText(msg.caller) # name;
  };

  // Return the principal identifier of this canister.
  public func id() : async Text {
    return await whoareyou("");
  };

};
