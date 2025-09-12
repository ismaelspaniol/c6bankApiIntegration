import { Controller, Get } from '@nestjs/common';
import { ClasstribService } from './classtrib.service';

@Controller('classtrib')
export class ClasstribController {
  constructor(private readonly classtribService: ClasstribService) {}

  @Get()
  async getUsers(): Promise<string> {
    return this.classtribService.getClassTrib();
  }
}
