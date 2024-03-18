  /* CONSTANTS AND GLOBALS */
  const width = window.innerWidth*.8,
  height = window.innerHeight*.8,
  margin = {top:20, bottom:50, left:100, right:100},
  innerWidth = width - margin.right - margin.left, 
  innerHeight = height - margin.top - margin.bottom;

let borough;

/***** CHART 1. COHORT YEAR 2018 GRAD RATES BY BORO *****/ 
/* LOAD DATA */
d3.csv('./Dataset/All.csv', d3.autoType)
.then(rawdata => {

/* Filter data */
const data = rawdata.filter(d => d.Category === "Location" && d.Cohort_Year === 2018); 
borough = data.map(d=> d.subCategory);

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
      .range(["#4daf4a","#5499C7","#fb8072","#878f99","#8dd3c7"])
     
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
          .text("Graduation Rates")

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

})

/* LOAD DATA */
d3.csv('./Dataset/StudBoro.csv', d3.autoType)
.then(rawdata => {

/* Filter data */
let EcoData = rawdata.filter(d => d.Category === "Economic Disadv"); 
let ELLData = rawdata.filter(d => d.Category === "Current_ELL"); 
let DpData = rawdata.filter(d => d.Category === "Dropout");
console.log("Eco",EcoData)

/******* CHART 2. PERCENT ECONOMICALLY DISADVANTAGED STUDENTS IN BOROUGH */

/* SCALES */
let xScale1 = d3.scaleBand()
      .domain(EcoData.map(d=> d.Borough))
      .range([0, innerWidth/2-margin.right])
      .padding(.15)          

let yScale1 = d3.scaleLinear()
      .domain([50, 100])
      .range([innerHeight/2, 0])
            
let colorScale1 = d3.scaleOrdinal()
      .domain(EcoData.map(d=> d.Borough))
      .range(["#4daf4a","#5499C7","#fb8072","#878f99","#8dd3c7"])
     
/* ELEMENTS */
const container1 = d3.select("#container_top")
                .append("svg")
                  .attr("width", width/2)
                  .attr("height", height/2 + margin.top + margin.bottom)
                .append("g")
                  .attr("transform",`translate(${margin.left},${0})`);

container1.append("g")
        .call(d3.axisBottom(xScale1).tickSizeOuter(0))
          .attr("transform", `translate(${0},${innerHeight/2})`)            
        .append("text")
          .attr("x",innerWidth/2-margin.right)
          .attr("y",margin.bottom)
          .attr("fill","black")
          .attr("text-anchor","end")
          .attr("font-size","14px")
          .style("font-weight", "bold")
          .text("Economically Disadvantaged Students in Borough")

/* For the first chart: SELECT - DATA JOIN - DRAW */
container1.selectAll("rect")
        .data(EcoData)
        .join("rect")
        .attr("width", xScale1.bandwidth())
        .attr("height", 0)
        .attr("x", d =>xScale1(d.Borough))
        .attr("y", innerHeight/2)
        .attr("fill", d=>colorScale1(d.Borough))
        .transition()
          .duration(800)
          .attr("y", d=>yScale1(d.Percent_Stud))
          .attr("height", d=>innerHeight/2 - yScale1(d.Percent_Stud))
          .delay((d,i) => i*200)
          .attr("fill", d=>colorScale1(d.Borough))             

container1.selectAll("text.bar-label")
        .data(EcoData, d=>d.id)
        .join("text")
          .attr("class","bar-label") 
          .text(d => d.Percent_Stud+"%")            
          .attr("x", d => xScale1(d.Borough)+xScale1.bandwidth()/2)
          .attr("y", innerHeight/2)
          .attr("opacity",0)
          .transition()
            .duration(800)
            .delay((d,i) => i*200)
            .attr("y", d => yScale1(d.Percent_Stud)-10)
            .attr("font-size","12px")
            .style("fill","#190707")
            .style("font-weight","bold")
            .attr("text-anchor", "middle")
            .attr("opacity",1);

/* GRID LINE FOR THE CITY AVERAGE VALUE */
container1.selectAll("line.grid")
        .data(yScale1.ticks(5))
        .enter()
        .append("line")
          .attr("class", "grid")
          .attr("x1", margin.left)
          .attr("y1", yScale1(72.6))
          .attr("x2", innerWidth/2 - margin.right)
          .attr("y2", yScale1(72.6))
          .style("stroke", "red")
          .style("stroke-width", 0.5)
          .style("stroke-dasharray", "4 4");

container1.append("text")
        .attr("x", innerWidth/2 - margin.right +1) 
        .attr("y", yScale1(72.6)) 
        .style("fill","red")
        .style("font-size","11px")
        .text("City Average: 72.6%"); 


/***** CHART 3. CURRENT ELL STUDENTS IN BORO  *****/ 
/* LOAD DATA 
d3.csv('./Dataset/StudBoro.csv', d3.autoType)
.then(rawdata => {
*/

/* SCALES */
let xScale2 = d3.scaleBand()
      .domain(ELLData.map(d=> d.Borough))
      .range([0, innerWidth/2-margin.right])
      .padding(.15)          

let yScale2 = d3.scaleLinear()
      .domain([0, 30])
      .range([innerHeight/2, 0])
            
let colorScale2 = d3.scaleOrdinal()
      .domain(ELLData.map(d=> d.Borough))
      .range(["#4daf4a","#5499C7","#fb8072","#878f99","#8dd3c7"])
     
/* ELEMENTS */
const container2 = d3.select("#container_bottom")
                .append("svg")
                  .attr("width", width/2)
                  .attr("height", height/2 + margin.top + margin.bottom)
                .append("g")
                  .attr("transform",`translate(${margin.left},${0})`);

container2.append("g")
        .call(d3.axisBottom(xScale2).tickSizeOuter(0))
          .attr("transform", `translate(${0},${innerHeight/2})`)            
        .append("text")
          .attr("x",innerWidth/4)
          .attr("y",margin.bottom)
          .attr("fill","black")
          .attr("text-anchor","end")
          .attr("font-size","14px")
          .style("font-weight", "bold")
          .text("ELL Students in Borough")

/* For the first chart: SELECT - DATA JOIN - DRAW */
container2.selectAll("rect")
        .data(ELLData)
        .join("rect")
        .attr("width", xScale2.bandwidth())
        .attr("height", 0)
        .attr("x", d =>xScale2(d.Borough))
        .attr("y", innerHeight/2)
        .attr("fill", d=>colorScale2(d.Borough))
        .transition()
          .duration(800)
          .attr("y", d=>yScale2(d.Percent_Stud))
          .attr("height", d=>innerHeight/2 - yScale2(d.Percent_Stud))
          .delay((d,i) => i*200)
          .attr("fill", d=>colorScale2(d.Borough))             

container2.selectAll("text.bar-label")
        .data(ELLData, d=>d.id)
        .join("text")
          .attr("class","bar-label") 
          .text(d => d.Percent_Stud+"%")            
          .attr("x", d => xScale2(d.Borough)+xScale2.bandwidth()/2)
          .attr("y", innerHeight/2)
          .attr("opacity",0)
          .transition()
            .duration(800)
            .delay((d,i) => i*200)
            .attr("y", d => yScale2(d.Percent_Stud)-10)
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
          .attr("y1", yScale2(13.8))
          .attr("x2", innerWidth/2 - margin.right)
          .attr("y2", yScale2(13.8))
          .style("stroke", "red")
          .style("stroke-width", 0.5)
          .style("stroke-dasharray", "4 4");

container2.append("text")
        .attr("x", innerWidth/2 - margin.right+1) 
        .attr("y", yScale2(13.8)) 
        .style("fill","red")
        .style("font-size","11px")
        .text("City Average: 13.8%"); 

/******* CHART 4. PERCENT DROPOUTS BY BORO */
/* LOAD DATA
d3.csv('./Dataset/StudBoro.csv', d3.autoType)
.then(rawdata => {
 */

/* Filter data 
const DpData = rawdata.filter(d => d.Category === "Dropout"); 
console.log("dropout",DpData)*/
/* SCALES */
let xScale3 = d3.scaleBand()
      .domain(DpData.map(d=> d.Borough))
      .range([0, innerWidth/2-margin.right])
      .padding(.15)          

let yScale3 = d3.scaleLinear()
      .domain([0, 15])
      .range([innerHeight/2, 0])
            
let colorScale3 = d3.scaleOrdinal()
      .domain(DpData.map(d=> d.Borough))
      .range(["#4daf4a","#5499C7","#fb8072","#878f99","#8dd3c7"])
     
/* ELEMENTS */
const container3 = d3.select("#container_bottom")
                .append("svg")
                  .attr("width", width/2)
                  .attr("height", height/2 + margin.top + margin.bottom)
                .append("g")
                  .attr("transform",`translate(${margin.left},${0})`);

container3.append("g")
        .call(d3.axisBottom(xScale3).tickSizeOuter(0))
          .attr("transform", `translate(${0},${innerHeight/2})`)            
        .append("text")
          .attr("x",innerWidth/3)
          .attr("y",margin.bottom)
          .attr("fill","black")
          .attr("text-anchor","end")
          .attr("font-size","14px")
          .style("font-weight", "bold")
          .text("Percent Dropouts in Borough")

/* For the first chart: SELECT - DATA JOIN - DRAW */
container3.selectAll("rect")
        .data(DpData)
        .join("rect")
        .attr("width", xScale3.bandwidth())
        .attr("height", 0)
        .attr("x", d =>xScale3(d.Borough))
        .attr("y", innerHeight/2)
        .attr("fill", d=>colorScale3(d.Borough))
        .transition()
          .duration(800)
          .attr("y", d=>yScale3(d.Percent_Stud))
          .attr("height", d=>innerHeight/2 - yScale3(d.Percent_Stud))
          .delay((d,i) => i*200)
          .attr("fill", d=>colorScale3(d.Borough))             

container3.selectAll("text.bar-label")
        .data(DpData, d=>d.id)
        .join("text")
          .attr("class","bar-label") 
          .text(d => d.Percent_Stud+"%")            
          .attr("x", d => xScale3(d.Borough)+xScale3.bandwidth()/2)
          .attr("y", innerHeight/2)
          .attr("opacity",0)
          .transition()
            .duration(800)
            .delay((d,i) => i*200)
            .attr("y", d => yScale3(d.Percent_Stud)-10)
            .attr("font-size","12px")
            .style("fill","#190707")
            .style("font-weight","bold")
            .attr("text-anchor", "middle")
            .attr("opacity",1);


/* GRID LINE FOR THE CITY AVERAGE VALUE */
container3.selectAll("line.grid")
        .data(yScale3.ticks(5))
        .enter()
        .append("line")
          .attr("class", "grid")
          .attr("x1", 0)
          .attr("y1", yScale3(5.4))
          .attr("x2", innerWidth/2 - margin.right)
          .attr("y2", yScale3(5.4))
          .style("stroke", "red")
          .style("stroke-width", 0.5)
          .style("stroke-dasharray", "4 4");

container3.append("text")
        .attr("x", innerWidth/2 - margin.right +1) 
        .attr("y", yScale3(5.4)) 
        .style("fill","red")
        .style("font-size","11px")
        .text("City Average: 5.4%"); 

})
