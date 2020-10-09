export class NotificationDto {
  userId: number;
  type: 'email' | 'sms';
  response: any;
  status: 'SUCCESS' | 'ERROR';
}