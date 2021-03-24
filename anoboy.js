const cheerio = require('cheerio');
const fetch = require('node-fetch');
const title = document.querySelector('.title')

function anoboy() {
    return new Promise((resolve, reject) => {
        fetch('https://anoboy.media/?s=' , {
            method: 'get'
        })
        .then(res => res.text())
        .then(res => {
            const soup = cheerio.load(res)
            const title = [];
            const url = [];
            const hasil = [];
            soup('div.amvj').each(function(a, b) {
                soup(b).find('h3').each(function(c, d) {
                    title.push(soup(d).text())
                })
                soup('div.column-content').each(function(a, b) {
                    soup(b).find('a').each(function(c, d) {
                        url.push(soup(d).attr('href'))
                    })
                })
            })
            for (let i = 0; i < title.length; i++) {
                hasil.push({
                Judul: title[i],
                Url: url[i]

                
            }) 
        }
            resolve(hasil)
        })
        .catch(reject)
    })
}

anoboy()
.then(res => console.log(res))
.catch(err => console.log(err))