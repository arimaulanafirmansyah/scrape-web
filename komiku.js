const fetch = require('node-fetch');
const cheerio = require('cheerio');

function komiku() {
    return new Promise((resolve, reject) => {
        fetch('https://komiku.id/cari/?post_type=manga&s='+ encodeURIComponent(komiku) , {
            method: 'get'
        })
        .then(res => res.text())
        .then(res => {
            const soup = cheerio.load(res)
            const EngTitle = [];
            const IndoTitle = [];
            const url = [];
            const thumb = [];
            const desc = [];
            const hasil = [];
            soup('div.daftar').each(function(a, b) {
                soup(b).find('h3').each(function(c, d) {
                    EngTitle.push(soup(d).text())
                })
                soup(b).find('span.judul2').each(function(c, d) {
                    IndoTitle.push(soup(d).text())
                })
            soup('div.kan').each(function(c, d) {
                soup(d).find('a').each(function(e, f){
                    url.push('https://komiku.id' + soup(f).attr('href'))
                })
                 soup(d).find('p').each(function(e, f) {
                        desc.push(soup(f).text())
                })
            })
            soup('div.bgei').each(function(c, d) {
                soup(d).find('a').each(function(e, f) {
                    soup(f).find('img').each(function(g, h) {
                        thumb.push(soup(h).attr('data-src'))
                         })
                    })
                  })
            })
            for (let i = 0; i < IndoTitle.length; i++) {
                hasil.push({
                    JudulEnglish: EngTitle[i],  
                    JudulIndonesia: IndoTitle[i],
                    url: url[i],
                    Gambar: thumb[i],
                    Deskripsi: desc[i]
                })
            }
            resolve(hasil)
        })
        .catch(reject)
    })
}

komiku('naruto')
.then(res => console.log(res))
.catch(err => console.log(err))