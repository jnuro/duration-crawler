import cheerio from 'cheerio';
import moment from 'moment';
export default function parser(body = "") {
    const $ = cheerio.load(body, {
        xml: {
            normalizeWhitespace: true,
            withDomLv1: true,
        }
    });
    return {
        semester: (() => {
            const arr = [];
            const year = new Date().getUTCFullYear();
            let item;
            $('dl.sub_content_list dl>dd>table tr')
                .filter(function() {
                    return $(this).text().match('(개강)|(종강)');
                })
                .slice(1) // 전학기 동기계절 종강 커트
                .map(function() {
                    return $(this).children().first().text().trim().slice(0, 6)
                })
                .each(function(i, elem) {
                    if(i % 2 == 0) {
                        item = {
                            start: `${year}. ${elem}`
                        }
                    } else {
                        item.end = `${i === 7 ? year + 1 : year}. ${elem}`
                        arr.push(item);
                    }
                });
            return arr;
        })(),
        holiday: (() => {
            const arr = [];
            return $('dl.sub_content_list ul li table tr')
                .slice(1)
                .map(function() {
                    return $(this).children().length > 3 ? $(this).children().slice(1) : $(this).children();
                })
                .not(function() {
                    return $(this).last().text().match("(대동제)|(단과대학)")
                })
                .get()
                .map(item => item.first().text())
        })(),
    }
}