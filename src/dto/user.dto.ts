import { resumeDTO } from "./resume.dto"

export class userDTO {
    email:string
    password:string
    confirmPassword:string
    resume: resumeDTO
}