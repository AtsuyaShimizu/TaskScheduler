// src/app/main.ts
import { bootstrapApplication } from '@angular/platform-browser';
import { SchedulePage } from './app/page/schedule/schedule.page';
import { routes } from './app/app.routes';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { SCHEDULE_SERVICE } from './app/di/tokens';
import { MockScheduleService } from './app/domain/service/impl/mock-schedule.service';

bootstrapApplication(SchedulePage, {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    { provide: SCHEDULE_SERVICE, useExisting: MockScheduleService },
  ],
});
