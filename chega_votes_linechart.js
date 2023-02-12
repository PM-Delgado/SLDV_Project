function chega_votes_linechart() {
    const chega_votes_data_map = {
        2022: 399510,
        2019: 67826,
        2015: 0
    }

    const chega_votes_data = Object.keys(chega_votes_data_map).map(key => ({year: parseInt(key), votes: chega_votes_data_map[key]}));
    const margin = {top:60, bottom: 60, left: 60, right: 60},
    width = 600 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

    // SVG Container
    const svg = d3.select("#chega_linechart").append("svg")
        .attr("class", "svg_line")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        
    const plot_g = svg.append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);
    

    // SVG Title
    plot_g.append("text")
        .attr("x", 100)
        .attr("y", -20)
        .attr("text-align", "center")
        .attr("font-size", "22px")
        .attr("font-weight", "bold")
        .attr("font-family", "sans-serif")
        .text("Chega Votes by Election Year");

    function update(data) {
        // X Axis
        const x = d3.scaleOrdinal()
            .range([0, width/2 ,width])
            .domain(data.map(function(d) {
                return d.year;
            }));

        plot_g.append("g")
            .style("font-size", "14px")
            .attr("transform", `translate(0, ${height})`)
            .call(d3.axisBottom(x).ticks(data.length).tickFormat(d3.format("d")));
        // Y Axis
        const y = d3.scaleLinear()
            .domain([0, d3.max(data, d => d.votes) + 1000])
            .range([height, 0]);

        plot_g.append("g")
            .style("font-size", "14px")
            .attr("transform", `translate(${0},${0})`)
            .call(d3.axisLeft(y));
        
        plot_g.append("path")
            .datum(data)
            .attr("fill", "none")
            .attr("stroke", "#242653")
            .attr("stroke-width", 2)
            .attr("d", d3.line()
                .x(function(d) {return x(d.year)})
                .y(function(d) {return y(d.votes)}));

        const mouse_g = plot_g.append("g")
            .classed("mouse", true)
            .style("display", "none");

        mouse_g.append('rect')
            .attr('width', 2)
            .attr('x',-1)
            .attr('height', height)
            .attr('fill', 'lightgray')
            .attr('stroke-opacity', '0');

        mouse_g.append('circle')
            .attr('r', 3)
            .attr("stroke", "lightgray");

        mouse_g.append('text');

        const years = [];
        for (const obj of data.values()) {
            years.push(obj.year);
        } 
        
        svg.on("mouseover", function(mouse) {
            mouse_g.style("display", "block");
        });

        const [min_year, max_year] = d3.extent(data, d => d.year);
        svg.on("mousemove", function(mouse) {
            const [x_cord, y_cord] = d3.pointer(mouse);
            const ratio = x_cord / width;
            const current_year = min_year + Math.round(ratio * (max_year - min_year));

            if(years.includes(current_year)) {
                const votes_now = (data.find(d => d.year === current_year)).votes;
            
                mouse_g.attr('transform', `translate(${x(current_year)},${0})`);
                
                mouse_g.select('text')
                .text(`Votes: ` + (votes_now).toString().replace(/\B(?=(\d{3})+(?!\d))/g, "."))
                .attr('text-anchor', current_year < (min_year + max_year) / 2 ? "start" : "end")
                .attr('font-family', 'sans-serif')
                .attr('font-size', '14px')
                .attr('font-weight', 'bold');
    
                mouse_g.select('circle')
                .attr('cy', y(votes_now));
            }
        });
        svg.on("mouseout", function(mouse) {
            mouse_g.style('display', 'none');
          });
        
        return svg.node();
    }

    update(chega_votes_data);
}