export class resumeDTO {
    jobTitle: string;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    picturePath: string;
    age: number;
    location: string;
    gitHub: string;
    linkedIn: string;
    jobExperience: {
      company: string;
      position: string;
      date: string;
      desc: string;
    }[];
    education: {
      school: string;
      degree: string;
      date: string;
      desc: string;
    }[];
    technologies: string[];
  }
  
  export class filterDTO {
    jobTitle: string
  }