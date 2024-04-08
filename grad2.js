const margin = {top: 70, right: 200, bottom: 70, left: 50},
      width =  window.innerWidth*.95, 
      height =  window.innerHeight*.9,
      innerWidth = width - margin.left - margin.right,
      innerHeight = height - margin.top - margin.bottom;


/*********** CHART1. GROUPED BAR CHART: ELL ***********/

d3.csv("./Dataset/GradBoroEng.csv", (d, i, columns) => {
        for (var i = 1, n = columns.length; i < n; ++i) d[columns[i]] = +d[columns[i]];
        return d;
   }).then(data => {
    
        let category = data.columns.slice(1);
   
   const svg = d3.select("#container_top")
               .append("svg")
                 .attr("width", width/2)
                 .attr("height", height/2)
                .append("g")
                 .attr("transform", `translate(${margin.left},${0})`);
    
   let x0 = d3.scaleBand()
              .rangeRound([margin.left, innerWidth/2-margin.right])
              .paddingInner(0.1);
    
   let x1 = d3.scaleBand()
              .padding(0.05);
    
   let yAxis = d3.scaleLinear()
                .rangeRound([height/2-margin.bottom, margin.top])//-margin.top-margin.bottom]);
    
   let colorScale = d3.scaleOrdinal()
                .range(["#FDD538","#D9B282","#909F9D"]);
    
   x0.domain(data.map(d=> d.Borough));
   x1.domain(category).rangeRound([0, x0.bandwidth()]);
   yAxis.domain([0, d3.max(data, d=> d3.max(category, key=>d[key]))]).nice();
    
   svg.append("g").selectAll("g")
        .data(data)
        .join("g")
        .attr("transform", d=> `translate(${x0(d.Borough)},${0})`)
        .selectAll("rect")
        .data(d=> category.map(function(key) { return {key: key, value: d[key]}; }))
        .join("rect")
            .attr("x", d=> x1(d.key))
            .attr("y", d=> yAxis(d.value))
            .attr("width", x1.bandwidth())
            .attr("height", d=> height/2 -margin.bottom - yAxis(d.value))
            .attr("fill", d=> colorScale(d.key));
    
   svg.append("g")
        .attr("class", "axis")
        .attr("transform", `translate(${0},${height/2 -margin.bottom})`)
        .call(d3.axisBottom(x0))
        .append("text")
        .attr("x", innerWidth/6)
        .attr("y", margin.bottom-20)
        .attr("font-size", "12px")
        .attr("fill", "#000")
        .attr("font-weight", "bold")
        .attr("text-anchor", "middle")
        .text("Chart 16. Graduation Rate by English Learning Status")

   svg.append("g")
        .attr("class", "axis")
        .attr("transform", `translate(${margin.left},${0})`)        
        .call(d3.axisLeft(yAxis).ticks(null, "s"))
        .append("text")
          .attr("x", 2)
          .attr("y", yAxis(yAxis.ticks().pop()) + 0.5)
          .attr("dy", "0.32em")
          .attr("fill", "#000")
          .attr("font-weight", "bold")
          .attr("text-anchor", "start")
          .text("Graduation Rates (%)");

  /* GRID LINE FOR THE CITY AVERAGE VALUE */
   svg.selectAll("line.grid")
      .data(yAxis.ticks(5))
      .enter()
      .append("line")
        .attr("class", "grid")
        .attr("x1", margin.left)
        .attr("y1", yAxis(83.7))
        .attr("x2", innerWidth/2-margin.right+10)
        .attr("y2", yAxis(83.7))
        .style("stroke", "red")
        .style("stroke-width", 0.5)
        .style("stroke-dasharray", "3 3");

   svg.append("text")
      .attr("x", innerWidth/2 - margin.right +10) 
      .attr("y", yAxis(83.7)) 
      .style("fill","red")
      .style("font-size","10px")
      .text("City Average: 83.7%"); 

   /* REGEND */
   let legend = svg.append("g")
           .attr("font-family", "sans-serif")
           .attr("font-size", 10)
           .attr("text-anchor", "end")
           .selectAll("g")
           .data(category.slice())
           .join("g")
             .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });
   
   legend.append("rect")
          .attr("x", (innerWidth-margin.right)/2+10)
          .attr("width", 15)
          .attr("height", 15)
          .attr("fill", colorScale);
   
   legend.append("text")
          .attr("x", (innerWidth-margin.right)/2)
          .attr("y", 10)
          .attr("dy", "0.32em")
          .text(d=>d);
})

      /*********** CHART2. GROUPED BAR CHART: ECONOMIC STATUS ***********/

