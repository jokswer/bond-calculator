export default class UserDto {
  public readonly id: string;
  public readonly email: string;

  constructor(id: string, email: string) {
    this.id = id;
    this.email = email;
  }
}
