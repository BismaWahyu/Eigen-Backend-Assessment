const router = require('express').Router();
const memberRouter = require('../main/member/MemberRouter');
const bookRouter = require('../main/book/BookRouter');

router.use('/', memberRouter);
router.use('/', bookRouter);

module.exports = router;

/**
 * @swagger
 * tags:
 *      name: Members
 */

/**
 * @swagger
 * tags:
 *      name: Books
 */
