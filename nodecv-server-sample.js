'use strict';

const fs = require('fs');
const path = require('path');
const wd = require('macaca-wd');
const request = require('request');

const remoteHost = 'http://localhost:9900';

const image1Path = path.join(__dirname, 'fixture', 'logo.png');
const image2Path = path.join(__dirname, 'fixture', 'T-Shirt.jpg');

const formData = {
  custom_file1: {
    value: fs.createReadStream(image1Path),
    options: {
      filename: 'logo.png',
      contentType: 'image/png'
    }
  },
  custom_file2: {
    value: fs.createReadStream(image2Path),
    options: {
      filename: 'T-Shirt.jpg',
      contentType: 'image/jpeg'
    }
  }
};

request.post({
  url: `${remoteHost}/opencv/dissimilarity`,
  formData: formData
}, function(err, httpResponse, body) {
  if (err) {
    return console.error('upload failed:', err);
  }
  console.log('Server responded with:', body);
  try {
    const data = JSON.parse(body);
    console.log(`Dissimilarity is: ${data.dissimilarity}`);
  } catch (e) {
  }
});

/////////////////////////////////////////////////////////////////

const image1Path = path.join(__dirname, 'fixture', 'T-Shirt.jpg');
const image2Path = path.join(__dirname, 'fixture', 'T-Shirt-logo.jpg');

const formData = {
  custom_file1: {
    value: fs.createReadStream(image1Path),
    options: {
      filename: 'T-Shirt-logo.jpg',
      contentType: 'image/jpeg'
    }
  },
  custom_file2: {
    value: fs.createReadStream(image2Path),
    options: {
      filename: 'T-Shirt.jpg',
      contentType: 'image/jpeg'
    }
  }
};

request.post({
  url: `${remoteHost}/opencv/matchtemplate`,
  formData: formData
}, function(err, httpResponse, body) {
  if (err) {
    return console.error('upload failed:', err);
  }
  console.log('Server responded with:', body);
  try {
    const data = JSON.parse(body);
    console.log(`match[x:${data.match[1]}, y:${data.match[2]}, width:${data.match[3]}, height:${data.match[4]}]`);
  } catch (e) {
  }
});

//////////////////////////////////////////////////////////////////////

wd.addPromiseChainMethod('nodecv_matchtemplate', (image1Path, image2Path) => {
  return new Promise((resolve, reject) => {

    const formData = {
      custom_file1: {
        value: fs.createReadStream(image1Path),
        options: {
          filename: 'T-Shirt-logo.jpg',
          contentType: 'image/jpeg'
        }
      },
      custom_file2: {
        value: fs.createReadStream(image2Path),
        options: {
          filename: 'T-Shirt.jpg',
          contentType: 'image/jpeg'
        }
      }
    };

    request.post({
      url: `${remoteHost}/opencv/matchtemplate`,
      formData: formData
    }, function(err, httpResponse, body) {
      if (err) {
        return console.error('upload failed:', err);
      }
      console.log('Server responded with:', body);
      try {
        const data = JSON.parse(body);
        console.log(`match[x:${data.match[1]}, y:${data.match[2]}, width:${data.match[3]}, height:${data.match[4]}]`);
        resolve();
      } catch (e) {
      }
    });

  });
});

const image1Path = path.join(__dirname, 'fixture', 'T-Shirt.jpg');
const image2Path = path.join(__dirname, 'fixture', 'T-Shirt-logo.jpg');

driver.nodecv_matchtemplate(image1Path, image2Path);
