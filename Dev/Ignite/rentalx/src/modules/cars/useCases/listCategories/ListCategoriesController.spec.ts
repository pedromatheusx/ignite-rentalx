import { hash } from "bcrypt"
import request from "supertest"
import {Connection} from "typeorm"
import {v4 as uuidV4} from "uuid"
import { app } from "../../../../shared/infra/http/app"
import createConnection from "../../../../shared/infra/typeorm"



let connection: Connection
describe("List Categories Controller", ()=> {


    beforeAll(async() => {
        connection = await createConnection()
        await connection.runMigrations()

        const id = uuidV4()
        const password = await hash("admin", 8)

        await connection.query(`INSERT INTO USERS(id, name, email, password, "isAdmin", created_at, driver_license)
        VALUES ('${id}', 'Pedro', 'pedromatheusduarte@rentx.com', '${password}', true, 'now()', 'XXXXXXXX' )`)
    
    })

    afterAll(async() => {
        await connection.dropDatabase()
        await connection.close()
    })

    it("should be able to list all categories", async()=> {

        const responseToken = await request(app).post("/sessions").send({
            email: "pedromatheusduarte@rentx.com",
            password: "admin"
        })

        const {token} = responseToken.body
  

      await request(app).post("/categories").send({
            name: "Category Supertest",
            description: "Category Supertest"
        }).set({
            Authorization: `Bearer ${token}`
        })

      const response = await request(app).get("/categories")

        expect(response.status).toBe(200)
    })
    

})