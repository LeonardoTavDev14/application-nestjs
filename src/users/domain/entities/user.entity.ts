export const userRoles = {
  USER: 'USER',
  ADMIN: 'ADMIN',
  SUPERADMIN: 'SUPERADMIN',
} as const;

export type userRoles = (typeof userRoles)[keyof typeof userRoles];

export class User {
  public readonly id?: string;
  public readonly name: string;
  public readonly email: string;
  public readonly password: string;
  public readonly age: number;
  public readonly role: userRoles;

  public readonly authAttempts?: number | null;
  public readonly suspendedAccount?: Date | null;
  public readonly blockedAccount?: boolean | null;

  constructor(
    name: string,
    email: string,
    password: string,
    age: number,
    role: userRoles,
    authAttempts?: number | null,
    suspendedAccount?: Date | null,
    blockedAccount?: boolean | null,
    id?: string,
  ) {
    this.name = name;
    this.email = email;
    this.password = password;
    this.age = age;
    this.role = role;

    if (authAttempts !== undefined) this.authAttempts = authAttempts;
    if (suspendedAccount !== undefined)
      this.suspendedAccount = suspendedAccount;
    if (blockedAccount !== undefined) this.blockedAccount = blockedAccount;
    if (id) this.id = id;
  }

  static updateUserInfo(existingUser: User, updates: Partial<User>): User {
    return new User(
      updates.name ?? existingUser.name,
      existingUser.email,
      updates.password ?? existingUser.password,
      updates.age ?? existingUser.age,
      updates.role ?? existingUser.role,
      updates.authAttempts !== undefined
        ? updates.authAttempts
        : existingUser.authAttempts,
      updates.suspendedAccount !== undefined
        ? updates.suspendedAccount
        : existingUser.suspendedAccount,
      updates.blockedAccount !== undefined
        ? updates.blockedAccount
        : existingUser.blockedAccount,
      existingUser.id,
    );
  }
}
