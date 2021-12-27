import { useSelector } from "react-redux";
import { IPhotoList } from "../redux/reducer/photo.slice";

export default function useActivePhoto() {
  return useSelector((state: {photo: IPhotoList}) => state.photo.active);
}