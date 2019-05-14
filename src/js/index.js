import Search from "./models/Search";
import * as searchView from "./views/searchView";
import { elements } from "./views/base";

const state = {
  isLoading: false
};
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
  toggleLoad();
  try {
    await state.search.getResult(startIndex);
    toggleLoad();
    searchView.renderResult(state.search.data);
    state.booksCounter += state.search.data.length;
  } catch (err) {
    console.log(err);
  }
};
const toggleLoad = () => {
  if (!state.isLoading) {
    state.isLoading = true;
    searchView.renderLoader(true);
  } else {
    state.isLoading = false;
    searchView.renderLoader(false);
  }
};
elements.searchForm.addEventListener("submit", e => {
  e.preventDefault();
  controlSearch();
});

window.onscroll = () => {
  if (
    window.innerHeight + window.scrollY >= document.body.offsetHeight &&
    !state.isLoading
  ) {
    load(state.query, state.booksCounter);
  }
};
