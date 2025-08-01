import { IsString, IsArray, IsInt } from 'class-validator';

export class SendRoomInvitesDto {
  @IsString()
  newRoomId: string;

  @IsArray()
  @IsInt({ each: true })
  usersIds: number[];
}
