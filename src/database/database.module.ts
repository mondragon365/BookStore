
import { Module } from '@nestjs/common';
import { databaseProviders } from './database.service';

@Module({
    imports: [...databaseProviders],
    exports: [...databaseProviders],
    providers: [],
    controllers: []
})
export class DatabaseModule { }