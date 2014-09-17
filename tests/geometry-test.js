'use strict';

var la = require('sylvester'),
    Matrix = la.Matrix,
    Vector = la.Vector,
    Canvas = require('canvas');

var bundler = require('../src/math/bundler.js'),
    sample = require('../src/utils/samples.js'),
    drawFeatures = require('../src/visualization/drawFeatures.js'),
    testUtils = require('../src/utils/testing.js');


function testCam(index){

    var cam = sample.getCamera(index),
        R = Matrix.create(cam.R),
        t = Vector.create(cam.t),
        focal = cam.focal;

    return sample
        .promiseCanvasImage(index)
        .then(function(img){
            var points = sample.sparse.map(function(p){
                var X = Vector.create(p.point);
                return bundler.world2RT(X, R, t, focal, img.width, img.height);
            });
            var canv = new Canvas();
            canv.width = img.width;
            canv.height = img.height;
            var ctx = canv.getContext('2d');
            ctx.drawImage(img, 0, 0);
            drawFeatures(ctx, points, 0, 0, 1, {markSize: 10});
            return testUtils.promiseWriteCanvas(canv, '/home/sheep/Code/geo.png')
        });

}

function getVisiblePoints(index){

}

testCam(10);