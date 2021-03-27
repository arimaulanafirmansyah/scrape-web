const cheerio = require('cheerio');
const fetch = require('node-fetch');

function brainly() {
    return new Promise((resolve, reject) => {
        fetch('http://149.56.24.226' , {
            method: 'get'
        })
        .then(res => res.text())
        .then(res => {
            const soup = cheerio.load(res)
            const title = [];
            const pemb = [];
            const thumb = [];
            const url = [];
            const hasil = [];
            soup('header.header').each(function(a, b) {
                soup(b).find('h2').each(function(c, d) {
                    title.push(soup(d).text())
                })
                soup('div.row').each(function(a, b) {
                soup(b).find('h3').each(function(c, d) {
                    pemb.push(soup(d).text())
                })
                soup(b).find('img').each(function(c, d) {
                    thumb.push(soup(d).attr('src'))
                })
             })
                soup(b).find('a').each(function(c, d) {
                    url.push(soup(d).attr('href'))
                })
            })
            for (let i = 0; i < title.length; i++) {
                hasil.push({
                Keterangan: title[i],
                Judul: pemb[i],
                Gambar: thumb[i],
                Url : url[i]
                
            }) 
        }
            resolve(hasil)
        })
        .catch(reject)
    })
}

brainly()
.then(res => console.log(res))
.catch(err => console.log(err))