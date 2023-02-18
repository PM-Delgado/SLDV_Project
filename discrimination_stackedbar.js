function discrimination_stackedbar() {
    // set the dimensions and margins of the graph
    const margin = {top: 40, right: 40, bottom: 40, left: 40},
    width = 600 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

    const svg = d3.select("#discrimination_stackedbarchart")
        .append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
        .append("g")
            .attr("transform", `translate(${margin.left},${margin.top})`);

    d3.csv("./csv_files/data_discri_stackedbar.csv").then( function(data) {
        console.log(data);
    })
}