export class IAuthUserResponseDTO {
  user: {
    name: string;
    email: string;
  };
  refreshTokenId: string;
  accessToken: string;
}