d3.csv("./Dataset/GradBoroPov.csv", (d, i, columns) => {
    for (var i = 1, n = columns.length; i < n; ++i) d[columns[i]] = +d[columns[i]];
    return d;
  }).then(data => {

    let category = data.columns.slice(1);

    const svg = d3.select("#container_top")
              .append("svg")
                .attr("width", width/2)
                .attr("height", height/2)
              .append("g")
                .attr("transform", `translate(${margin.left},${0})`);

    let x0 = d3.scaleBand()
            .rangeRound([margin.left, innerWidth/2-margin.right])
            .paddingInner(0.1);

    let x1 = d3.scaleBand()
            .padding(0.05);

    let yAxis = d3.scaleLinear()
            .rangeRound([height/2-margin.bottom, margin.top]);

    let colorScale = d3.scaleOrdinal()
            .range(["#E8590B","#909F9D"]);

    x0.domain(data.map(d=> d.Borough));
    x1.domain(category).rangeRound([0, x0.bandwidth()]);
    yAxis.domain([0, d3.max(data, d=> d3.max(category, key=>d[key]))]).nice();

    svg.append("g").selectAll("g")
        .data(data)
        .join("g")
        .attr("transform", d=> `translate(${x0(d.Borough)},${0})`)
        .selectAll("rect")
        .data(d=> category.map(function(key) { return {key: key, value: d[key]}; }))
        .join("rect")
            .attr("x", d=> x1(d.key))
            .attr("y", d=> yAxis(d.value))
            .attr("width", x1.bandwidth())
            .attr("height", d=> height/2 -margin.bottom - yAxis(d.value))
            .attr("fill", d=> colorScale(d.key));

    svg.append("g")
       .attr("class", "axis")
       .attr("transform", `translate(${0},${height/2-margin.bottom})`)
       .call(d3.axisBottom(x0))
       .append("text")
        .attr("x", innerWidth/6)
        .attr("y", margin.bottom-20)
        .attr("font-size", "12px")
        .attr("fill", "#000")
        .attr("font-weight", "bold")
        .attr("text-anchor", "middle")
        .text("Chart 17. Graduation Rate by Economic Status");

    svg.append("g")
      .attr("class", "axis")
      .attr("transform", `translate(${margin.left},${0})`)
      .call(d3.axisLeft(yAxis).ticks(null, "s"))
      .append("text")
        .attr("x", 2)
        .attr("y", yAxis(yAxis.ticks().pop()))
        .attr("dy", "0.32em")
        .attr("fill", "#000")
        .attr("font-weight", "bold")
        .attr("text-anchor", "start")
        .text("Graduation Rates (%)")
      
  /* GRID LINE FOR THE CITY AVERAGE VALUE */
    svg.selectAll("line.grid")
        .data(yAxis.ticks(5))
        .enter()
        .append("line")
          .attr("class", "grid")
          .attr("x1", margin.left)
          .attr("y1", yAxis(83.7))
          .attr("x2", innerWidth/2-margin.right+10)
          .attr("y2", yAxis(83.7))
          .style("stroke", "red")
          .style("stroke-width", 0.5)
          .style("stroke-dasharray", "3 3");

    svg.append("text")
          .attr("x", innerWidth/2 - margin.right +10) 
          .attr("y", yAxis(83.7)) 
          .style("fill","red")
          .style("font-size","10px")
          .text("City Average: 83.7%");

  /* LEGEND */
    let legend = svg.append("g")
        .attr("font-family", "sans-serif")
        .attr("font-size", 10)
        .attr("text-anchor", "end")
        .selectAll("g")
        .data(category.slice())
        .join("g")
          .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });

    legend.append("rect")
       .attr("x", (innerWidth-margin.right)/2+10)
       .attr("width", 15)
       .attr("height", 15)
       .attr("fill", colorScale);

    legend.append("text")
       .attr("x", (innerWidth-margin.right)/2)
       .attr("y", 10)
       .attr("dy", "0.32em")
       .text(d=>d);
});


    
/*********** CHART3. GROUPED BAR CHART: DISABILITY ***********/

