import { IsString, IsArray, ArrayNotEmpty } from 'class-validator';

export class SendRoomInvitesDto {
  @IsString()
  newRoomId: string;

  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  usersIds: number[];
}
