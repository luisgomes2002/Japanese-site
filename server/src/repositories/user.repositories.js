import User from '../models/User.js'

const findByEmailUserRepository = (email) => User.findOne({ email: email });

const createUserRepository = (body) => User.create(body);

const findAllUserRepository = (offset, limit) => User.find().sort({ _id: 1 }).skip(offset).limit(limit); //fazer uma paginação

const findByIdUserRepository = (idUser) => User.findById(idUser);

const updateUserRepository = (id, name, username, email, password, avatar, background) => {
  User.findOneAndUpdate(
    { _id: id },
    { name, username, email, password, avatar, background },
    { rawResult: true, }
  );
};

const deleteUserRepository = (idUser) => User.deleteOne({ _id: idUser });

const countRepository = () => User.countDocuments();

const followUserRepository = (id, userId, userIdName) => {
  return User.findOneAndUpdate(
    {
      _id: id,
      "follows.userId": { $nin: [userId] },
    },
    {
      $push: {
        follows: { userId, userIdName, created: new Date() },
      },
    },
    {
      rawResult: true,
    }
  );
};

const deletefollowUserRepository = (id, userId) => {
  return User.findOneAndUpdate(
    {
      _id: id,
    },
    {
      $pull: {
        follows: { userId: userId, },
      },
    }
  );
};

const followedUserRepository = (id, userId, idName) => {
  return User.findOneAndUpdate(
    {
      _id: userId,
      "followed.id": { $nin: [id] },
    },
    {
      $push: {
        followed: { id, idName, created: new Date() }
      }
    },
    {
      rawResult: true,
    }
  )
};

const deletefollowedUserRepository = (id, userId) => {
  return User.findOneAndUpdate(
    {
      _id: userId,
    },
    {
      $pull: {
        followed: { id: id, },
      }
    }
  )
};

const pointCountUserRepository = (id, points) => {
  User.findOneAndUpdate(
    { _id: id },
    { points },
    { rawResult: true, }
  ).exec();
};

export default {
  findByEmailUserRepository,
  createUserRepository,
  findAllUserRepository,
  findByIdUserRepository,
  updateUserRepository,
  deleteUserRepository,
  countRepository,
  followUserRepository,
  deletefollowUserRepository,
  followedUserRepository,
  deletefollowedUserRepository,
  pointCountUserRepository,
};