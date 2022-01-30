const button_random = document.getElementById('random');
const selectanime = document.querySelector('#list');

function get_quote(){
    fetch('https://animechan.vercel.app/api/random')
        .then(response => response.json())
        .then(quote => {
            const div_quote = document.getElementById('quote');
            while (div_quote.firstChild) {
                div_quote.removeChild(div_quote.firstChild);
            }

            const char_name = document.createElement('p');
            const char_quote = document.createElement('p');
            char_name.innerHTML = `${quote.character} from ${quote.anime}`;
            char_quote.innerHTML = `${quote.quote}`;
            div_quote.appendChild(char_name);
            div_quote.appendChild(char_quote);
            display_first_anime(quote.anime);
        })
}

function display_first_anime(anime_name){
    fetch(`https://api.jikan.moe/v4/anime?q=${anime_name}&sfw`)
        .then(response => response.json())
        .then(anime => {
            const div_anime_main = document.getElementById('anime_list');
            while (anime_list.firstChild) {
                anime_list.removeChild(anime_list.firstChild);
            }
            anime.data.forEach(element => {
                const div_anime = document.createElement('div');
                div_anime.classList.add('tmp');
                const anime_title = document.createElement('h3');
                const anime_img = document.createElement('img');
                anime_title.innerHTML = element.title;
                anime_img.src = element.images.jpg.image_url;
                div_anime.appendChild(anime_title);
                div_anime.appendChild(anime_img);
                div_anime_main.appendChild(div_anime);
            });
            

        })
}

function init_anime_list(){
    fetch('https://animechan.vercel.app/api/available/anime')
        .then(response => response.json())
        .then(anime_list => {
            anime_list.forEach(anime_sel => {
                const animeOption = document.createElement('option');
                animeOption.innerHTML = anime_sel;
                animeOption.value = anime_sel;
                selectanime.appendChild(animeOption);
            });
    })
}

button_random.addEventListener('click', get_quote);
init_anime_list();
selectanime.addEventListener('change', (event) => {
    fetch(`https://animechan.vercel.app/api/quotes/anime?title=${event.target.value}`)
    .then(response => response.json())
    .then(quotes => {
        let random = Math.floor(Math.random() * 10);
        const div_quote = document.getElementById('quote');
        while (div_quote.firstChild) {
            div_quote.removeChild(div_quote.firstChild);
        }
        let tmp_quote = quotes[random];
        const char_name = document.createElement('p');
        const char_quote = document.createElement('p');
        char_name.innerHTML = `${tmp_quote.character} from ${tmp_quote.anime}`;
        char_quote.innerHTML = `${tmp_quote.quote}`;
        div_quote.appendChild(char_name);
        div_quote.appendChild(char_quote);
        display_first_anime(tmp_quote.anime);
    })}
)