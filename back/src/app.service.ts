import { Injectable } from '@nestjs/common';


@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello  from AGRO menagerie API ;)';
  }
}
