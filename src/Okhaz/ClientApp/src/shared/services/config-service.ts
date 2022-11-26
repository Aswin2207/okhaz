import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AppConfig } from "@shared/model/app-config.model";

@Injectable({ providedIn: "root" })
export class ConfigService {
  private appConfig: AppConfig;
  constructor(private httpClient: HttpClient) {}
  initCustomConfig() {
    this.httpClient.get<AppConfig>("../app-config.json").subscribe((config) => {
      this.appConfig = config;
    });
  }
  get configuration(): AppConfig {
    return this.appConfig;
  }
}
