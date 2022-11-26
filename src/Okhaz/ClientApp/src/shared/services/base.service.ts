import { Injectable, Inject } from "@angular/core";
import { map } from "rxjs/operators";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";
import { ConfigService } from "./config-service";
@Injectable({
  providedIn: "root",
})
export class BaseService {
  private http: HttpClient;
  protected jsonParseReviver: ((key: string, value: any) => any) | undefined =
    undefined;

  constructor(
    @Inject(HttpClient) http: HttpClient,
    private configService: ConfigService
  ) {
    this.http = http;
  }

  getHtml<T>(url: string): Observable<any> {
    const headers: HttpHeaders = new HttpHeaders({ Accept: "text/html" });
    return this.http.get(this.apiUrl(url) + url, {
      headers: headers,
      responseType: "text",
    });
  }
  get<T>(url: string): Observable<T> {
    return this.http.get<T>(this.apiUrl(url) + url, { observe: "body" });
  }

  getUsingParams<T>(url: string, params: HttpParams): Observable<T> {
    return this.http.get<T>(this.apiUrl(url) + url, {
      observe: "body",
      params: params,
    });
  }

  getJson<T>(filePath: string): Observable<T> {
    return this.http.get<T>(filePath);
  }

  DownloadFile(url: string): Observable<any> {
    const headers = new HttpHeaders();
    headers.append("Content-type", "application/json");
    headers.append("Accept-Language", "pt-BR,pt;q=0.8,en-US;q=0.5,en;q=0.3");
    headers.append("Accept-Encoding", "gzip, deflate");

    return this.http.get(this.apiUrl(url) + url, {
      headers: headers,
      responseType: "blob",
    });
  }
  DownloadFilePostData(url: string, postBody: any): Observable<any> {
    const headers = new HttpHeaders();
    headers.append("Content-type", "application/json");
    headers.append("Accept-Language", "pt-BR,pt;q=0.8,en-US;q=0.5,en;q=0.3");
    headers.append("Accept-Encoding", "gzip, deflate");

    return this.http.post(this.apiUrl(url) + url, postBody, {
      headers: headers,
      responseType: "blob",
    });
  }
  postData(url: string) {
    return this.http.post(this.apiUrl(url) + url, {}).pipe(
      map((res: Response) => {
        return this.handleResponse(res);
      })
    );
  }
  post(url: string, postBody: any) {
    return this.http.post(this.apiUrl(url) + url, postBody).pipe(
      map((res: Response) => {
        return this.handleResponse(res);
      })
    );
  }

  /**
   * This Method can be used Handle null response values.
   * @param url POST URL
   * @param postBody JSON text
   */
  postWithResponseObserve(url: string, postBody: any) {
    return this.http.post(this.apiUrl(url) + url, postBody, {
      observe: "response",
    });
  }

  delete(url: string) {
    return this.http.delete(this.apiUrl(url) + url).pipe(
      map((res: Response) => {
        return this.handleResponse(res);
      })
    );
  }

  deleteWithResponseObserve(url: string) {
    return this.http.delete(this.apiUrl(url) + url, { observe: "response" });
  }

  put(url: string, putData: any) {
    return this.http.put(this.apiUrl(url) + url, putData).pipe(
      map((res: Response) => {
        return this.handleResponse(res);
      })
    );
  }

  putWithResponseObserve(url: string, putData: any) {
    return this.http.put(this.apiUrl(url) + url, putData, {
      observe: "response",
    });
  }

  getFormData(headers: HttpHeaders) {
    headers["Content-Type"] = "multipart/form-data";
  }
  upload(url: string, file) {
    const formData: FormData = new FormData();
    if (file) {
      formData.append("file-content", file.value);
      formData.append("file-name", file.name);
      formData.append("file-type", file.type);
      const head = new HttpHeaders();
      this.getFormData(head);
      return this.http
        .post(this.apiUrl(url) + url, formData, {
          headers: head,
          reportProgress: true,
        })
        .pipe(
          map((res: Response) => {
            return this.handleResponse(res);
          })
        );
    }
  }

  formUrlParam(url, data) {
    let queryString: String = "";
    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        if (!queryString) {
          queryString = `?${key}=${data[key]}`;
        } else {
          queryString += `&${key}=${data[key]}`;
        }
      }
    }
    return url + queryString;
  }
  get notificationUrl(): string {
    return this.configService.configuration?.apiBaseUrl;
  }
  private apiUrl(endpointUrl: string): string {
    //replace base url for authentication api
    const baseApiUrl =
      endpointUrl?.indexOf("authapi") > -1
        ? this.configService.configuration?.authApiUrl
        : this.configService.configuration?.apiBaseUrl;
    return baseApiUrl;
  }
  private handleResponse(res: Response): any {
    return res as any;
  }
}
