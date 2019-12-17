var fill = d3.scale.category20();

d3.csv("frequencies.csv", function(wordData) {
wordData.forEach(function (d) {
});
console.log('data', wordData.length);
 d3.layout.cloud()
    .size([700, 700])
    .words(wordData.map(function(d) {
      return {text: d.word, size: d.size};
    }))
    .rotate(function() { return ~~(Math.random() * 2) * 90; })
    .font("Impact")
    .fontSize(function(d) { return d.size; })
    .on("end", draw)
    .start();
}
);

function draw(words) {
  console.log('words', words.length);
    d3.select("body").append("svg")
      .attr("width", 700)
      .attr("height", 700)
    .append("g")
    .attr("transform", "translate(350,350)")
    .selectAll("text")
    .data(words)
    .enter().append("text")
    .style("font-size", function(d) { return d.size + "px"; })
    .style("font-family", "Impact")
    .style("fill", function(d, i) { return fill(i); })
    .attr("text-anchor", "middle")
    .attr("transform", function(d) {
      return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
    })
    .text(function(d) { return d.text; });
}