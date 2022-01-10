import { Injectable } from '@nestjs/common';
import { getRepository } from 'typeorm';
import { SeatType } from '@shared/enums/seat-type.enum';
import { TicketType } from '@shared/enums/ticket-type.enum';
import { SeatPriceEntity } from '../entities/seat-price.entity';
import { TicketPriceEntity } from '../entities/ticket-price.entity';

@Injectable()
export class PriceService {
  async getTicketPrice(
    ticketType: TicketType,
    seatType?: SeatType,
  ): Promise<number> {
    const seatPriceRepo = getRepository(SeatPriceEntity);
    const seatPrice = await seatPriceRepo.findOne({
      where: { seatType: seatType },
    });

    const ticketPrice = await getRepository(TicketPriceEntity).findOne({
      where: { ticketType: ticketType },
    });

    if (seatPrice && ticketPrice) {
      const resultPrice = seatPrice.price * ticketPrice.priceMultiplier;
      return resultPrice;
    }

    // Backup/fallback price
    const backupPrice = await seatPriceRepo.findOne({
      where: { seatType: SeatType.SECOND_CLASS },
    });

    return backupPrice.price;
  }
  async getAllTicketPrices(): Promise<number[]> {
    const ticketPrice = await getRepository(TicketPriceEntity).find();

    if (ticketPrice) {
      const resultPrice: number[] = [];

      for (const ticket of ticketPrice) {
        resultPrice.push(ticket.priceMultiplier);
      }

      return resultPrice;
    }

    return [0, 0, 0, 0];
  }
  async getAllSeatPrices(): Promise<number[]> {
    const seatPrice = await getRepository(SeatPriceEntity).find();

    if (seatPrice) {
      const resultPrice: number[] = [];

      for (const ticket of seatPrice) {
        resultPrice.push(ticket.price);
      }

      return resultPrice;
    }

    return [0, 0, 0, 0];
  }
}
