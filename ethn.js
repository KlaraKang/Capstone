  /* CONSTANTS AND GLOBALS */
  const width = window.innerWidth*.8,
  height = window.innerHeight*.8,
  margin = {top:30, bottom:50, left:100, right:100},
  innerWidth = width - margin.right - margin.left, 
  innerHeight = height - margin.top - margin.bottom;

let borough, ethnicity;

/***** CHART 1. COHORT YEAR 2018 GRAD RATES BY ETHNICITY *****/ 
/* LOAD DATA */
d3.csv('./Dataset/All.csv', d3.autoType)
.then(rawdata => {

/* Filter data */
const data = rawdata.filter(d => d.Category === "Ethnicity" && d.Cohort_Year === 2019); 
ethnicity = data.map(d=> d.subCategory);

/* SCALES */
let xScale = d3.scaleBand()
      .domain(data.map(d=> d.subCategory))
      .range([0, innerWidth/2-margin.right])
      .padding(.15)          

let yScale = d3.scaleLinear()
      .domain([55, 100])
      .range([innerHeight/2, 0])
            
let colorScale = d3.scaleOrdinal()
      .domain(data.map(d=> d.subCategory))
      .range(["#358d8f","#8ac082","#2471A3","#f16b69","#32c1d7","#eea057"])
     
/* ELEMENTS */
const container = d3.select("#container_top")
                .append("svg")
                  .attr("width", width/2)
                  .attr("height", height/2 + margin.top + margin.bottom)
                .append("g")
                  .attr("transform",`translate(${margin.left},${0})`);

container.append("g")
        .call(d3.axisBottom(xScale).tickSizeOuter(0))
          .attr("transform", `translate(${0},${innerHeight/2})`)            
        .append("text")
          .attr("x",innerWidth/4)
          .attr("y",margin.bottom)
          .attr("fill","black")
          .attr("text-anchor","end")
          .attr("font-size","14px")
          .style("font-weight", "bold")
          .text("4-Year Graduation Rates")

/* For the first chart: SELECT - DATA JOIN - DRAW */
container.selectAll("rect")
        .data(data)
        .join("rect")
        .attr("width", xScale.bandwidth())
        .attr("height", 0)
        .attr("x", d =>xScale(d.subCategory))
        .attr("y", innerHeight/2)
        .attr("fill", d=>colorScale(d.subCategory))
        .transition()
          .duration(800)
          .attr("y", d=>yScale(d.Percent_Grads))
          .attr("height", d=>innerHeight/2 - yScale(d.Percent_Grads))
          .delay((d,i) => i*200)
          .attr("fill", d=>colorScale(d.subCategory))             

container.selectAll("text.bar-label")
        .data(data, d=>d.id)
        .join("text")
          .attr("class","bar-label") 
          .text(d => d.Percent_Grads+"%")            
          .attr("x", d => xScale(d.subCategory)+xScale.bandwidth()/2)
          .attr("y", innerHeight/2)
          .attr("opacity",0)
          .transition()
            .duration(800)
            .delay((d,i) => i*200)
            .attr("y", d => yScale(d.Percent_Grads)-10)
            .attr("font-size","12px")
            .style("fill","#190707")
            .style("font-weight","bold")
            .attr("text-anchor", "middle")
            .attr("opacity",1);

/* GRID LINE FOR THE CITY AVERAGE VALUE */
container.selectAll("line.grid")
        .data(yScale.ticks(5))
        .enter()
        .append("line")
          .attr("class", "grid")
          .attr("x1", 0)
          .attr("y1", yScale(83.7))
          .attr("x2", innerWidth/2 - margin.right)
          .attr("y2", yScale(83.7))
          .style("stroke", "red")
          .style("stroke-width", 0.5)
          .style("stroke-dasharray", "4 4");

container.append("text")
        .attr("x", innerWidth/2 - margin.right+1) 
        .attr("y", yScale(83.7)) 
        .style("fill","red")
        .style("font-size","11px")
        .text("City Average: 83.7%"); 

/******* CHART 2. PERCENT DROPOUTS BY ETHNICITY */

/* Filter data */
const DpData = rawdata.filter(d => d.Category === "DropoutEth" && d.Cohort_Year === 2019);

/* SCALES */
let xScale2 = d3.scaleBand()
      .domain(DpData.map(d=> d.subCategory))
      .range([0, innerWidth/2-margin.right])
      .padding(.15)          

let yScale2 = d3.scaleLinear()
      .domain([0, 15])
      .range([innerHeight/2, 0])
            
let colorScale2 = d3.scaleOrdinal()
      .domain(DpData.map(d=> d.subCategory))
      .range(["#358d8f","#8ac082","#2471A3","#f16b69","#32c1d7","#eea057"])
     
/* ELEMENTS */
const container2 = d3.select("#container_top")
                .append("svg")
                  .attr("width", width/2)
                  .attr("height", height/2 + margin.top + margin.bottom)
                .append("g")
                  .attr("transform",`translate(${margin.left},${0})`);

container2.append("g")
        .call(d3.axisBottom(xScale2).tickSizeOuter(0))
          .attr("transform", `translate(${0},${innerHeight/2})`)            
        .append("text")
          .attr("x",innerWidth/4+20)
          .attr("y",margin.bottom)
          .attr("fill","black")
          .attr("text-anchor","end")
          .attr("font-size","14px")
          .style("font-weight", "bold")
          .text("Percent Dropouts")

/* For the first chart: SELECT - DATA JOIN - DRAW */
container2.selectAll("rect")
        .data(DpData)
        .join("rect")
        .attr("width", xScale2.bandwidth())
        .attr("height", 0)
        .attr("x", d =>xScale2(d.subCategory))
        .attr("y", innerHeight/2)
        .attr("fill", d=>colorScale2(d.subCategory))
        .transition()
          .duration(800)
          .attr("y", d=>yScale2(d.Percent_Drop))
          .attr("height", d=>innerHeight/2 - yScale2(d.Percent_Drop))
          .delay((d,i) => i*200)
          .attr("fill", d=>colorScale2(d.subCategory))             

container2.selectAll("text.bar-label")
        .data(DpData, d=>d.id)
        .join("text")
          .attr("class","bar-label") 
          .text(d => d.Percent_Drop + "%")            
          .attr("x", d => xScale2(d.subCategory)+xScale2.bandwidth()/2)
          .attr("y", innerHeight/2)
          .attr("opacity",0)
          .transition()
            .duration(800)
            .delay((d,i) => i*200)
            .attr("y", d => yScale2(d.Percent_Drop)-10)
            .attr("font-size","12px")
            .style("fill","#190707")
            .style("font-weight","bold")
            .attr("text-anchor", "middle")
            .attr("opacity",1);


/* GRID LINE FOR THE CITY AVERAGE VALUE */
container2.selectAll("line.grid")
        .data(yScale2.ticks(5))
        .enter()
        .append("line")
          .attr("class", "grid")
          .attr("x1", 0)
          .attr("y1", yScale2(5.4))
          .attr("x2", innerWidth/2 - margin.right)
          .attr("y2", yScale2(5.4))
          .style("stroke", "red")
          .style("stroke-width", 0.5)
          .style("stroke-dasharray", "4 4");

container2.append("text")
        .attr("x", innerWidth/2 - margin.right +1) 
        .attr("y", yScale2(5.4)) 
        .style("fill","red")
        .style("font-size","11px")
        .text("City Average: 5.4%"); 

})