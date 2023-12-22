import mongoose from "mongoose";
import userRepositories from "../repositories/user.repositories.js";

export async function validId(req, res, next) {
  let idParam;
  if (!req.params.id) {
    req.params.id = req.userId;
    idParam = req.params.id;
  } else {
    idParam = req.params.id;
  }

  // const userFullPermission = await userRepositories.findByIdUserRepository(
  //   idParam,
  // );

  // || userFullPermission.fullPermission === false

  if (!mongoose.Types.ObjectId.isValid(idParam)) {
    return res.status(400).send({ message: "ID Inválido ou Sem permissão!" });
  }
  next();
}
