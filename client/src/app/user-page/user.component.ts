import { Component, OnInit } from '@angular/core';
import { Abonements, UserInfo, Lesson } from '../models/models';
import { AbonementsService } from '../services/abonements.service';
import { LessonsService } from '../services/lessons.service';
import { UserInfoService } from '../services/user-info.service';
import { SessionService } from '../services/session.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
  providers: [UserInfoService],
})
export class UserComponent implements OnInit {
  userIsActive: boolean = false;
  userInfo: UserInfo;
  abonements: Abonements;
  lessons: Lesson[];
  abonementsVal: number;
  progressColor: string = 'primary';

  constructor(
    private userInfoService: UserInfoService,
    private sessionService: SessionService,
    private abonementsService: AbonementsService,
    private lessonsService: LessonsService
  ) {}

  async ngOnInit() {
    this.userInfo = await this.userInfoService.getUserInfo();
    this.abonements = await this.abonementsService.getAbonementsInfo();
    this.lessons = await this.lessonsService.getLessonsInfo();
    this.userIsActive = true;
    this.calcAbonementsVal();
  }

  logOut() {
    this.sessionService.logOut();
  }

  // Считает знаечение прогресс-бара
  calcAbonementsVal() {
    const startDate = new Date(this.abonements.startDate),
      endDate = new Date(this.abonements.endDate),
      today = new Date(),
      // Максимальное количество дней
      max = Math.floor((+endDate - +startDate) / 86400000),
      percent = 100 / max;

    // Если срок абонемента истек, то возвращаем 0 и окрашиваем прогресс-бар в красный
    if (+today > +endDate)
      return (this.abonementsVal = 0), (this.progressColor = 'warn');

    this.abonementsVal = Math.floor(
      ((+today - +startDate) / 86400000) * percent
    );
  }
}
