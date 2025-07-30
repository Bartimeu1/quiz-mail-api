export interface UserModel {
  id: number;
  email: string;
  name: string;
  password: string;
  avatarId: number;
  stars: number;
}

export interface GetUserResponse {
  data: UserModel;
}
