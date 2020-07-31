export interface IRequestParams {
  method: string;
  url: string;
  queryParameters?: { [key: string]: string | boolean | number | Date | undefined };
  body?: Object;  
}

export abstract class ApiService {

  protected getQueryString(params: any) {
    var esc = encodeURIComponent;
    return Object.keys(params)
      .map(k => esc(k) + '=' + esc(params[k]))
      .join('&');
  }

  protected async executeRequest<T>(params: IRequestParams) {
    return new Promise<T>((resolve, reject) => {      
      const method = params.method || 'GET';
      let queryString = '';
      let body;
           
      if (['GET', 'DELETE'].indexOf(method) > -1 && params.queryParameters) {
        queryString = '?' + this.getQueryString(params.queryParameters);
      } else { // POST or PUT 
        body = JSON.stringify(params.body);
      }       

      const fetchUrl = params.url + queryString;

      fetch(fetchUrl, { method, body })
      .then((result: any) => {
        resolve(result.json());
      }).catch((error: any) => {
        reject(error);
      });
    });
  }
}

export class Api extends ApiService {
  baseApiUrl: string;
  constructor(url: string) {
    super()
    this.baseApiUrl= url;
  }
  
  public async get(url: string, data: any, query: any) {
    const requestParams: IRequestParams = {
      method: 'GET',
      url: `${this.baseApiUrl}/${url}`,
      body: data,
      queryParameters: query
    };
    return this.executeRequest(requestParams);
  }
}
