import { create } from "./create";
import { deleteById } from "./delete";
import { findAll } from "./findAll";
import { findOne } from "./findOne";
import { update } from "./update";

export const UserController = {
    create,
    update,
    deleteById,
    findOne,
    findAll,
}