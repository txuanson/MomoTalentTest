import Api from '.';

export default class UserApi {
  client = new Api('https://reqres.in/api');

  public async login(payload: {
    email: string;
    password: string;
  }): Promise<string> {
    const response = await this.client.post('/login', payload);
    return response;
  }
}
