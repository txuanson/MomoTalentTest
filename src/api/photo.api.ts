import Api from '.';
import { IPhoto } from '../model/photo.model';

export default class PhotoApi {
  client = new Api('https://jsonplaceholder.typicode.com');

  public async getListPhotos(): Promise<IPhoto[]> {
    const listPhotos = await this.client.get('/photos');
    return listPhotos;
  }

  public async getPhotoDetail(photoId: number): Promise<IPhoto> {
    const photo = await this.client.get(`/photos/${photoId}`);
    return photo;
  }
}
