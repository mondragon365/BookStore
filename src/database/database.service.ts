import { Configuration } from '../config/config.key';
import { ConfigService } from '../config/config.service';
import { ConfigModule } from '../config/config.module';
import { ConnectionOptions } from 'typeorm';
import { TypeOrmModule } from '@nestjs/typeorm';

export const databaseProviders = [
    TypeOrmModule.forRootAsync({
        imports: [ConfigModule],
        inject: [ConfigService],
        async useFactory(config: ConfigService) {
            return {
                type: 'postgres' as 'postgres',
                host: config.get(Configuration.HOST),
                username: config.get(Configuration.USERNAME),
                port: 5444,
                database: config.get(Configuration.DATABASE),
                password: config.get(Configuration.PASSWORD),
                entities: [__dirname + '/../**/*.entity{.ts,.js}'],
                migrations: [__dirname + '/migrations/*{.ts,.js}'],
            } as ConnectionOptions;
        },
    }),
];
// import { ConfigModule } from "src/config/config.module";
// import { ConfigService } from "src/config/config.service";
// import { ConnectionOptions } from "typeorm";
// import { Configuration } from "src/config/config.key";

// export const databaseProviders = [{
//     imports: [ConfigModule],
//     inject: [ConfigService],
//     async useFactory(config: ConfigService) {
//         return {
//             ssl: true,
//             type: 'postgres' as 'postgres',
//             host: config.get(Configuration.HOST),
//             username: config.get(Configuration.USERNAME),
//             password: config.get(Configuration.PASSWORD),
//             entities: [__dirname + '../**/*.entity{.ts,.js}'],
//             migrations: [__dirname + '../**/*.entity{.ts,.js}']
//         } as ConnectionOptions
//     }
// }]
