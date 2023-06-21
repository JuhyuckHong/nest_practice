import { Module } from '@nestjs/common';
import { BoardsModule } from './boards/boards.module';
import { typeORMConfig } from './configs/typeorm.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
    imports: [
        JwtModule.register({
            secret: 'jmt',
            signOptions: {
                expiresIn: 60*60,
            }
        }),
        TypeOrmModule.forRoot(typeORMConfig),
        BoardsModule,
        AuthModule,
    ],
})
export class AppModule {}
