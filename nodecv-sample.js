'use strict';

const fs = require('fs');
const path = require('path');
const nodecv = require('nodecv');

const image1Path = path.join(__dirname, 'fixture', 'logo.png');
const image2Path = path.join(__dirname, 'fixture', 'T-Shirt.jpg');

nodecv.imread(image1Path, (err, image1) => {
  if (err) {
    throw err;
  }
  nodecv.imread(image2Path, (err, image2) => {
    if (err) {
      throw err;
    }
    nodecv.imageDissimilarity(image1, image2, (err, dissimilarity) => {
      if (err) {
        throw err;
      }
      console.log(`Dissimilarity: ${dissimilarity}`);
    });
  });
});

//////////////////////////////////////////////////////////////////////////

const color = [0, 0, 255];
const image1Path = path.join(__dirname, 'fixture', 'T-Shirt-logo.jpg');
const image2Path = path.join(__dirname, 'fixture', 'T-Shirt.jpg');
const outputPath = path.join(__dirname, 'output.jpg');
nodecv.imread(image2Path, (err, image1) => {
  if (err) {
    throw err;
  }
  nodecv.imread(image1Path, (err, image2) => {
    if (err) {
      throw err;
    }
    var match = nodecv.matchTemplate(image1, image2, 5);
    image1.rectangle([match[1], match[2]], [match[3], match[4]], color, 1);
    nodecv.imwrite(outputPath, image1);
    console.log(match);
    console.log(`output to: ${outputPath}`);
  });
});

/////////////////////////////////////////////////////////////////////////////

const color = [0, 0, 255];
const imagePath = path.join(__dirname, 'fixture', 'T-Shirt.jpg');
const outputPath = path.join(__dirname, 'output.jpg');
const haarcascade = path.join(__dirname, 'fixture', 'haarcascade_frontalface_alt2.xml');
nodecv.imread(imagePath, (err, im) => {
  if (err) {
    throw err;
  }

  if (im.width() < 1 || im.height() < 1) {
    throw new Error('Image has no size');
  }
  var face_cascade = new nodecv.CascadeClassifier(haarcascade);
  var opts = {};
  face_cascade.detectMultiScale(im, (err, faces) => {
    if (err) {
      throw err;
    }

    for (var i = 0; i < faces.length; i++) {
      var face = faces[i];
      im.rectangle([face.x, face.y], [face.width, face.height], color, 1);
    }
    nodecv.imwrite(outputPath, im);
    console.log(`output to: ${outputPath}`);
  }, opts.scale, opts.neighbors, opts.min && opts.min[0], opts.min && opts.min[1]);
});
