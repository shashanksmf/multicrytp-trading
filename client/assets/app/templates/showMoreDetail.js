var ShowMoreDetail = {};
((function() {
  this.init = function() {
    _render.content();
  }
  var _core = {
    showMoreDetail: API.showMoreDetail,
    getActiveUser: API.getActiveUser,

    getUrlVars: function() {
      var vars = [],
        hash;
      var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
      //var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1);
      for (var i = 0; i < hashes.length; i++) {
        hash = hashes[i].split('=');
        console.log("hash=>", hash);
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
      }
      console.log("vars=>", vars);
      return vars;
    },




    verifyTrader: function(cryptoCurrency, traderType, location, tradeMethod) {
      /*  tradeMethod: 'LOCAL',
       traderType: 'SELL' */
      var htmlTradeHeader = '';


      if (tradeMethod == 'ONLINE') {

        if (traderType == 'SELL') {

          /*  htmlTradeHeader += '<h3  class="m-portlet__head-text ">' + ' ' +
                'Sell ' + currency + ' using' + ' ' + payment_details + ' ' + location + ' ' + '  with Indian Rupee (INR)' +
               '</h3>'; */

          htmlTradeHeader += '<h3  class="m-portlet__head-text ">' + ' ' +
            'Sell ' + cryptoCurrency + ' ' + ' Online  Transfer   in ' + location + ' ' +
            '</h3>';
        } else {

          htmlTradeHeader += '<h3  class="m-portlet__head-text ">' + ' ' +
            'Buy' + ' ' + cryptoCurrency + ' using' + ' Online  Transfer  in ' + location +
            '</h3>';
        }

      } else {
        if (traderType == 'SELL') {
          htmlTradeHeader += '<h3  class="m-portlet__head-text ">' + ' ' +
            'Sell your ' + cryptoCurrency + '  ' + '  with cash' +
            '</h3>';
        } else {
          htmlTradeHeader += '<h3  class="m-portlet__head-text ">' + ' ' +
            'Buy' + ' ' + cryptoCurrency + '  with cash ' +
            '</h3>';

        }
      }
      $(".headTitle").append(htmlTradeHeader);
    }




  }

  var _bind = {
    showMoreDetail: async function() {

      var urlParams = _core.getUrlVars();
      var activeUSer = [];

      console.log("url params=>", urlParams);
      // currencyUrl = urlParams.currency;

      var cryptoCurrency = urlParams.cryptoCurrency;

      cryptoCurrency = cryptoCurrency.toLowerCase().replace(/\b[a-z]/g, function(letter) {
        return letter.toUpperCase();
      });
      var location = urlParams.location;
      var tradeMethod = urlParams.tradeMethod;
      var cryptoCurrencyCode = urlParams.code;
      var traderType = urlParams.traderType;
      var title = 'Buyer';
      if (traderType == 'BUY') {
        title = 'Seller'
      }
      _core.verifyTrader(cryptoCurrency, traderType, location, tradeMethod);

      await _core.getActiveUser(function(res) {
        activeUSerData = res;
        if (res) {
          // console.log("response in getActive User=>>", res);
          for (let index = 0; index < res.tokenModel.length; index++) {
            for (let j = 0; j < res.user.length; j++) {
              console.log("Email=>", res.tokenModel[index].email, res.user[j].email);
              if (res.tokenModel[index].email == res.user[j].email) {
                activeUSer.push({ email: res.tokenModel[index].email, name: res.user[j].first_name, userActiveTime: res.tokenModel[index].userActiveTime });
              }

            }

          }
        }
      })


      if (urlParams.cryptoCurrency) {
        var str = urlParams.cryptoCurrency;
        cryptoCurrency = str.toString(),
          cryptoCurrency = urlParams.cryptoCurrency;
        console.log("cryptoCurrency in if", cryptoCurrency);
      }

      await $('#m_datatable_showMore').mDatatable({
        data: {
          type: 'remote',
          source: {
            read: {
              url: '/tradeByCurrencyLoc',
              method: 'GET',
              processing: true,
              serverSide: true,
              params: {
                query: {
                  cryptoCurrency: cryptoCurrency,
                  location: location,
                  tradeMethod: tradeMethod,
                  traderType: traderType,
                },
              }
            }
          },
          saveState: {
            cookie: true,
            webstorage: true
          },
          serverPaging: true,
          serverFiltering: false,
          serverSorting: false,
          pagination: true,

        },

        layout: {
          theme: 'default',
          class: '',
          scroll: true,
          height: 380,
          footer: false
        },
        sortable: false,
        filterable: false,

        columns: [{
            field: "firstName",
            template: function(field, type, row) {
              for (let index = 0; index < activeUSer.length; index++) {
                // console.log("field.firstName", field.firstName, index, activeUSer[index].name);
                if (activeUSer[index].name == field.firstName) {
                  return '<label>' + field.firstName + '</label><span style=" margin-left:5px;min-height: 10px; min-width: 10px;height: 4px;width: 4px; vertical-align: super;" class="m-badge m-badge--success"> </span>';
                }
              }
              return field.firstName + '</label><span style=" margin-left:5px;min-height: 10px; min-width: 10px;height: 4px;width: 4px; vertical-align: super;" class="m-badge m-badge--metal"> </span>';
            },
            title: title,
            sortable: false,
            width: 100,
            textAlign: 'center'
          },
          {
            field: "",
            template: function(field, type, row) {
              if (field.online_selling.payment_details == undefined || '' || isNaN(field.online_selling.payment_details)) {
                field.online_selling.payment_details = '';
              }
              if (field.location == undefined || '' || isNaN(field.location)) {
                field.location = '';
              }

              return field.online_selling.payment_details + ' ' + field.location;
            },

            title: "Payment Method",
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
              }

              return field.more_information.price_equation;
            },

            title: 'Price/' + cryptoCurrencyCode,
            sortable: false,
            width: 80,
            textAlign: 'center'
          },
          {
            field: "more_information.max_trans_limit",
            template: function(field, type, row) {
              if (field.more_information.min_trans_limit == undefined || '' || isNaN(field.more_information.min_trans_limit)) {
                field.more_information.min_trans_limit = '';
              }
              if (field.more_information.max_trans_limit == undefined || '' || isNaN(field.more_information.max_trans_limit)) {
                field.more_information.max_trans_limit = '';
              }

              return field.more_information.min_trans_limit + '-' + field.more_information.max_trans_limit;
            },
            title: "Limits",
            width: 80,
            responsive: {
              visible: 'lg'
            }
          }, {
            field: "traderType",
            title: "Trader Type",

            template: function(row) {
              return ' <a href="./#/sellBuyCurrency?id=' + row._id + '">' +
                '<input type="button" name="' + row.traderType + '" id="traderType" value="' + row.traderType + '" style="border-radius: 4px;color: white; background: #22b9ff;border: 1px solid #DEDEDE;padding: 7px; width: 70px; cursor:pointer;">' +
                '</a>';
            }
          }

        ]
      })


    }
  }
  var _render = {
    content: function() {
      renderMainFrame('assets/snippets/pages/user/showMoreDetail.html', 'showMoreDetail', function() {
        _bind.showMoreDetail()


      })
    }
  }
}).bind(ShowMoreDetail))()
// ShowMoreDetail.init();