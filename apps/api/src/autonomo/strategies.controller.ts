import { Body, Controller, Post } from '@nestjs/common';
import { AutonomoService } from './autonomo.service';
import { validateCreateStrategy } from './validators';

@Controller('strategies')
export class StrategiesController {
  constructor(private readonly autonomoService: AutonomoService) {}

  @Post()
  createStrategy(@Body() body: unknown) {
    const payload = validateCreateStrategy(body);
    const strategy = this.autonomoService.createStrategy(payload);

    return {
      strategy,
    };
  }
}
