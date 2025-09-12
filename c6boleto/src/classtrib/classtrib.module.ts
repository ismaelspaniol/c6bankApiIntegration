import { Module } from '@nestjs/common';
import { ClasstribService } from './classtrib.service';
import { ClasstribController } from './classtrib.controller';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  providers: [ClasstribService],
  controllers: [ClasstribController],
})
export class ClasstribModule {}
