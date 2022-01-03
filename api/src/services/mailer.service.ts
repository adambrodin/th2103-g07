import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { ReceiptResponseDto } from '@shared/dtos/responses/receipt-response.dto';
import { CustomerEntity } from 'src/entities/customer.entity';


@Injectable()
export class EmailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendConfirmation(receipt: ReceiptResponseDto, customer: CustomerEntity): Promise<void> {
    const response = await this.mailerService
      .sendMail({
        to: customer.email,
        from: 'no-reply@grupp7.com',
        subject: 'Bokningsbekräftelse',
        template: './confirmation',
        attachments: [
          {
          filename: 'Blue_and_PaperPlane_Background.png',
          path: './src/mail/templates/img/Blue_and_PaperPlane_Background.png',
          cid: 'blue-paperplane'
        },
        {
          filename: 'images.png',
          path: './src/mail/templates/img/images.png',
          cid: 'trainillustration'
        },
        {
          filename: 'istockphoto-182262339-612x612.jpg',
          path: './src/mail/templates/img/istockphoto-182262339-612x612.jpg',
          cid: 'movingtrain'
        },
        {
          filename: 'nedladdning.png',
          path: './src/mail/templates/img/nedladdning.png',
          cid: 'mouthguard'
        },
        {
          filename: 'facebook2x.png',
          path: './src/mail/templates/img/facebook2x.png',
          cid: 'facebook'
        },
        {
          filename: 'instagram2x.png',
          path: './src/mail/templates/img/instagram2x.png',
          cid: 'instagram'
        },
        {
          filename: 'linkedin2x.png',
          path: './src/mail/templates/img/linkedin2x.png',
          cid: 'linkedin'
        },
        {
          filename: 'twitter2x.png',
          path: './src/mail/templates/img/twitter2x.png',
          cid: 'twitter'
        }
      ],
        context: {
          fullName: receipt.seats[0].firstName + receipt.seats[0].lastName,
          bookingNumber: receipt.booking.id,
          totalPrice: receipt.totalPrice,
          departure: receipt.date.toUTCString(),
          seats: receipt.seats.length,
          seats1: receipt.seats,
          fromDestination: receipt.booking.departure.tripPoint.location,
          toDestination: receipt.booking.arrival.tripPoint.location
        }
      })
  }

}