import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { Article } from '@/components/NewsArticle';

export interface CurrentArticle {
  article: Article;
  articleQuery: string;
}

const initialState: CurrentArticle = {
  article: {
    source: { id: '', name: '' },
    author: 'Somethig has gone wrong',
    title: 'Somethig has gone wrong',
    description: 'Somethig has gone wrong',
    url: 'Somethig has gone wrong',
    urlToImage: 'Somethig has gone wrong',
    publishedAt: 'Somethig has gone wrong',
    content: 'Somethig has gone wrong',
  },
  articleQuery: ''
};

export const articleSlice = createSlice({
  name: 'article',
  initialState,
  reducers: {
    saveArticle: (state, action: PayloadAction<Article>) => {
      state.article = action.payload;
    },
    searchArticleQuery: (state, action: PayloadAction<string>) => {
      state.articleQuery = action.payload
    },

  },
});

export const { saveArticle, searchArticleQuery } = articleSlice.actions;

export default articleSlice.reducer;
