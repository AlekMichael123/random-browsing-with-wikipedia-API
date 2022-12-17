import fetchJsonp from "fetch-jsonp";
import WikipediaAPIParse from "./wikipedia-API.types";
import "./style.css";

function main() {
    const searchInput = document.getElementById(
        "search-input"
    ) as HTMLInputElement;
    const searchButton = document.getElementById(
        "search-button"
    ) as HTMLButtonElement;
    const articleDIV = document.getElementById("article") as HTMLDivElement;
    const suggestion = document.getElementById("suggestion") as HTMLSpanElement;

    let randomPage: string | undefined;
    let interval: number | null = null;
    let count = 5;

    function addArticle(innerHTML: string) {
        articleDIV.innerHTML = innerHTML;

        // find a random word in this article
        const regex = /^[A-Z]+$/i;
        const words = innerHTML.split(" ").filter(word => regex.test(word));

        count = 5;
        randomPage = words[Math.floor(Math.random() * words.length)];

        interval = setInterval(() => {
            suggestion.textContent = `Trying the article (${randomPage}) in ${count--} seconds.`;
            if (count <= 0) getNewPage(randomPage!);
        }, 1000);
    }

    async function getNewPage(term: string) {
        if (interval !== null) clearInterval(interval);

        const URL = `https://en.wikipedia.org/w/api.php?action=parse&page=${term}&format=json`;

        let data: WikipediaAPIParse;
        try {
            data = await (await fetchJsonp(URL)).json();

            if (data.error) throw data.error;
            searchInput.value = term;
            addArticle(data.parse!.text["*"]);
        } catch (err) {
            console.error(err);
            if (searchInput.value !== term) getNewPage(searchInput.value);
        }
    }

    searchButton.addEventListener("click", () => {
        const searchTerm = searchInput.value;
        getNewPage(searchTerm);
    });
}

window.addEventListener("load", main);
