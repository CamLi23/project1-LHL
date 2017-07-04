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

    try {
      const data = JSON.parse(body);

      data.forEach((contributor) => {
        console.log(contributor.login);
      });

      cb(data);
    } catch (err) {
      console.log('Failed to parse content body');
    }

  });
}



/*request.get(`https://api.github.com/repos/${repoOwner}/${repoName}/contributors`)
         .on('error', function( err) {
          throw err;
         })
         .on('response', function (res) {

         });*/



getRepoContributors("jquery", "jquery", function(err, result) {
  console.log("Errors:", err);
  console.log("Result:", result);
});
