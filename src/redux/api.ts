export interface IRequestParams {
  method: string;
  url: string;
  queryParameters?: { [key: string]: string | boolean | number | Date | undefined };
  body?: Object;  
}

export abstract class ApiService {
  protected async executeRequest<T>(params: IRequestParams) {
    return new Promise<T>((resolve, reject) => {      
      let queryString = '';
      if (params.queryParameters) {        
        Object.entries(params.queryParameters).forEach(([key, value]) => {
          queryString += key + '=' + value + '&';
        });
        queryString = queryString.slice(0, -1);
      }

      const fetchUrl = params.url + '?' + queryString;
      
      fetch(fetchUrl)
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
