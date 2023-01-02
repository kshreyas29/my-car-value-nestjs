import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private repo: Repository<User>) {}
  create(email: string, password: string) {
    let userEntity = this.repo.create({ email, password });
    return this.repo.save(userEntity);
  }

  findOne(id: number) {
    return this.repo.findOneBy({ id });
  }

  find(email: string) {
    return this.repo.find({ where: { email } });
  }

  async update(id: number, attrs: Partial<User>) {
    let userFound = await this.repo.findOne({ where: { id } });
    if (!userFound) {
      throw 'User Not Found';
    }
    userFound = { ...userFound, ...attrs };
    return this.repo.save(userFound);
  }

  async remove(id: number) {
    let userFound = await this.repo.findOne({ where: { id } });
    if (!userFound) {
      throw 'User Not Found';
    }
    this.repo.remove(userFound);
  }
}
