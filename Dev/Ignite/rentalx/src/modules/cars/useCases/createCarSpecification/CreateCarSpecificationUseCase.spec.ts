import { AppError } from "../../../../shared/errors/AppError"
import { CarsRepositoryInMemory } from "../../repositories/in-memory/CarsRepositoryInMemory"
import { SpecificationsRepositoryInMemory } from "../../repositories/in-memory/SpecificatinsRepositoryInMemory"
import { CreateCarSpecificationUseCase } from "./CreateCarSpecificationUseCase"


let createCarSpecificationUseCae: CreateCarSpecificationUseCase
let carsRepositoryInMemory:CarsRepositoryInMemory
let specificationsRepositoryInMemory:SpecificationsRepositoryInMemory


describe("Create Car Specification", () => {

    beforeEach(() => {
        carsRepositoryInMemory = new CarsRepositoryInMemory()
        specificationsRepositoryInMemory = new SpecificationsRepositoryInMemory()
        createCarSpecificationUseCae = new CreateCarSpecificationUseCase(carsRepositoryInMemory, specificationsRepositoryInMemory)
    })


    it("should not be able to add a new specification to a now-existent car", async() => {
        expect(async() => {
            const car_id = "12345"
        const specification_id = ["55665"]
       await createCarSpecificationUseCae.execute({car_id, specification_id})
        }).rejects.toBeInstanceOf(AppError)
    })

    it("should be able to add a new specification to the car", async() => {

        const car = await carsRepositoryInMemory.create({
            name: "Name Car", 
            description: "Description Car", 
            daily_rate: 100, 
            license_plate: "ABC-1234", 
            fine_amount: 60, 
            brand: "Brand", 
            category_id: "category"
        })

        const specification = await specificationsRepositoryInMemory.create({
            name: "test",
            description: "test"
        })

        const specification_id = [specification.id]
       const specificationsCars = await createCarSpecificationUseCae.execute({car_id: car.id, specification_id})

        expect(specificationsCars).toHaveProperty("specifications")
        expect(specificationsCars.specifications.length).toBe(1)
    })
})