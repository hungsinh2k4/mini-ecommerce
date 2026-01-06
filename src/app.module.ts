import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config'; // 1. Import Config
import { MongooseModule } from '@nestjs/mongoose'; // 2. Import Mongoose
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ProductsModule } from './products/products.module';

@Module({
  imports: [
    // Cấu hình để đọc file .env
    ConfigModule.forRoot({
      isGlobal: true, // Để dùng được biến môi trường ở mọi nơi
    }),
    
    // Kết nối MongoDB bất đồng bộ (chờ đọc xong .env mới connect)
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