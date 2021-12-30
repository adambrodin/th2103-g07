import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class EmailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendConfirmation(): Promise<void> {
    const response = await this.mailerService
      .sendMail({
        to: 'spuute@gmail.com',
        from: 'th2102.g07@gmail.com',
        subject: 'Bokningsbekräftelse',
        html: '<h1>Tack för din bokning!</h1><br><p>Din bokning har bokningsnr: ${}',
      })
  }

}