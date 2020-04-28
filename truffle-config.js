var HDWalletProvider = require("truffle-hdwallet-provider");
var mnemonic = "cushion affair gun fabric visit burden bacon more join festival fancy hen";
//var mnemonic = "asthma disorder brown satoshi below board sibling lounge oval december shed message";

module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // for more about customizing your Truffle configuration!
  networks: {
    development: {
      host: "localhost",
      port: 7545,
      network_id: "*" // Match any network id
    },
    develop: {
      port: 8545
    },
    ropsten: {
      provider: function() { 
       return new HDWalletProvider(mnemonic, "https://ropsten.infura.io/v3/83d3832f8aee4e489faf8d89167a6ac7");
      },
      network_id: "*"
    },
  }
};
