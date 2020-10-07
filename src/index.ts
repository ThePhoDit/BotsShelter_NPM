import Axios from 'Axios';
import { ResponseData } from '../types';

export async function get(id: string): Promise<ResponseData | undefined> {
  const response = await Axios.get<object>(`https://bots.tutoshelter.me/v1/bots/${id}`, { responseType: 'json' }).catch(
    (error) => error.response,
  );

  if (response.status === 200) {
    const { data } = response;

    for (const prop of ['collaborators', 'votes', 'addedat']) {
      // @ts-ignore
      data[prop] = JSON.parse(data[prop]);
    }

    return data as ResponseData;
  } else if (response.status === 404) return undefined;
  else throw new Error(response.message);
}
