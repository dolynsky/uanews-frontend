import axios from "axios";

export default async function() {
    let urls = [];

    const cities = ["zhitomir", "kirovograd"]

    cities.forEach(city => {
        for (let page = 1; page < 2; page++) {
            urls.push(getUrl(city, page));
        }
    });

    return axios.all(urls.map(url => axios.get(url)))
    .then(axios.spread(function(...responses) {
        let topics = [];
        responses.forEach(res => {
            const {tops, Title} = res.data;
            tops.forEach(top => top.Region = Title);
            topics = topics.concat(tops);
        })
        topics.sort((a, b) => b.DateCreated - a.DateCreated);
        topics = topics.map(topic => {
            const {Region, DateCreated, Title, PartnerTitle, Url, Id} = topic;
            return {Region, DateCreated, Title, PartnerTitle, Url, Id};
        });
        return topics;
    }));
}

function getUrl(city, page) {
    const template = "/news/dat/{city}/{page}";
    let url = template.replace("{city}", city);
    if (page > 1) {
        url = url.replace("{page}", String(page) + "/");
    } else {
        url = url.replace("{page}", "");
    }
    return url;
}