import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
	{
		title: {
			type: String,
			required: true,
		},
		text: {
			type: String,
			required: true,
		},
		image: {		// image url
			type: String,
			required: false,
		},
		username: {
			type: String,
			required: true,
		},
		isVolunteer: {
			type: Boolean,
			required: true,
		},
		isFundraiser: {
			type: Boolean,
			required: true,
		},
	},
	{
		timestamps: true,
	}
);

export const post = mongoose.model("post", postSchema);