export class IAuthUserResponseDTO {
  user: {
    name: string;
    email: string;
  };
  accessToken: string;
}
