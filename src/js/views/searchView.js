import { elements } from "./base";

export const getInput = () => elements.searchInput.value;

export const renderResult = items => {
  try {
    items.forEach(renderDiscription);
  } catch (err) {
    console.log(err);
  }
};
const renderDiscription = item => {
  const descCharacterLimit = 280;
  const titleCharacterLimit = 50;
  const discHTML = `
  <li class="results__item">
  <a class="results__link" href="${item.volumeInfo.previewLink}" target="blank">
      <figure class="results__fig">
          <img src="${getImg(item)}" alt="Test">
      </figure>
      <div class="results__data">
          <h4 class="results__name">${textLimiter(
            item.volumeInfo.title,
            titleCharacterLimit
          )}</h4>
          <h6 class="results__author">${item.volumeInfo.authors}</h6>
          <p class="results__description">${textLimiter(
            getDesc(item),
            descCharacterLimit
          )}</p>
      </div>
  </a>
</li>`;

  elements.searchResList.insertAdjacentHTML("beforeend", discHTML);
};

export const clearView = () => {
  elements.searchResList.innerHTML = "";
};
export const renderLoader = isLoading => {
  if (isLoading) {
    const loader = `
    <div class="loader">
    <div></div>
    <div></div>
    <div></div>
  </div>`;
    elements.searchResList.insertAdjacentHTML("beforeend", loader);
  } else {
    document.querySelector(".loader").remove();
  }
};

function getImg(item) {
  return item.volumeInfo.imageLinks
    ? item.volumeInfo.imageLinks.smallThumbnail
    : "https://weloveindiebooks.com/wp-content/uploads/2019/01/book-256.png";
}

function getDesc(item) {
  return item.volumeInfo.description
    ? item.volumeInfo.description
    : "No description";
}

const textLimiter = (text, limit) => {
  const newText = [];
  if (text.length > limit) {
    text.split(" ").reduce((acc, cur) => {
      if (acc + cur.length <= limit) {
        newText.push(cur);
      }
      return acc + cur.length;
    }, 0);
    return `${newText.join(" ")}...`;
  } else {
    return text;
  }
};
