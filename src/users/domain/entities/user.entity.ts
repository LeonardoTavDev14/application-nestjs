export class User {
  public readonly id?: string;
  public readonly name: string;
  public readonly email: string;
  public readonly password: string;

  constructor(name: string, email: string, password: string, id?: string) {
    this.name = name;
    this.email = email;
    this.password = password;

    if (id) this.id = id;
  }

  static updateUserInfo(existingUser: User, updates: Partial<User>): User {
    return new User(
      updates.name ?? existingUser.name,
      existingUser.email,
      updates.password ?? existingUser.password,
      existingUser.id,
    );
  }
}
