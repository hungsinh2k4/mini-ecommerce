import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config'; // 1. Import Config
import { MongooseModule } from '@nestjs/mongoose'; // 2. Import Mongoose
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ProductsModule } from './products/products.module';

@Module({
  // Configure modules
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, 
    }),

    // Connect to MongoDB using Mongoose and ConfigService
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGO_URI'),
      }),
      inject: [ConfigService],
    }),

    UsersModule,
    AuthModule,
    ProductsModule,
  ],
})
export class AppModule {}