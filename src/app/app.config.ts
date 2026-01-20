import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { authInterceptor } from './core/interceptors/auth-interceptor';
import { errorInterceptor } from './core/interceptors/error.interceptor';
import { API_URL } from './core/tokens/api-url.token';
import { environment } from './environments/environment';

export const appConfig: ApplicationConfig = {
  providers: [
    //error handling
    provideBrowserGlobalErrorListeners(),
    //ssr hydration
    provideClientHydration(withEventReplay()),
    //routing
    provideRouter(routes),
    //http client dan interceptors
    provideHttpClient(
      withFetch(),  //fetch api modern
      withInterceptors([authInterceptor, errorInterceptor])
    ),
    //provide api url
    {provide: API_URL, useValue: environment.apiUrl}
  ]
};
