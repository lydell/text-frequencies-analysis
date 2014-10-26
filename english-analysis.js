// By Simon Lydell 2014.
// This file is in the public domain.

// Example invocation:
//
//     node english-analysis data/en <text.txt
//
// The above creates three JSON files in the data/en directory: chars.json,
// pairs.json and words.json. They contain, in order, the frequencies of each
// character, each pair of English letters and each English word in text.txt.

var DIR = process.argv[2] || "."

var fs    = require("fs")
var path  = require("path")
var stdin = require("get-stdin")
var tools = require("./")

stdin(function(text) {
  text = text.toLowerCase()

  write("chars.json", tools.countEach(text.split("")))
  write("pairs.json", tools.countPairs(text, /^[a-z]{2}$/))
  write("words.json", tools.countEach(text.match(/[a-z]+/g) || []))
})

function write(name, tuples) {
  fs.writeFileSync(path.join(DIR, name), tools.jsonStringifyRow(tuples))
}
