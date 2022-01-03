import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { ReceiptResponseDto } from '@shared/dtos/responses/receipt-response.dto';


@Injectable()
export class EmailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendConfirmation(receipt: ReceiptResponseDto): Promise<void> {
    const response = await this.mailerService
      .sendMail({
        to: 'spuute@gmail.com',
        from: 'no-reply@grupp7.com',
        subject: 'Bokningsbekräftelse',
        template: './confirmation',
        context: {
          fullName: receipt.seats[0].firstName + receipt.seats[0].lastName,
          bookingNumber: receipt.booking.id,
          totalPrice: receipt.totalPrice,
          departure: receipt.date.toUTCString(),
          seats: receipt.seats.length,
          seats1: receipt.seats,
        }
      })
  }

}