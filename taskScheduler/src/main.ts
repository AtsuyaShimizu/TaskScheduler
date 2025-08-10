// src/app/main.ts
import { bootstrapApplication } from '@angular/platform-browser';
import { SchedulePage } from './app/page/schedule/schedule.page';
import { routes } from './app/app.routes';
import { provideHttpClient } from '@angular/common/http';
import { SCHEDULE_SERVICE } from './app/di/tokens';
import { MockScheduleService } from './app/domain/service/impl/mock-schedule.service';

bootstrapApplication(SchedulePage, {
  providers: [
    routes,
    provideHttpClient(),
    { provide: SCHEDULE_SERVICE, useExisting: MockScheduleService },
  ],
});
