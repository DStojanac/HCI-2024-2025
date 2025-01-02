CREATE TABLE "recipe" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"instructions" text NOT NULL,
	"ingredients" text NOT NULL,
	"difficulty" text NOT NULL
);
