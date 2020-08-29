// import { Module } from '@nestjs/common';

// @Module({})
// export class ShareddModule {}

import { Module } from '@nestjs/common';
import { MapperService } from './mapper.service';

@Module({
    imports: [MapperService],
    providers: [MapperService],
})
export class ShareddModule { }
