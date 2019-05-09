import Search from './models/Search';
import * as searchView from './views/searchView';
import { elements } from './views/base';

const state = {};
const controlSearch = () => {
  state.query = searchView.getInput();
  if (state.query) {
    searchView.clearView();
    state.search = new Search(state.query);
    state.booksCounter = 0;
    load(state.query);
  }
};
const load = async (query, startIndex = 0) => {
  try {
    await state.search.getResult(startIndex);
    searchView.renderResult(state.search.data);
    state.booksCounter += state.search.data.length;
  } catch (err) {
    console.log(err);
  }
};

elements.searchForm.addEventListener('submit', e => {
  e.preventDefault();
  controlSearch();
});

window.onscroll = () => {
  if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
    load(state.query, state.booksCounter);
  }
};
