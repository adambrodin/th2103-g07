import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  constructor() {}

  @Get('/api')
  get(): string {
    return 'API IS UP AND WORKING!';
  }
}
