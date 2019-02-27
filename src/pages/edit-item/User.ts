export class User {
  id: number;
  profPic: string;
  email: string;

  firstName: string;
  lastName: string;
  contacts: string[];
  verified: boolean;

  constructor(id: number, email: string, contacts: string[], verified: boolean,
              profPic: string, firstName: string, lastName: string) {
    this.id = id;
    this.email = email;
    this.contacts = contacts;
    this.verified = verified;
    this.profPic = profPic;
    this.firstName = firstName;
    this.lastName = lastName;
  }
}
