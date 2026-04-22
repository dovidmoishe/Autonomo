import { Body, Controller, Post } from '@nestjs/common';
import { AutonomoService } from './autonomo.service';
import { validatePreviewSimulation } from './validators';

@Controller('simulations')
export class SimulationsController {
  constructor(private readonly autonomoService: AutonomoService) {}

  @Post('preview')
  previewSimulation(@Body() body: unknown) {
    const payload = validatePreviewSimulation(body);
    const preview = this.autonomoService.previewSimulation(payload);

    return {
      preview,
    };
  }
}
