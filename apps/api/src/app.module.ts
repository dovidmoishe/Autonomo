import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ActivityController } from './autonomo/activity.controller';
import { SimulationsController } from './autonomo/simulations.controller';
import { StrategiesController } from './autonomo/strategies.controller';
import { AutonomoService } from './autonomo/autonomo.service';

@Module({
  imports: [],
  controllers: [
    AppController,
    StrategiesController,
    SimulationsController,
    ActivityController,
  ],
  providers: [AppService, AutonomoService],
})
export class AppModule {}
