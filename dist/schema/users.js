'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _mongooseUniqueValidator = require('mongoose-unique-validator');

var _mongooseUniqueValidator2 = _interopRequireDefault(_mongooseUniqueValidator);

var _mongooseAutoIncrement = require('mongoose-auto-increment');

var _mongooseAutoIncrement2 = _interopRequireDefault(_mongooseAutoIncrement);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var usersSchema = new _mongoose2.default.Schema({
  first_name: {
    type: String
  },
  last_name: {
    type: String
  },
  password: {
    type: String,
    required: true
  },
  email: {
    type: String,
    index: true,
    unique: true,
    required: true
  },
  trade_info: {
    type: String
  },
  basicInfo: {
    timezone: {
      type: String
    },
    show_real_name: {
      type: String
    },
    disable_sensetive: {
      type: String
    },
    enable_web_notification: {
      type: String
    },
    selling_vacation: {
      type: String
    },
    buying_vacation: {
      type: String
    },
    send_SMS_new_trade: {
      type: String
    },
    send_SMS_new_online: {
      type: String
    },
    introduction: {
      type: String
    }
  },
  varification: {
    email_varified: {
      type: String,
      default: false
    },
    mobile_varified: {
      type: String,
      default: false
    }
  }

});
var sellerSchema = new _mongoose2.default.Schema({
  user: {
    type: String
  },
  payment_method: {
    type: String
  },
  price_btc: {
    type: Number
  },
  currency: {
    type: String
  },
  limit_from: {
    type: Number
  },
  limit_to: {
    type: Number
  }
});

usersSchema.plugin(_mongooseUniqueValidator2.default);
usersSchema.plugin(_mongooseAutoIncrement2.default.plugin, 'id');

exports.default = usersSchema;
//# sourceMappingURL=users.js.map