import axios from "axios";

const API_KEY = process.env.REACT_APP_API_KEY;
const BASE_URL = 'https://api.nytimes.com/svc/search/v2/articlesearch.json';

export default async function getNewsData(word, page) {

  const URL = (word, page) => 
    `${BASE_URL}?api-key=${API_KEY}&q=${word}&page=${page}&begin_date=19800101&sort=relevance`;

  let result = await axios.get(URL(word, page)).then(res => res.data.response.docs);
  result = result.map((each) => {
    const {
      headline: { main: title },
      pub_date: date,
      snippet: content,
      web_url: url,
      _id: id,
    } = each;
    return { title, date, content, url, id, clipped: false };
  });
  return result;
};