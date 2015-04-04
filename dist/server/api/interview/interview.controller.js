/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /interviews              ->  index
 * POST    /interviews              ->  create
 * GET     /interviews/:id          ->  show
 * PUT     /interviews/:id          ->  update
 * DELETE  /interviews/:id          ->  destroy
 */

'use strict';

var _ = require('lodash');
var interview = require('./interview.model');
// Get list of interviews
exports.index = function(req, res) {
  interview.find(function (err, interviews) {
    if(err) { return handleError(res, err); }
    return res.json(200, interviews);
  });
};

// Get a single interview
exports.show = function(req, res) {
  interview.findById(req.params.id, function (err, interview) {
    if(err) { return handleError(res, err); }
    if(!interview) { return res.send(404); }
    return res.json(interview);
  });
};

// Creates a new interview in the DB.
exports.create = function(req, res) {
  interview.create(req.body, function(err, interview) {
    if(err) { return handleError(res, err); }
    return res.json(201, interview);
  });
};

// Updates an existing interview in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  interview.findById(req.params.id, function (err, interview) {
    if (err) { return handleError(res, err); }
    if(!interview) { return res.send(404); }
    var updated = _.merge(interview, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, interview);
    });
  });
};

// Deletes a interview from the DB.
exports.destroy = function(req, res) {
  console.log(req.params);
  interview.findById(req.params.id, function (err, interview) {
    if(err) { return handleError(res, err); }
    if(!interview) { return res.send(404); }
    interview.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}