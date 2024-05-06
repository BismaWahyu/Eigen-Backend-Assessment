const memberRouter = require('express').Router();
const MemberController = require('./MemberController');

memberRouter.get('/members', MemberController.list);
memberRouter.post('/member/borrow', MemberController.borrow);
memberRouter.post('/member/return-book', MemberController.returnBook);

module.exports = memberRouter;