function discrimination_barchart() {
    // Data 2021
    data21_dis = [
        {factor: "Brazilian Nat.", complaints: 109, color: "#eb6b38"},
        {factor: "Romani Ethnicity", complaints: 67, color: "#eb6b38"},
        {factor: "Black Skin Color", complaints: 65, color: "#eb6b38"},
        {factor: "Immigrants", complaints: 18, color: "#eb6b38"},
        {factor: "Racism", complaints: 15, color: "#eb6b38"},
        {factor: "Chinese Nat.", complaints: 14, color: "#eb6b38"},
        {factor: "Argentinian Nat.", complaints: 4, color: "#eb6b38"},
        {factor: "Venezuelan Nat.", complaints: 3, color: "#eb6b38"},
        {factor: "Angolan Nat.", complaints: 3, color: "#eb6b38"},
        {factor: "White Skin Color", complaints: 3, color: "#eb6b38"},
        {factor: "Others", complaints: 16, color: "#eb6b38"},
        {factor: "Mult. Expressions", complaints: 16, color: "#34ccfc"},
        {factor: "Not Noticeable", complaints: 42, color: "#9e48ee"},
        {factor: "Not Applicable", complaints: 33, color: "#8a8888"}
    ];

    // Data 2020
    data20_dis = [
        {factor: "Brazilian Nat.", complaints: 87, color: "#eb6b38"},
        {factor: "Black Skin Color", complaints: 62, color: "#eb6b38"},
        {factor: "Romani Ethnicity", complaints: 53, color: "#eb6b38"},
        {factor: "Racism", complaints: 26, color: "#eb6b38"},
        {factor: "Immigrants", complaints: 23, color: "#eb6b38"},
        {factor: "African", complaints: 4, color: "#eb6b38"},
        {factor: "Chinese Nat.", complaints: 4, color: "#eb6b38"},
        {factor: "Indian Nat.", complaints: 4, color: "#eb6b38"},
        {factor: "White Skin Color", complaints: 3, color: "#eb6b38"},
        {factor: "Russian Nat.", complaints: 3, color: "#eb6b38"},
        {factor: "Cape Verdean Nat.", complaints: 2, color: "#eb6b38"},
        {factor: "Others", complaints: 16, color: "#eb6b38"},
        {factor: "Mult. Expressions", complaints: 57, color: "#34ccfc"},
        {factor: "Not Noticeable", complaints: 34, color: "#9e48ee"},
        {factor: "Not Applicable", complaints: 27, color: "#8a8888"}
    ];

    // Data 2019
    data19_dis = [
        {factor: "Romani Ethnicity", complaints: 84, color: "#eb6b38"},
        {factor: "Black Skin Color", complaints: 77, color: "#eb6b38"},
        {factor: "Brazilian Nat.", complaints: 74, color: "#eb6b38"},
        {factor: "Racism", complaints: 36, color: "#eb6b38"},
        {factor: "Immigrants", complaints: 27, color: "#eb6b38"},
        {factor: "Ucranian Nat.", complaints: 6, color: "#eb6b38"},
        {factor: "African", complaints: 4, color: "#eb6b38"},
        {factor: "Muslims", complaints: 3, color: "#eb6b38"},
        {factor: "Others", complaints: 32, color: "#eb6b38"},
        {factor: "Mult. Expressions", complaints: 26, color: "#34ccfc"},
        {factor: "Not Noticeable", complaints: 26, color: "#9e48ee"},
        {factor: "Not Applicable", complaints: 41, color: "#8a8888"}
    ];

    // Data 2018
    data18_dis = [
        {factor: "Romani Ethnicity", complaints: 74, color: "#eb6b38"},
        {factor: "Black Skin Color", complaints: 61, color: "#eb6b38"},
        {factor: "Brazilian Nat.", complaints: 45, color: "#eb6b38"},
        {factor: "Racism", complaints: 13, color: "#eb6b38"},
        {factor: "Immigrants", complaints: 9, color: "#eb6b38"},
        {factor: "Ucranian Nat.", complaints: 7, color: "#eb6b38"},
        {factor: "African", complaints: 4, color: "#eb6b38"},
        {factor: "Others", complaints: 18, color: "#eb6b38"},
        {factor: "Mult. Expressions", complaints: 30, color: "#34ccfc"},
        {factor: "Not Noticeable", complaints: 19, color: "#9e48ee"},
        {factor: "Not Applicable", complaints: 66, color: "#8a8888"}
    ];

    // Data 2017
    data17_dis = [
        {factor: "Romani Ethnicity", complaints: 58, color: "#eb6b38"},
        {factor: "Black Skin Color", complaints: 35, color: "#eb6b38"},
        {factor: "Brazilian Nat.", complaints: 18, color: "#eb6b38"},
        {factor: "Immigrants", complaints: 9, color: "#eb6b38"},
        {factor: "Muslims", complaints: 5, color: "#eb6b38"},
        {factor: "Cape Verdean Nat.", complaints: 3, color: "#eb6b38"},
        {factor: "Ucranian Nat.", complaints: 3, color: "#eb6b38"},
        {factor: "Others", complaints: 11, color: "#eb6b38"},
        {factor: "Mult. Expressions", complaints: 6, color: "#34ccfc"},
        {factor: "Not Noticeable", complaints: 21, color: "#9e48ee"},
        {factor: "Not Applicable", complaints: 10, color: "#8a8888"}
    ];

    var numComplaints = 0;

    var margin = {top:40, bottom: 80, left: 80, right: 40},
    width = 600 - margin.left - margin.right,
    height = 350 - margin.top - margin.bottom;

    // SVG Container
    var svg = d3.select("#discrimination_barchart").append("svg")
        .attr("class", "svg_bar")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

    // SVG Title
    svg.append("text")
        .attr("x", 40)
        .attr("y", -20)
        .attr("text-align", "center")
        .attr("font-size", "22px")
        .attr("font-weight", "bold")
        .attr("font-family", "sans-serif")
        .text("Complaints by Discrimination Factor");

    // Initialize X Axis
    var x = d3.scaleBand()
        .range([0, width - margin.right])
        .padding(0.2);
    
    var xAxis = svg.append("g")
        .attr("transform", `translate(0, ${height})`);
    
    // Initialize Y Axis
    var y = d3.scaleLinear()
        .range([height, 10]);

    var yAxis= svg.append("g")
        .attr("class", "votesYaxis");
    
    // Bars Mouse Handlers
    function mouseover() {
        d3.select(this).transition()
            .duration(400)
            .attr("width", x.bandwidth() + 3)
            .attr("y", d => y(d.complaints) - 3)
            .attr("height", d => height - y(d.complaints) + 3);
    }
            
    function mouseout() {
        d3.select(this).transition()
            .duration(400)
            .attr("width", x.bandwidth())
            .attr("y", d => y(d.complaints))
            .attr("height", d => height - y(d.complaints));
        d3.select("#discrimination_barchart_tooltip").classed("hidden", true);
    }

    function update(data) {
        // Update X Axis
        x.domain(data.map(d => d.factor));
        xAxis.call(d3.axisBottom(x))
            .selectAll("text")
                .attr("transform", "translate(-10,0)rotate(-45)")
                .style("text-anchor", "end")
                .style("font-weight", "bold");

        // Update Y Axis
        y.domain([0, d3.max(data, function(d) {return d.complaints})]);
        yAxis.transition().duration(500).call(d3.axisLeft(y));
        
        // Create d_rect variable
        var rect = svg.selectAll("rect")
            .data(data);

        rect.join("rect")
            .attr("class", "d_bar")
            .on("mouseover", mouseover)
            .on("mouseout", mouseout)
            .on("mousemove", function(d,i) {
                d3.select("#discrimination_barchart_tooltip")
                .style("left", (event.pageX) - 50 + "px")
                .style("top", (event.pageY) - 77 + "px")
                .select("#name")
                .text(i.factor);
                d3.select("#discrimination_barchart_tooltip")
                .select("#value")
                .text(i.complaints);
    
                d3.select("#discrimination_barchart_tooltip").classed("hidden", false);
            })
            .transition()
            .duration(500)
                .attr("x", d => x(d.factor))
                .attr("y", d => y(d.complaints))
                .attr("height", d => height - y(d.complaints))
                .attr("width", x.bandwidth())
                .attr("fill", function(d) { return d.color; });

        numComplaints = d3.sum(data, d => d.complaints);
        // Create Percentages Variable
        var percentages = svg.selectAll(".percentages").data(data, d => d.factor);

        percentages.enter()
            .append("text")
            .attr("class", "percentages")
            .merge(percentages)
            .attr("x", d => x(d.factor) + 15)
            .attr("y", d => y(d.complaints) - 5)
            .attr("text-anchor", "middle")
            .attr("text-align", "center")
            .attr("font-weight", "bold")
            .attr("font-size", "11px")
            .attr("font-family", "sans-serif")
            .transition()
                .duration(250)
                .text(d => (d.complaints / numComplaints * 100).toFixed(1) + '%');;

        // SVG #Complaints
        var complaints = svg.selectAll(".totalComplaints").data(data);
        complaints.enter()
            .append("text")
            .attr("class", "totalComplaints")
            .merge(complaints)
            .attr("x", 180)
            .attr("y", 0)
            .attr("text-align", "center")
            .attr("font-size", "15px")
            .attr("font-family", "sans-serif")
            .text("#Complaints: " + numComplaints);

        // Exit
        rect.exit().remove();
        percentages.exit().remove();
        complaints.exit().remove();
    }
    
    // Year Data Handler
    var yearList = document.getElementById("year_list_values_d");
    yearList.addEventListener("change", function() {
        var year = yearList.options[yearList.selectedIndex].value;
        switch(year) {
            case "2021":
                update(data21_dis);
                break;
            case "2020":
                update(data20_dis);
                break;
            case "2019":
                update(data19_dis);
                break;
            case "2018":
                update(data18_dis);
                break;
            case "2017":
                update(data17_dis);
                break;
            default:
                break;
        }
    });

    update(data21_dis);
}