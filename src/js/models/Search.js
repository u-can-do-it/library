export default class Search {
  constructor(query) {
    this.query = query;
  }

  async getResult(startIndex = 0) {
    const request = `https://www.googleapis.com/books/v1/volumes?q=${
      this.query
    }&startIndex=${startIndex}`;

    try {
      const resp = await fetch(request).then(resp => resp.json());
      this.data = resp.items;
      this.totalItems = resp.totalItems;
    } catch (err) {
      console.log(err);
    }
  }
}
