export class User {
  id: number;
  email: string;
  name: string;
  contacts: string[];
  verified: boolean;

  constructor(id: number, email: string, name: string, contacts: string[], verified: boolean) {
    this.id = id;
    this.email = email;
    this.name = name;
    this.contacts = contacts;
    this.verified = verified;
  }
}
