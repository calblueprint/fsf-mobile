/**
 * This file provides async function calls for internal FSF news API
 *
 * It contains the following functions:
 *
 * async function getArticles()
 *
 */

/**
 *  GET request to rails API endpoint for list of articles
 *
 * @return a list of FSF news articles in JSON or an error
 */
async function getArticles() {
  try {
    let response = await fetch("https://static.fsf.org/fsforg/rss/news.xml");
    let responseText = await response.text();
    //console.log(responseText);
  } catch (error) {
    console.error(error);
  }
}

export { getArticles };
