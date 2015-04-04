var mongoose = require('mongoose');

var FileSchema = new mongoose.Schema({
	name: String,
	uri: String,
	date_created: Date
});

var InterviewSchema = new mongoose.Schema({
	client: String,
	location: Object,
	address: String,
	recruiter: String,
	salary: String,
	files: [FileSchema],
	date_created: Date
});

var InterviewModel = mongoose.model('Interview', InterviewSchema);

module.exports = InterviewModel;
