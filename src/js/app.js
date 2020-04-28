App = {
  web3Provider: null,
  contracts: {},
  account: '0x0',

  init: function() {
    return App.initWeb3();
  },

  initWeb3: function() {
    if (typeof web3 !== 'undefined') {
      // If a web3 instance is already provided by Meta Mask.
      App.web3Provider = web3.currentProvider;
      web3 = new Web3(web3.currentProvider);
    } else {
      // Specify default instance if no web3 instance provided
      App.web3Provider = new Web3.providers.HttpProvider('http://localhost:7545');
      web3 = new Web3(App.web3Provider);
    }
    return App.initContract();
  },

render: function() {
  var donationInstance;
  var loader = $("#loader");
  var content = $("#content");

  loader.show();
  content.hide();

  // Load account data
  web3.eth.getCoinbase(function(err, account) {
    if (err === null) {
      App.account = account;
      $("#accountAddress").html("Your Account: " + account);
    }
  });

  // Load contract data
  App.contracts.Donations.deployed().then(function(instance) {
    donationInstance = instance;
    return donationInstance.charitiesCount();
  }).then(function(charitiesCount) {
    var charitiesResults = $("#charitiesResults");
    charitiesResults.empty();

    var charitiesSelect = $('#charitiesSelect');
    charitiesSelect.empty();

    for (var i = 1; i <= charitiesCount; i++) {
      donationInstance.charities(i).then(function(charity) {
        var id = charity[0];
        var name = charity[1];
        var donationCount = charity[2];

        // Render charity Result
        var charityTemplate = "<tr><th>" + id + "</th><td>" + name + "</td><td>" + donationCount + "</td></tr>"
        charitiesResults.append(charityTemplate);

        // Render charity ballot option
        var charityOption = "<option value='" + id + "' >" + name + "</ option>"
        charitiesSelect.append(charityOption);
      });
    }
    return donationInstance.donors(App.account);
  }).then(function(result) {
    loader.hide();
    content.show();
  }).catch(function(error) {
    console.error(error);
  });
},

addCharity:function() {
  var charityName = $('#charitiesAdd').val();
  App.contracts.Donations.deployed().then(function(instance) {
    return instance.addCharity(charityName, { from: App.account });
  }).then(function(result) {
    $("#content").hide();
    $("#loader").show();
  }).catch(function(err) {
    console.error(err);
  });
},

submitDonation: function() {
    var charityId = $('#charitiesSelect').val();
    var donateAmount = $('#donateAmount').val();
    
    App.contracts.Donations.deployed().then(function(instance) {
      return instance.donate(charityId, donateAmount, { from: App.account, value: web3.toWei(donateAmount.toString(), 'Ether') });
    }).then(function(result) {
      // Wait for votes to update
      $("#content").hide();
      $("#loader").show();
    }).catch(function(err) {
      console.error(err);
    });
  },

listenForEvents: function() {
  App.contracts.Donations.deployed().then(function(instance) {
    instance.donatedEvent({}, {
      fromBlock: 0,
      toBlock: 'latest'
    }).watch(function(error, event) {
      console.log("event triggered", event)
      // Reload when a new vote is recorded
      App.render();
    });
  });

  App.contracts.Donations.deployed().then(function(instance) {
    instance.charityCreated({}, {
      fromBlock: 0,
      toBlock: 'latest'
    }).watch(function(error, event) {
      console.log("event triggered", event)
      // Reload when a new vote is recorded
      App.render();
    });
  });
}, 

initContract: function() {
  $.getJSON("Donations.json", function(donation) {
    // Instantiate a new truffle contract from the artifact
    App.contracts.Donations = TruffleContract(donation);
    // Connect provider to interact with contract
    App.contracts.Donations.setProvider(App.web3Provider);

    App.listenForEvents();

    return App.render();
  });
}



};

$(function() {
  $(window).load(function() {
    App.init();
  });
});
