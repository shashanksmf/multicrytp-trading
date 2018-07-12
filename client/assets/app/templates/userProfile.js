var UserProfile = {};
((function() {
  var id = '';
  var currency = '';
  this.init = function() {
    console.log("USer profie js==>");
    _render.content();
  }

  var _core = {
    userProfile: API.userProfile,

    getUrlVars: function() {
      var vars = [],
        hash;
      var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
      console.log("hashes=>", hashes);
      for (var i = 0; i < hashes.length; i++) {
        hash = hashes[i].split('=');
        console.log("hash=>", hash);

        vars.push(hash[0]);
        console.log("vars in loop=>", vars);

        vars[hash[0]] = hash[1];
      }
      console.log("vars=>", vars);

      return vars;
    },




  }
  var _bind = {
    userProfile: function() {
      var urlParams = _core.getUrlVars();
      id = urlParams.id;
      //   currency = urlParams.currency;

      _core.userProfile(id, function(res) {
        console.log("user profiles response==>", res);
        if (res) {
          if (!res.isError) {
            var Data = res.data;

            _bind.SetUserData(Data);
          }
        }
      })

      $('#userNotTrusted').unbind().click(function() {
        $(this).hide();
        $('#userTrusted').show();
      })


    },
    SetUserData: function(Data) {

      var first_name = Data.user.first_name;
      var last_name = Data.user.last_name;
      var email_verified = Data.user.verification.email_verified;
      var mobile_verified = Data.user.verification.mobile_verified;
      var account_created = moment(Data.user.account_created).format('MMMM Do YYYY');
      var userActiveTime = Data.tokenData.userActiveTime;
      var htmlUserName = '';
      htmlUserName += '<label>' + first_name + '</label>' +
        '<span style=" margin-left:5px;min-height: 10px; min-width: 10px;height: 4px;width: 4px; vertical-align: super;" class="m-badge m-badge--success"> </span>';
      $('#userName').html(htmlUserName);
      $('#email').append(email_verified);
      $('#Phone_number').append(mobile_verified);
      $('#trustUser').append('Trust  ' + first_name);
      $('#AlreadytrustUser').append('Already Trusting  <br>' + first_name);
      $('#account_created').append(account_created);
      $('#last_seen').append(moment(userActiveTime).format('LLLL'));
      _bind.setDataTable();

    },
    setDataTable: async function() {
      await $('#m_datatable_latest_ordersOB').mDatatable({
        data: {
          type: 'remote',
          source: {
            read: {
              url: '/getTrade',
              method: 'GET',
              params: {
                query: {

                  user: id,
                },
              }
            }
          },
          saveState: {
            cookie: true,
            webstorage: true
          },
          serverPaging: true,
          serverFiltering: true,
          serverSorting: true
        },

        layout: {
          theme: 'default',
          class: '',
          scroll: true,
          height: 380,
          footer: false
        },
        /*  sortable: true,
         filterable: false,
         pagination: true, */
        columns: [{
            field: "firstName",
            template: function(field, type, row) {
              //   for (let index = 0; index < activeUSer.length; index++) {
              //     // console.log("field.firstName", field.firstName, index, activeUSer[index].name);
              //     if (Date(activeUSer[index].userActiveTime) <= before) {
              //       // console.log("time matched", Date(activeUSer[index].userActiveTime), before);
              //     }
              //     if (activeUSer[index].name == field.firstName) {
              //       // console.log("activeUSer[index].name in if", activeUSer[index].name);
              //       return '<label>' + field.firstName + '</label><span style=" margin-left:5px;min-height: 10px; min-width: 10px;height: 4px;width: 4px; vertical-align: super;" class="m-badge m-badge--success"> </span>';
              //     }
              //   }
              return field.firstName + '</label><span style=" margin-left:5px;min-height: 10px; min-width: 10px;height: 4px;width: 4px; vertical-align: super;" class="m-badge m-badge--success"> </span>';
            },
            /*   template: function(field, type, row) {
                    if (field.firstName === ({ $in: activeUSer })) {
                      return field.firstName + '  active';
    
                    }
                    return field.firstName + '  inactive';
                  }, */
            title: "Seller",
            sortable: false,
            width: 100,
            textAlign: 'center'
          },
          {
            field: "",
            template: function(field, type, row) {
              /*  if (field.online_selling.payment_details == undefined || '' || isNaN(field.online_selling.payment_details)) {
                 field.online_selling.payment_details = '';
               }
               if (field.location == undefined || '' || isNaN(field.location)) {
                 field.location = '';
               } */

              return field.payment_method + ' :' + field.location;
            },
            title: "Payment Method",
            sortable: false,
            width: 250,
            responsive: {
              visible: 'lg'
            }
          },
          {
            field: "more_information.price_equation",

            template: function(field, type, row) {
              if (field.more_information.price_equation == undefined || '' || isNaN(field.more_information.price_equation)) {
                field.more_information.price_equation = '';
              } else {
                var priceTemp = field.more_information.price_equation;
                var price = Number(priceTemp).toFixed(2);
                return price;
              }

            },

            title: 'Price/' + "",
            sortable: false,
            width: 100,
            textAlign: 'center'
          },
          {
            field: "more_information.max_trans_limit",
            template: function(field, type, row) {
              if (field.more_information.min_trans_limit == undefined || '' || isNaN(field.more_information.min_trans_limit)) {
                field.more_information.min_trans_limit = 0;
              }
              if (field.more_information.max_trans_limit == undefined || '' || isNaN(field.more_information.max_trans_limit)) {
                field.more_information.max_trans_limit = 0;
              }

              return field.more_information.min_trans_limit + '-' + field.more_information.max_trans_limit;
            },
            title: "Limits",
            sortable: false,
            width: 80,
            responsive: {
              visible: 'lg'
            }
          }, {
            field: "traderType",
            title: "Trader Type",
            sortable: false,
            template: function(row) {

              return '<a href="./#/sellBuyCurrency?id=' + row._id + '&code=' + "" + ' ">' +
                '<input type="button" class="btn btn-info  " name="Buy" id="traderType" value="Buy" style="color: white;  width: 70px; cursor:pointer;">' +
                '</a>';
            }
          }
        ]

      })

    }

  }

  var _render = {
    content: function() {
      renderMainFrame('assets/snippets/pages/user/accounts/userProfile.html', 'userProfile', function() {
        _bind.userProfile();


      })
    }
  }
}).bind(UserProfile))();