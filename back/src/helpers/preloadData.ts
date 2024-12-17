import { AppDataSource } from "../config/data-source";

const user1 = {
    name: "Patricio Rodriguez",
    email: "pato@mail.com",
    active: true,
}


AppDataSource.manager.transaction(async (transactionalEntityManager) => {

})