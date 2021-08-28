import Axios from 'axios';
import { ResponseData } from '../types';

export default class Client {
  private token: string;

  constructor(token: string) {
    this.token = token;
  }

  async get(id: string): Promise<ResponseData | undefined> {
    const response = await Axios.get<object>(`https://bots.phodit.xyz/bot/${id}`, { responseType: 'json' }).catch(
      (error) => error.response,
    );

    if (response.status === 200) {
      const { data } = response;

      for (const prop of ['collaborators', 'votes', 'addedat']) {
        if (!Object.prototype.hasOwnProperty.call(data, prop)) continue;
        // @ts-ignore
        data[prop] = JSON.parse(data[prop]);
      }

      return data as ResponseData;
    } else if (response.status === 404 || (response.response && response.response.status === 404)) return undefined;
    else throw new Error(response.message);
  }

  async vote(id: string): Promise<boolean> {
    const response = await Axios({
      method: 'POST',
      url: `https://bots.phodit.xyz/bot/${id}/vote`,
      headers: {
        Authorization: this.token,
      },
      responseType: 'json',
    }).catch((error) => error.response);

    if (response.status === 200) return true;
    else if (response.status === 429) return false;
    else if (response.status === 404) return false;
    else throw new Error(response.message);
  }
}