const request = require('request');
const fs = require('fs');
const avatarDir = './avatars';


console.log('Welcome to the gitHub Avatar Downloader!');
// Sets the options for the request function
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

// Grabs the contributors from a given repo and executes a callback function
function getRepoContributors(repoOwner, repoName, cb) {
  if (!repoOwner || !repoName) {
    throw new Error("Please execute this file in form of download_avatar.js <Repository Owner> <Repository Name>");
  }

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


// Downloads a image and saves it to a new file  in a local folder
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


// The process functions pull out the arguments from the command line and passes it into the getRepoContributors function
// Calls the downloadImageByURL and makes a new file (named after the Github login), saved to my local "./avatars folder"
getRepoContributors(process.argv[2], process.argv[3], function (data) {
  data.forEach((contributor) => {
    downloadImageByURL(contributor.avatar_url, `avatars/${contributor.login}.jpg`);
  })
});

