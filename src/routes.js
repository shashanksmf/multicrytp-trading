import usersController from './controller/usersController';
import tradeController from './controller/tradeController';
import authController from './controller/authController';
import messagesController from './controller/messagesController';
import path from 'path';
import walletController from './controller/walletController';
const routes = (route) => {

  route.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname + '/../client/' + 'index.html'));
  });
  route.get('#/', (req, res) => {
    res.sendFile(path.resolve(__dirname + '/../client/' + 'index.html'));
  });

  /*   route.get('/recover', (req, res) => {
      console.log("req", req.query.accessToken)
      res.redirect('/#/resetpassword?accessToken=' + req.query.accessToken);
    }); */
  route.get('/recover', (req, res) => {
    // console.log("router.js in recover access token", req.query.accessToken)
    res.redirect('/#/recoverPassword?accessToken=' + req.query.accessToken);

    // res.sendFile(path.resolve(__dirname + '/../client/assets/snippets/pages/user/' + 'recover.html'));
  });


  route.route('/login')
    .post(authController.login);

  route.route('/register')
    .post(authController.register);

  // route.route('/users')
  // .get(usersController.getAll)
  // .put(usersController.update);

  route.route('/forgetPassword')
    .post(usersController.forgetPassword);

  // route.route('/friendReq')
  //   .post(messagesController.friendReq);
  route.route('/friendReq')
    .post(usersController.friendReq)

  route.route('/addMessage')
    .post(usersController.addMessage)

  route.route('/getUserInfo')
    .get(usersController.getUserInfo)

  route.route('/addUserProfilePic')
    .post(usersController.addUserProfilePic)


  route.route('/getAllMessagesWithFriend')
    .get(usersController.getAllMessagesWithFriend)
  route.route('/getAllUnreadMessages')
    .get(usersController.getAllUnreadMessages)
  route.route('/getFriendsList')
    .get(usersController.getFriendsList);

  route.route('/acceptFriendRequest')
    .post(usersController.acceptFriendRequest);


  route.route('/users/changeEmail')
    .post(usersController.changeEmail);



  route.route('/setMsgRead')
    .post(usersController.setMsgRead);

  route.route('/userProfile')
    .get(usersController.userProfile)

  route.route('/users')
    //console.log("user=>>", req)
    .get(usersController.getAll)
    //.delete(usersController.delete);

  route.route('/seller')
    .get(usersController.getOne)
    .put(usersController.update)
    .delete(usersController.delete);

  route.route('/sellerBuyerInfo')
    .get(tradeController.getOne);

  route.route('/cp/:token')
    .get(usersController.varifyToken);

  route.route('/isVerified')
    .get(usersController.isVerified);


  route.route('/getPriceEquation')
    .get(tradeController.getPriceEquation)
  route.route('/emailverification')
    .post(usersController.emailVerification);

  route.route('/ev/:token')
    .get(usersController.emailVerified);

  route.route('/trade')
    .get(tradeController.getAll)
    .post(tradeController.create)
    .patch(tradeController.update);

  route.route('/tradeByCurrencyLoc')
    .get(tradeController.getByCurrencyLoc);

  route.route('/getTrade')
    .get(tradeController.getTrade);
  route.route('/getPostTrade_ByUser')
    .get(tradeController.getPostTrade_ByUser);

  route.route('/unfriend')
    .post(usersController.unfriend);


  route.route('/unblockUser')
    .post(usersController.unblockUser);


  route.route('/blockUser')
    .post(usersController.blockUser);
  route.route('/turstUser')
    .post(usersController.turstUser);
  route.route('/getQuickByCryptocurrency')
    .get(tradeController.getQuickByCryptocurrency);


  route.route('/recoverPassword')
    .post(usersController.recoverPassword);


  route.route('/users/addUserInfo')
    .post(usersController.addUserInfo);


  route.route('/users/storeBasicUserInfo')
    .post(usersController.storeBasicUserInfo);

  route.route('/users/changePassword')
    .post(usersController.changePassword);

  route.route('/getActiveUser')
    .get(authController.getActiveUser);

  route.route('/logout')
    .get(authController.logout);

  //For Transaction
  route.route('/createWalletWithAddress')
    .post(walletController.createWalletWithAddress);

  route.route('/getCoin_WalletData')
    .get(walletController.getCoin_WalletData);

  route.route('/getAddrBal')
    .post(walletController.getAddrBal);

  route.route('/newTransaction')
    .post(walletController.newTransaction);
  route.route('/getTX')
    .post(walletController.getTX);
  route.route('/validateAddress')
    .get(walletController.validateAddress);
  route.route('/getAddrFull')
    .get(walletController.getAddrFull);




};

export default routes;