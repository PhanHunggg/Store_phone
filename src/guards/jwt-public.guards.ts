import { AuthGuard } from '@nestjs/passport';

export class PublicGuard extends AuthGuard('jwt-public') {
  constructor() {
    super();
  }
}