import { userRoles } from 'src/users/domain/entities/user.entity';

export class RefreshToken {
  public readonly id?: string;
  public readonly userRole: userRoles;
  public readonly userId: string;

  constructor(userRole: userRoles, userId: string, id?: string) {
    this.userRole = userRole;
    this.userId = userId;

    if (id) this.id = id;
  }
}
