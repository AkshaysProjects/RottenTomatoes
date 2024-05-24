import { Model, Schema, model, models } from "mongoose";

// Define the media type enum
enum MediaType {
  MOVIE = "movie",
  TV_SHOW = "tv_show",
}

// Define the type for the media schema
export interface IMedia {
  title: string;
  rating: number;
  language: string;
  runtime?: string;
  releaseDate?: Date;
  trailerUrl?: string;
  firstAirDate?: Date;
  lastAirDate?: Date;
  status: string;
  genres: string[];
  summary: string;
  homepage: string;
  posterUrl: string;
  cast: string[];
  bannerUrl: string;
  type: MediaType;
  imdbId: string;
}

// Define the schema
const MediaSchema = new Schema({
  title: { type: String, required: true },
  rating: { type: Number, required: true },
  language: { type: String, required: true },
  runtime: String,
  releaseDate: Date,
  trailerUrl: String,
  firstAirDate: Date,
  lastAirDate: Date,
  status: String,
  genres: { type: [String], required: true },
  summary: { type: String, required: true },
  homepage: { type: String, required: true },
  posterUrl: { type: String, required: true },
  cast: { type: [String], required: true },
  bannerUrl: { type: String, required: true },
  type: { type: MediaType, required: true },
  imdbId: { type: String, required: true },
});

// Define the model
const existingModel: Model<IMedia> = models.Media;
export default existingModel || model<IMedia>("Media", MediaSchema);