d3.csv("./Dataset/GradBoroDisab.csv", (d, i, columns) => {
        for (var i = 1, n = columns.length; i < n; ++i) d[columns[i]] = +d[columns[i]];
        return d;
   }).then(data => {
    
   let category = data.columns.slice(1).reverse();
    
   const svg = d3.select("#container_bottom")
                 .append("svg")
                   .attr("width", width/2)
                   .attr("height", height/2)
                 .append("g")
                   .attr("transform", `translate(${margin.left},${0})`);
    
   let x0 = d3.scaleBand()
             .rangeRound([margin.left, innerWidth/2-margin.right])
             .paddingInner(0.1);
    
   let x1 = d3.scaleBand()
              .padding(0.05);
    
   let yAxis = d3.scaleLinear()
                .rangeRound([height/2 - margin.bottom, margin.top]);
    
   let colorScale = d3.scaleOrdinal()
                .range(["#58FAF4","#909F9D"]);
    
   x0.domain(data.map(d=> d.Borough));
   x1.domain(category).rangeRound([0, x0.bandwidth()]);
   yAxis.domain([0, d3.max(data, d=> d3.max(category, key=>d[key]))]).nice();
    
   svg.append("g").selectAll("g")
        .data(data)
        .join("g")
           .attr("transform", d=> `translate(${x0(d.Borough)},${0})`)
           .selectAll("rect")
           .data(d=> category.map(function(key) { return {key: key, value: d[key]}; }))
           .join("rect")
              .attr("x", d=> x1(d.key))
              .attr("y", d=> yAxis(d.value))
              .attr("width", x1.bandwidth())
              .attr("height", d=> height/2 - margin.bottom - yAxis(d.value))
              .attr("fill", d=> colorScale(d.key));
    
   svg.append("g")
      .attr("class", "axis")
      .attr("transform", `translate(${0},${height/2 - margin.bottom})`)
      .call(d3.axisBottom(x0))
      .append("text")
        .attr("x", innerWidth/6)
        .attr("y", margin.bottom-20)
        .attr("font-size", "12px")
        .attr("fill", "#000")
        .attr("font-weight", "bold")
        .attr("text-anchor", "middle")
        .text("Chart 18. Graduation Rate by Disability Status")
    
   svg.append("g")
      .attr("class", "axis")
      .attr("transform", `translate(${margin.left},${0})`)
      .call(d3.axisLeft(yAxis).ticks(null, "s"))
      .append("text")
        .attr("x", 2)
        .attr("y", yAxis(yAxis.ticks().pop()) + 0.5)
        .attr("dy", "0.32em")
        .attr("fill", "#000")
        .attr("font-weight", "bold")
        .attr("text-anchor", "start")
        .text("Graduation Rates (%)");

  /* GRID LINE FOR THE CITY AVERAGE VALUE */
   svg.selectAll("line.grid")
      .data(yAxis.ticks(5))
      .enter()
      .append("line")
       .attr("class", "grid")
       .attr("x1", margin.left)
       .attr("y1", yAxis(83.7))
       .attr("x2", innerWidth/2-margin.right+10)
       .attr("y2", yAxis(83.7))
       .style("stroke", "red")
       .style("stroke-width", 0.5)
       .style("stroke-dasharray", "3 3");

   svg.append("text")
         .attr("x", innerWidth/2 - margin.right +10) 
         .attr("y", yAxis(83.7)) 
         .style("fill","red")
         .style("font-size","10px")
         .text("City Average: 83.7%"); 

   /* LEGEND */      
   let legend = svg.append("g")
            .attr("font-family", "sans-serif")
            .attr("font-size", 10)
            .attr("text-anchor", "end")
            .selectAll("g")
            .data(category.slice())
            .join("g")
              .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });
    
   legend.append("rect")
           .attr("x", (innerWidth-margin.right)/2+10)
           .attr("width", 15)
           .attr("height", 15)
           .attr("fill", colorScale);
    
   legend.append("text")
           .attr("x", (innerWidth-margin.right)/2)
           .attr("y", 10)
           .attr("dy", "0.32em")
           .text(d=>d);
    });
       
