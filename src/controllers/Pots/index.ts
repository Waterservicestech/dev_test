import { create } from "./create"
import { deleteById } from "./delete"
import { findAll } from "./findAll"
import { findOne } from "./findOne"
import { update } from "./update"


export const PostController = {
    create,
    findOne,
    findAll,
    deleteById,
    update
}