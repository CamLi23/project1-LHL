const request = require('request');
const fs = require('fs');
const avatarDir = './avatars';


console.log('Welcome to the gitHub Avatar Downloader!');

function getRequestOptions(path) {
  return {
    url: 'https://api.github.com/' + path,
    headers: {
      'User-Agent': 'camli23'
    },
    qs: {
      access_token: process.env.GITHUB_ACCESS_TOKEN
    }
  };
}


function getRepoContributors(repoOwner, repoName, cb) {
  request(getRequestOptions(`repos/${repoOwner}/${repoName}/contributors`), function (error, response, body) {
    var data;

    try {
      data = JSON.parse(body);

    } catch (error) {
      console.log('Failed to parse content body');
    }

      cb(data);


  });
}


/*data.forEach((contributor) => {
        final.push(contributor.avatar_url);
      })*/



function downloadImageByURL(url, filePath) {
  request.get(url)
         .on('error', function (err) {
          throw err;
         })
         .on('response', function (res) {
          const writeStream = fs.createWriteStream(filePath);
          res.pipe(writeStream);

         });
}


/*request.get(`https://api.github.com/repos/${repoOwner}/${repoName}/contributors`)
         .on('error', function( err) {
          throw err;
         })
         .on('response', function (res) {

         });*/



getRepoContributors("jquery", "jquery", function (data) {
  data.forEach((contributor) => {
    downloadImageByURL(contributor.avatar_url, `avatars/${contributor.login}.jpg`);
  })
});
// downloadImageByURL("https://avatars2.githubusercontent.com/u/43004?v=3", "avatars/githubUserAv.jpg");
