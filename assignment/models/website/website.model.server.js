var mongoose = require('mongoose');
var websiteSchema = require('./website.schema.server');

var websiteModel = mongoose.model("Website", websiteSchema);


websiteModel.createWebsite = createWebsite;
websiteModel.findAllWebsiteForUser = findAllWebsiteForUser;
websiteModel.findWebsiteById = findWebsiteById;
websiteModel.updateWebsite = updateWebsite;
websiteModel.deleteWebsite = deleteWebsite;

module.exports = websiteModel;

//helper function
websiteModel.populateWebsites = populateWebsites;


function populateWebsites(websites) {
  return websiteModel.insertMany(websites);
}

function createWebsite(userId, website) {
  website.userId = userId;
  return websiteModel.create(website);
}

function findAllWebsiteForUser(userId) {
  return websiteModel.find({userId: userId});
}

function findWebsiteById(id) {
  return websiteModel.findById(id);
}


function updateWebsite(websiteId, website) {
  return websiteModel.findByIdAndUpdate(websiteId, website);
}

function deleteWebsite(websiteId) {
  return websiteModel.findByIdAndRemove(websiteId);
}
