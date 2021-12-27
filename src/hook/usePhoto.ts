import { useSelector } from "react-redux";
import { IPhotoList } from "../redux/reducer/photo.slice";

export default function usePhoto() {
  return useSelector((state: { photo: IPhotoList }) => state.photo.list);
}