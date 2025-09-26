export class User {
  id?: number;
  firstname: string;
  lastname: string;
  email: string;
  phoneNumber: string;
  role: string;

  constructor({
    id,
    firstname,
    lastname,
    email,
    phoneNumber,
  }: {
    id?: number;
    firstname: string;
    lastname: string;
    email: string;
    phoneNumber: string;
  }) {
    this.id = id;
    this.firstname = firstname;
    this.lastname = lastname;
    this.email = email;
    this.phoneNumber = phoneNumber;
    this.role = User.assignRole(email);
  }

  static assignRole(email: string): string {
    return email.split("@")[1] === "company.com" ? "Admin" : "User";
  }
}
