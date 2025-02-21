import { ApplicationConfig, LOCALE_ID, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import zh from '@angular/common/locales/zh'; // 更改地區為繁體中文
import { registerLocaleData } from '@angular/common'; // 註冊地區
import { provideHttpClient } from '@angular/common/http';
registerLocaleData(zh); // 將專案更改地區為繁體中文

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes), provideClientHydration(withEventReplay()),
    provideAnimationsAsync(),
    provideAnimationsAsync(),
    { provide: LOCALE_ID, useValue: 'zh-TW' }, // 更改地區為繁體中文
    provideHttpClient(),
  ]
};
