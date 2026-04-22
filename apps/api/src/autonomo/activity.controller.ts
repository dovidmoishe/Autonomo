import { Controller, Get, Query } from '@nestjs/common';
import { AutonomoService } from './autonomo.service';

@Controller('activity')
export class ActivityController {
  constructor(private readonly autonomoService: AutonomoService) {}

  @Get()
  getActivity(@Query('walletAddress') walletAddress?: string) {
    const events = this.autonomoService.listActivity(walletAddress);

    return {
      events,
    };
  }
}
