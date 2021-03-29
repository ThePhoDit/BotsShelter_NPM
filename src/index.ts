import Axios from 'axios';
import { ResponseData } from '../types';

export async function get(id: string): Promise<ResponseData | undefined> {
  const response = await Axios.get<object>(`https://bots.tutoshelter.me/bot/${id}`, { responseType: 'json' }).catch(
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
