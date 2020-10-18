'use strict';

const fs = require('fs');

process.stdin.resume();
process.stdin.setEncoding('utf-8');

let inputString = '';
let currentLine = 0;

process.stdin.on('data', function(inputStdin) {
    inputString += inputStdin;
});

process.stdin.on('end', function() {
    inputString = inputString.split('\n');

    main();
});

function readLine() {
    return inputString[currentLine++];
}



/*
 * Complete the 'getTotalGoals' function below.
 *
 * The function is expected to return an INTEGER.
 * The function accepts following parameters:
 *  1. STRING team
 *  2. INTEGER year
 */
const https = require('https');

function requestData(params) {
    console.log(params)
    return new Promise((resolve, reject) => {
        https.get('https://jsonmock.hackerrank.com/api/football_matches?' + new URLSearchParams(params), (res) => {
            let data = '';
            res.on('data', (chunk) => {
                data += chunk;
            });
            res.on('end', () => {
                const rawData = JSON.parse(data);
                resolve(rawData)
            });
        })
    });
}
function getGoalsBy(key, array) {
    return array.reduce((value, match) => {
        return value + parseInt(match[key]);
    }, 0)
}
function requestDataHome({team, year}) {
    const params = {team1:team, year} ;
    const requests = [];
    return new Promise((resolve, reject) => {
        requestData(params).then((rawData) => {
            if(rawData.total_pages > 1) {
                for(let i = 0; i < rawData.total_pages; i++) {
                    requests.push(requestData({...params, page:i}))
                }
                Promise.all(requests).then((data) => {
                    const result = data.reduce((val, page) => {
                        console.log(page)
                        return val + getGoalsBy('team1goals', page.data);
                    }, getGoalsBy('team1goals', rawData.data, team))
                    resolve(result)
                })
            } else {
                resolve(getGoalsBy('team1goals', rawData.data))
            }
        });
    })
}

function requestDataVisit({team, year}) {
    const params = {team2:team, year} ;
    const requests = [];
    return new Promise((resolve, reject) => {
        requestData(params).then((rawData) => {
            if(rawData.total_pages > 1) {
                for(let i = 1; i < rawData.total_pages; i++) {
                    requests.push(requestData({...params, page:i}))
                }
                Promise.all(requests).then((data) => {
                    const result = data.reduce((val, page) => {
                        return val + getGoalsBy('team2goals', page.data);
                    }, getGoalsBy('team2goals', rawData.data))
                    resolve(result)
                })
            } else {
                resolve(getGoalsBy('team2goals', rawData.data))
            }
        });
    })
}

async function getTotalGoals(team, year) {
    const params = {team, year};
    return Promise.all([
        requestDataHome(params),
        requestDataVisit(params),
    ]).then(data => {
        console.log(data.reduce((total, cur) => total + cur))
        return data.reduce((total, cur) => total + cur)
    });

}

async function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const team = readLine();

    const year = parseInt(readLine().trim(), 10);

    const result = await getTotalGoals(team, year);

    ws.write(result + '\n');

    ws.end();
}
