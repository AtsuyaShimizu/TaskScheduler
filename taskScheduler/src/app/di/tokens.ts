// src/app/di/tokens.ts
import { InjectionToken } from '@angular/core';
import { ScheduleService } from '../domain/service/interface/schedule.service';
import { SchedulePageStatePort } from '../domain/state/interface/schedule-page.state';

export const SCHEDULE_SERVICE = new InjectionToken<ScheduleService>('SCHEDULE_SERVICE');
export const SCHEDULE_PAGE_STATE = new InjectionToken<SchedulePageStatePort>('SCHEDULE_PAGE_STATE');
