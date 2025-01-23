//express
const express = require("express");
//pg
const pg = require("pg");

// uuid
const uuid = require('uuid');

//db name
const DB_NAME = "acme_talent_db";
//port
const PORT = 3000;
//db client
const client = new pg.Client(
  process.env.DATABASE_NAME || `postgres://localhost/${DB_NAME}`
);
// export
module.exports = { express, client, uuid, PORT };