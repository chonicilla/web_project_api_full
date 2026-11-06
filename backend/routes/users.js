const router = require('express').Router();
const {
  getUsers,
  getUserById,
  getCurrentUser,
  updateUser,
  updateAvatar,
} = require('../controllers/users');
const {
  validateUserId,
  validateUpdateUser,
  validateUpdateAvatar,
} = require('../middlewares/validation');

router.get('/users', getUsers);
router.get('/users/me', getCurrentUser);
router.get('/users/:userId', validateUserId, getUserById);
router.patch('/users/me', validateUpdateUser, updateUser);
router.patch('/users/me/avatar', validateUpdateAvatar, updateAvatar);

module.exports = router;
