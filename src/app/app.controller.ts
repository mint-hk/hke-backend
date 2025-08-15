import { Controller } from '@nestjs/common';
import { ApiExcludeController } from '@nestjs/swagger';

@ApiExcludeController()
@Controller()
export class AppController {}
