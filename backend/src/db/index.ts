import { EntityTarget, ObjectLiteral, Repository } from "typeorm";
import { AppDataSource } from "./data-source";  
import { User } from "../entities/user.entity";  

const getRepository = <T extends ObjectLiteral>(entity: EntityTarget<T>): Repository<T> => {
    return AppDataSource.getRepository(entity);
}

export default {
    user: getRepository(User), 
};
