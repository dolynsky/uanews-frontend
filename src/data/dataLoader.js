import axios from "axios";

export default async function() {
    let urls = [];

    const cities = ["zhitomir"]

    for (const city of cities) {
        for (let page = 1; page < 3; page++) {
            urls.push(getUrl(city, page));
        }
    }

    axios.all(urls.map(url => axios.get(url)))
    .then(axios.spread(function(...responses) {
        console.log(responses.length);
    }));
}

function getUrl(city, page) {
    const template = "https://www.ukr.net/news/dat/{city}/{page}";
    let url = template.replace("{city}", city);
    if (page > 1) {
        url = url.replace("{page}", String(page) + "/");
    } else {
        url = url.replace("{page}", "");
    }
    return url;
}