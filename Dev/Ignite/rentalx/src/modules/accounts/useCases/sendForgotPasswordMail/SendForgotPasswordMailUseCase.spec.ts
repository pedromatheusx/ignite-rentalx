import { DayjsDateProvider } from "../../../../shared/container/providers/DateProvider/implementations/DayjsDateProvider"
import { MailProviderInMemory } from "../../../../shared/container/providers/MailProvider/in-memory/MailProviderInMemory"
import { AppError } from "../../../../shared/errors/AppError"
import { UsersRepositoryInMemory } from "../../repositories/in-memory/UsersRepositoryInMemory"
import { UsersTokensRepositoryInMemory } from "../../repositories/in-memory/UsersTokensRepositoryInMemory"
import { SendForgotPasswordMailUseCase } from "./SendForgotPasswordMailUseCase"

let sendForgotPasswordMailUseCase: SendForgotPasswordMailUseCase
let usersRepositoryInMemory: UsersRepositoryInMemory
let dateProvider: DayjsDateProvider
let usersTokensRepositoryInMemory: UsersTokensRepositoryInMemory
let mailProviderInMemory: MailProviderInMemory

describe("Send Forgot Mail", () => {

    beforeEach( () => {
        usersRepositoryInMemory = new UsersRepositoryInMemory()
        usersTokensRepositoryInMemory = new UsersTokensRepositoryInMemory()
        dateProvider = new DayjsDateProvider()
        mailProviderInMemory = new MailProviderInMemory()
        
        sendForgotPasswordMailUseCase = new SendForgotPasswordMailUseCase(
            usersRepositoryInMemory, 
            usersTokensRepositoryInMemory,
            dateProvider,
            mailProviderInMemory
        )
    })

    it("should be able to send a forgot password mail to user", async() => {
        const sendMail = jest.spyOn(mailProviderInMemory, "sendMail")

        await usersRepositoryInMemory.create({
            driver_license: "664156",
            email: "pedro@test.com",
            name: "Pedro",
            password: "1234"
        })
        

        await sendForgotPasswordMailUseCase.execute("pedro@test.com")
        
        
        expect(sendMail).toHaveBeenCalled()
    })

    it("should not be able to send an email if user does not exists!", async() => {
        await expect(
            sendForgotPasswordMailUseCase.execute("p@test.com")
        ).rejects.toEqual(new AppError("User does not exists!"))
    })

    it("should be able to create an users token", async() => {
        const generateTokenMail = jest.spyOn(usersTokensRepositoryInMemory, "create")
     
        await usersRepositoryInMemory.create({
            driver_license: "664145",
            email: "matheus@test.com",
            name: "Matheus",
            password: "1234"
        })

        await sendForgotPasswordMailUseCase.execute("matheus@test.com")

        expect(generateTokenMail).toBeCalled()

    })

})