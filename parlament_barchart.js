function parlament_barchart() {
    // Data 2022
    data22_votes = [
        { party: "PCP-PEV", votes: 238962, color: "#e20719"},
        { party: "BE", votes: 244596, color: "#CF9FFF"}, 
        { party: "L", votes: 71196, color: "#a7ce62"},
        { party: "PS", votes: 2301887, color: "#e75195"},
        { party: "PAN", votes: 88127, color: "#1e6782"},
        { party: "PPD/PSD", votes: 1589823, color: "#f39640"},
        { party: "IL", votes: 273399, color: "#2ea9dc"},
        { party: "CDS/PP", votes: 89113, color: "#6082B6"},
        { party: "CH", votes: 399510, color: "#242653"},
        { party: "Others", votes: 120139, color: "#787878"}
    ];

    // Data 2019
    data19_votes = [
        { party: "PCP-PEV", votes: 332473, color: "#e20719"},
        { party: "BE", votes: 500017, color: "#CF9FFF"}, 
        { party: "L", votes: 57172, color: "#a7ce62"},
        { party: "PS", votes: 1908036, color: "#e75195"},
        { party: "PAN", votes: 174511, color: "#1e6782"},
        { party: "PPD/PSD", votes: 1457704, color: "#f39640"},
        { party: "IL", votes: 67681, color: "#2ea9dc"},
        { party: "CDS/PP", votes: 221774, color: "#6082B6"},
        { party: "CH", votes: 67826, color: "#242653"},
        { party: "Others", votes: 208284, color: "#787878"}
    ];

    // Data 2015
    data15_votes = [
        { party: "PCP-PEV", votes: 445980, color: "#e20719"},
        { party: "BE", votes: 550892, color: "#CF9FFF"}, 
        { party: "PS", votes: 1747685, color: "#e75195"},
        { party: "PAN", votes: 75140, color: "#1e6782"},
        { party: "PSD/CDS", votes: 2074986, color: "#D89255"},
        { party: "Others", votes: 304202, color: "#787878"}
    ];

    var margin = {top:50, bottom: 50, left: 80, right: 40},
    width = 600 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

    // SVG Container
    var svg = d3.select("#votes_barchart").append("svg")
        .attr("class", "svg_bar")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

    // SVG Title
    svg.append("text")
        .attr("x", 80)
        .attr("y", -15)
        .attr("text-align", "center")
        .attr("font-size", "22px")
        .attr("font-weight", "bold")
        .attr("font-family", "sans-serif")
        .text("Parlament's Parties #Votes");

    // Initialize X Axis
    var x = d3.scaleBand()
        .range([0, width - margin.right])
        .padding(0.2);
    
    var xAxis = svg.append("g")
        .attr("transform", `translate(0, ${height})`);
    
    // Y Axis - Votes
    var y = d3.scaleLinear()
        .range([height, 0]);

    var yAxis= svg.append("g")
        .attr("class", "votesYaxis");
    
    // Bars Mouse Handlers
    function mouseover() {
        d3.select(this).transition()
            .duration(400)
            .attr("width", x.bandwidth() + 5)
            .attr("y", d => y(d.votes) - 10)
            .attr("height", d => height - y(d.votes) + 10);
    }
            
    function mouseout() {
        d3.select(this).transition()
            .duration(400)
            .attr("width", x.bandwidth())
            .attr("y", d => y(d.votes))
            .attr("height", d => height - y(d.votes));
        d3.select("#votes_barchart_tooltip").classed("hidden", true);
    }

    function update(data) {
        // Update X Axis
        x.domain(data.map(d => d.party));
        xAxis.call(d3.axisBottom(x))
            .selectAll("text")
                .attr("transform", "translate(-10,0)rotate(-45)")
                .style("text-anchor", "end")
                .style("font-weight", "bold");

        // Update Y Axis
        y.domain([0, d3.max(data, function(d) {return d.votes})]);
        yAxis.transition().duration(500).call(d3.axisLeft(y));
        
        // Create rect variable
        var rect = svg.selectAll("rect")
            .data(data);

        rect.join("rect")
            .on("mouseover", mouseover)
            .on("mouseout", mouseout)
            .on("mousemove", function(d,i) {
                d3.select("#votes_barchart_tooltip")
                .style("left", d.x - 50 + "px")
                .style("top", d.y - 77 + "px")
                .select("#name")
                .text(i.party);
                d3.select("#votes_barchart_tooltip")
                .select("#value")
                .text((i.votes).toString().replace(/\B(?=(\d{3})+(?!\d))/g, "."));
    
                d3.select("#votes_barchart_tooltip").classed("hidden", false);
            })
            .transition()
            .duration(500)
                .attr("x", d => x(d.party))
                .attr("y", d => y(d.votes))
                .attr("height", d => height - y(d.votes))
                .attr("width", x.bandwidth())
                .attr("fill", function(d) { return d.color; });
            
    }
    
    // Year Data Handler
    var yearList = document.getElementById("year_list_values");
    yearList.addEventListener("change", function() {
        var year = yearList.options[yearList.selectedIndex].value;
        switch(year) {
            case "2022":
                update(data22_votes);
                break;
            case "2019":
                update(data19_votes);
                break;
            case "2015":
                update(data15_votes);
                break;
            default:
                break;
        }
    });

    update(data22_votes);
}