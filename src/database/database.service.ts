import { Injectable } from '@nestjs/common';
import { db } from './drizzle.client';

@Injectable()
export class DatabaseService {
  public db = db;
}
