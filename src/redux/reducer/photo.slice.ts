import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import PhotoApi from '../../api/photo.api';
import { IPhoto } from '../../model/photo.model';

const photoApiClient = new PhotoApi();

export const getPhotoList = createAsyncThunk(
  'photo/getList',
  async () => {
    const list = await photoApiClient.getListPhotos();
    return list;
  }
)

export const getPhotoDetail = createAsyncThunk(
  'photo/getDetail',
  async (payload: { photoId: number }) => {
    const response = await photoApiClient.getPhotoDetail(payload.photoId);
    return response;
  }
)

const photoSlice = createSlice({
  name: 'photo',
  initialState: {
    list: [],
    active: null,
  } as IPhotoList,
  reducers: {
    clearActive: state => {
      state.active = null;
    },
  },
  extraReducers: builder => {
    builder.addCase(getPhotoList.fulfilled, (state, action) => {
      state.list = action.payload;
    });

    builder.addCase(getPhotoDetail.fulfilled, (state, action) => {
      state.active = action.payload;
    });
  }
});

export default photoSlice.reducer;

export const { clearActive } = photoSlice.actions;

export interface IPhotoList {
  list: IPhoto[];
  active: IPhoto | null;
}
