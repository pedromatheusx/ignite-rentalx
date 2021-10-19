interface IUserResponseDTO {
    email: string,
    avatar: string,
    driver_license: string,
    name: string,
    id: string,
    avatar_url(): string
}

export {IUserResponseDTO}