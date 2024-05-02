  /* CONSTANTS AND GLOBALS */
  const width = window.innerWidth*.8,
  height = window.innerHeight*.8,
  margin = {top:30, bottom:50, left:100, right:100},
  innerWidth = width - margin.right - margin.left, 
  innerHeight = height - margin.top - margin.bottom;

let borough;

/* LOAD DATA */
d3.csv('./Dataset/StudBoro.csv', d3.autoType)
.then(rawdata => {

/* Filter data */
const ELLData = rawdata.filter(d => d.Category === "Current_ELL"); 
const EcoData = rawdata.filter(d => d.Category === "Economic Disadv"); 
const SWDdata = rawdata.filter(d => d.Category === "SWD");

/***** CHART 1. CURRENT ELL STUDENTS IN BORO  *****/ 

/* SCALES */
let xScale1 = d3.scaleBand()
      .domain(ELLData.map(d=> d.Borough))
      .range([0, innerWidth/2-margin.right])
      .padding(.15)          

let yScale1 = d3.scaleLinear()
      .domain([0, 30])
      .range([innerHeight/2, 0])
            
let colorScale1 = d3.scaleOrdinal()
      .domain(ELLData.map(d=> d.Borough))
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
          .attr("x",innerWidth/4-50)
          .attr("y",margin.bottom)
          .attr("fill","black")
          .attr("text-anchor","middle")
          .attr("font-size","14px")
          .style("font-weight", "bold")
          .text("Chart 8. % ELL Students")

/* For the first chart: SELECT - DATA JOIN - DRAW */
container1.selectAll("rect")
        .data(ELLData)
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
        .data(ELLData, d=>d.id)
        .join("text")
          .attr("class","bar-label") 
          .text(d => d.Percent_Stud+"%")            
          .attr("x", d => xScale1(d.Borough)+xScale1.bandwidth()/2)
          .attr("y", innerHeight/2)
          .attr("opacity",0)
          .transition()
            .duration(800)
            .delay((d,i) => i*200)
            .attr("y", d => yScale1(d.Percent_Stud)-5)
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
          .attr("x1", 0)
          .attr("y1", yScale1(11.5))
          .attr("x2", innerWidth/2 - margin.right)
          .attr("y2", yScale1(11.5))
          .style("stroke", "red")
          .style("stroke-width", 0.5)
          .style("stroke-dasharray", "4 4");

container1.append("text")
        .attr("x", innerWidth/2 - margin.right+1) 
        .attr("y", yScale1(11.5)) 
        .style("fill","red")
        .style("font-size","11px")
        .text("City Average: 11.5%"); 

/******* CHART 2. PERCENT ECONOMICALLY DISADVANTAGED STUDENTS IN BOROUGH */

/* SCALES */
let xScale2 = d3.scaleBand()
      .domain(EcoData.map(d=> d.Borough))
      .range([0, innerWidth/2-margin.right])
      .padding(.15)          

let yScale2 = d3.scaleLinear()
      .domain([50, 100])
      .range([innerHeight/2, 0])
            
let colorScale2 = d3.scaleOrdinal()
      .domain(EcoData.map(d=> d.Borough))
      .range(["#4daf4a","#5499C7","#fb8072","#878f99","#8dd3c7"])
     
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
          .attr("x", innerWidth/4-50)
          .attr("y",margin.bottom)
          .attr("fill","black")
          .attr("text-anchor","middle")
          .attr("font-size","14px")
          .style("font-weight", "bold")
          .text("Chart 9. % Economically Disadvantaged Students")

/* For the first chart: SELECT - DATA JOIN - DRAW */
container2.selectAll("rect")
        .data(EcoData)
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
        .data(EcoData, d=>d.id)
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
          .attr("y1", yScale2(74))
          .attr("x2", innerWidth/2 - margin.right)
          .attr("y2", yScale2(74))
          .style("stroke", "red")
          .style("stroke-width", 0.5)
          .style("stroke-dasharray", "4 4");

container2.append("text")
        .attr("x", innerWidth/2 - margin.right +1) 
        .attr("y", yScale2(74)) 
        .style("fill","red")
        .style("font-size","11px")
        .text("City Average: 74%"); 

/***** CHART 3. PERCENT STUDENTS WITH DISABILITY IN BORO  *****/ 

/* SCALES */
let xScale3 = d3.scaleBand()
      .domain(SWDdata.map(d=> d.Borough))
      .range([0, innerWidth/2-margin.right])
      .padding(.15)          

let yScale3 = d3.scaleLinear()
      .domain([0, 30])
      .range([innerHeight/2, 0])
            
let colorScale3 = d3.scaleOrdinal()
      .domain(SWDdata.map(d=> d.Borough))
      .range(["#4daf4a","#5499C7","#fb8072","#878f99","#8dd3c7"])
     
/* ELEMENTS */
  const container3 = d3.select("#container_middle")
                .append("svg")
                  .attr("width", width/2)
                  .attr("height", height/2 + margin.top + margin.bottom)
                .append("g")
                  .attr("transform",`translate(${margin.left},${0})`);

  container3.append("g")
        .call(d3.axisBottom(xScale3).tickSizeOuter(0))
          .attr("transform", `translate(${0},${innerHeight/2})`)            
        .append("text")
          .attr("x",innerWidth/4-50)
          .attr("y",margin.bottom)
          .attr("fill","black")
          .attr("text-anchor","middle")
          .attr("font-size","14px")
          .style("font-weight", "bold")
          .text("Chart 10. % Students with Disability")

  /* For the first chart: SELECT - DATA JOIN - DRAW */
  container3.selectAll("rect")
        .data(SWDdata)
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
        .data(SWDdata, d=>d.id)
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
          .attr("y1", yScale3(20))
          .attr("x2", innerWidth/2 - margin.right)
          .attr("y2", yScale3(20))
          .style("stroke", "red")
          .style("stroke-width", 0.5)
          .style("stroke-dasharray", "4 4");

  container3.append("text")
        .attr("x", innerWidth/2 - margin.right+1) 
        .attr("y", yScale3(20)) 
        .style("fill","red")
        .style("font-size","11px")
        .text("City Average: 20%");
        
        
/***** CHART 4. HEATMAP: STUDENT POPULATION BY ETHNICITY IN BORO */

   /* FILTER DATA */
  const EthData = rawdata.filter(d => d.subCategory === "Ethnicity");
  const ethnicity = [... new Set(EthData.map(d=>d.Category))];
  const boro = [... new Set(EthData.map(d=>d.Borough))]; 

   /* APPEND SVG */
  const container4 = d3.select("#container_middle");

  let svg = container4.append("svg")
          .attr("width", width/2 + margin.right)
          .attr("height", height/2 + margin.bottom + margin.top)
        .append("g")
          .attr("transform", `translate(${0},${0})`);

   /* X AXIS SCALE*/    
  let xScale4 = d3.scaleBand()
          .range([margin.left, innerWidth/2])
          .domain(boro)
          .padding(0.05);
  
  svg.append("g")
      .attr("transform", `translate(${0},${height/2-margin.top})`)
      .call(d3.axisBottom(xScale4).tickSize(0))
      .style("font-size", "10px")
      .attr("text-anchor", "middle")
      .select(".domain").remove()

   /* Y AXIS SCALE */
  let yScale4 = d3.scaleBand()
        .range([margin.top, height/2-margin.top])
        .domain(ethnicity)
        .padding(0.1);

  svg.append("g")
      .style("font-size", "10px")
      .attr("transform", `translate(${margin.left},${0})`)
      .call(d3.axisLeft(yScale4).tickSize(0))      
      .select(".domain").remove()
    
  /* COLOR SCALE */
  let colorBX = d3.scaleSequential([0, 60], d3.interpolateGreens);
  let colorBK = d3.scaleSequential([0, 60], d3.interpolateBlues);
  let colorMT = d3.scaleSequential([0, 60], d3.interpolateReds);
  let colorQS = d3.scaleSequential([0, 65], d3.interpolateGreys);
  let colorSI = d3.scaleSequential([0, 60], d3.interpolatePuBuGn);

  /* TOOLTIPS */
  tooltip = container4.append("div")              
            .attr("class", "tooltip")
            .style("visibility", "hidden")

  tooltip.append("text")
        .attr("fill","black")
        .style("pointer-events","none");

  /* TOOLTIP FUNCTIONS */
  const mouseover = function(event, d) {
     tooltip
       .style("opacity", 1)
       .style("visibility","visible")

     d3.select(this)
       .style("stroke", "grey")
       .style("opacity", 1)
  }
 
  const mousemove = function(event, d, i) {
  const [mx, my] = d3.pointer(event);
     tooltip
       .html(`<div>Population: ${d.Percent_Stud}%</div>`)
       .style("visibility","visible")
       .style("left", `${mx+innerWidth/2+50}px`)
       .style("top", `${my+height-50}px`)
  }
  const mouseleave = function(event,d) {
     tooltip
       .style("opacity", 0)

     d3.select(this)
       .style("stroke", "none")
       .style("opacity", 1)
  }
            
  /* SELECT - JOIN - DATA FOR THE SQUARES */
  svg.selectAll()
      .data(EthData, d=>d.id)
      .join(
        enter => enter
       .append("rect")
        .attr("x", d => xScale4(d.Borough))
        .attr("y", d => yScale4(d.Category))
        .attr("rx", 2)
        .attr("ry", 2)
        .attr("width", xScale4.bandwidth()-10)
        .attr("height", yScale4.bandwidth())
        .style("fill", function (d) {
            let name = d.Borough;
          if (name === "Bronx"){
            return colorBX(d.Percent_Stud);
          }
          if (name === "Brooklyn"){
            return colorBK(d.Percent_Stud)
          }
          if (name === "Manhattan"){
            return colorMT(d.Percent_Stud)
          }
          if (name === "Queens"){
            return colorQS(d.Percent_Stud)
          }
          if (name === "Staten Island"){
            return colorSI(d.Percent_Stud)
          }     
        })
        .style("stroke-width", 4)
        .style("stroke", "none")
        .style("opacity", 1)
          .on("mouseover", mouseover)
          .on("mousemove", mousemove)
          .on("mouseleave", mouseleave)
      )
   /* HEATMAP TITLE */
  svg.append("text")
      .attr("x", innerWidth/4+50)
      .attr("y", height/2+10)
      .attr("text-anchor", "middle")
      .style("font-size", "14px")
      .style("font-weight", "bold")
      .text("Chart 11. % Students by Ethnicity");  
   

/******* CHART 5. PERCENT DROPOUTS BY BORO */

/* Filter data */
const DpData = rawdata.filter(d => d.Category === "Dropout");
/* SCALES */
let xScale5 = d3.scaleBand()
      .domain(DpData.map(d=> d.Borough))
      .range([0, innerWidth/2-margin.right])
      .padding(.15)          

let yScale5 = d3.scaleLinear()
      .domain([0, 15])
      .range([innerHeight/2, 0])
            
let colorScale5 = d3.scaleOrdinal()
      .domain(DpData.map(d=> d.Borough))
      .range(["#4daf4a","#5499C7","#fb8072","#878f99","#8dd3c7"])
     
/* ELEMENTS */
const container5 = d3.select("#container_bottom")
                .append("svg")
                  .attr("width", width/2)
                  .attr("height", height/2 + margin.top + margin.bottom)
                .append("g")
                  .attr("transform",`translate(${margin.left},${0})`);

container5.append("g")
        .call(d3.axisBottom(xScale5).tickSizeOuter(0))
          .attr("transform", `translate(${0},${innerHeight/2})`)            
        .append("text")
          .attr("x",innerWidth/4-50)
          .attr("y",margin.bottom)
          .attr("fill","black")
          .attr("text-anchor","middle")
          .attr("font-size","14px")
          .style("font-weight", "bold")
          .text("Chart 12. Percent Dropout in Borough")

/* For the first chart: SELECT - DATA JOIN - DRAW */
container5.selectAll("rect")
        .data(DpData)
        .join("rect")
        .attr("width", xScale5.bandwidth())
        .attr("height", 0)
        .attr("x", d =>xScale5(d.Borough))
        .attr("y", innerHeight/2)
        .attr("fill", d=>colorScale5(d.Borough))
        .transition()
          .duration(800)
          .attr("y", d=>yScale5(d.Percent_Stud))
          .attr("height", d=>innerHeight/2 - yScale5(d.Percent_Stud))
          .delay((d,i) => i*200)
          .attr("fill", d=>colorScale5(d.Borough))             

container5.selectAll("text.bar-label")
        .data(DpData, d=>d.id)
        .join("text")
          .attr("class","bar-label") 
          .text(d => d.Percent_Stud+"%")            
          .attr("x", d => xScale5(d.Borough)+xScale5.bandwidth()/2)
          .attr("y", innerHeight/2)
          .attr("opacity",0)
          .transition()
            .duration(800)
            .delay((d,i) => i*200)
            .attr("y", d => yScale5(d.Percent_Stud)-10)
            .attr("font-size","12px")
            .style("fill","#190707")
            .style("font-weight","bold")
            .attr("text-anchor", "middle")
            .attr("opacity",1);


/* GRID LINE FOR THE CITY AVERAGE VALUE */
container5.selectAll("line.grid")
        .data(yScale5.ticks(5))
        .enter()
        .append("line")
          .attr("class", "grid")
          .attr("x1", 0)
          .attr("y1", yScale5(5.4))
          .attr("x2", innerWidth/2 - margin.right)
          .attr("y2", yScale5(5.4))
          .style("stroke", "red")
          .style("stroke-width", 0.5)
          .style("stroke-dasharray", "4 4");

container5.append("text")
        .attr("x", innerWidth/2 - margin.right +1) 
        .attr("y", yScale5(5.4)) 
        .style("fill","red")
        .style("font-size","11px")
        .text("City Average: 5.4%"); 

        
})
/******* CHART 6. PERCENT DROPOUTS BY ETHNICITY */
/* LOAD DATA */
d3.csv('./Dataset/All.csv', d3.autoType)
.then(rawdata => {
/* Filter data */
const DpData = rawdata.filter(d => d.Category === "DropoutEth" && d.Cohort_Year === 2019);

/* SCALES */
let xScale6 = d3.scaleBand()
      .domain(DpData.map(d=> d.subCategory))
      .range([0, innerWidth/2-margin.right/2])
      .padding(.15)          

let yScale6 = d3.scaleLinear()
      .domain([0, 15])
      .range([innerHeight/2, 0])
            
let colorScale6 = d3.scaleOrdinal()
      .domain(DpData.map(d=> d.subCategory))
      .range(["#358d8f","#8ac082","#2471A3","#f16b69","#32c1d7","#eea057"])
     
/* ELEMENTS */
const container6 = d3.select("#container_bottom")
                .append("svg")
                  .attr("width", width/2)
                  .attr("height", height/2 + margin.top + margin.bottom)
                .append("g")
                  .attr("transform",`translate(${margin.left},${0})`);

container6.append("g")
        .call(d3.axisBottom(xScale6).tickSizeOuter(0))
          .attr("transform", `translate(${0},${innerHeight/2})`)            
        .append("text")
          .attr("x",innerWidth/4-50)
          .attr("y",margin.bottom)
          .attr("fill","black")
          .attr("text-anchor","middle")
          .attr("font-size","14px")
          .style("font-weight", "bold")
          .text("Chart 13. Percent Dropout by Ethnicity")

/* For the first chart: SELECT - DATA JOIN - DRAW */
container6.selectAll("rect")
        .data(DpData)
        .join("rect")
        .attr("width", xScale6.bandwidth())
        .attr("height", 0)
        .attr("x", d =>xScale6(d.subCategory))
        .attr("y", innerHeight/2)
        .attr("fill", d=>colorScale6(d.subCategory))
        .transition()
          .duration(800)
          .attr("y", d=>yScale6(d.Percent_Drop))
          .attr("height", d=>innerHeight/2 - yScale6(d.Percent_Drop))
          .delay((d,i) => i*200)
          .attr("fill", d=>colorScale6(d.subCategory))             

container6.selectAll("text.bar-label")
        .data(DpData, d=>d.id)
        .join("text")
          .attr("class","bar-label") 
          .text(d => d.Percent_Drop + "%")            
          .attr("x", d => xScale6(d.subCategory)+xScale6.bandwidth()/2)
          .attr("y", innerHeight/2)
          .attr("opacity",0)
          .transition()
            .duration(800)
            .delay((d,i) => i*200)
            .attr("y", d => yScale6(d.Percent_Drop)-10)
            .attr("font-size","12px")
            .style("fill","#190707")
            .style("font-weight","bold")
            .attr("text-anchor", "middle")
            .attr("opacity",1);


/* GRID LINE FOR THE CITY AVERAGE VALUE */
container6.selectAll("line.grid")
        .data(yScale6.ticks(5))
        .enter()
        .append("line")
          .attr("class", "grid")
          .attr("x1", 0)
          .attr("y1", yScale6(5.4))
          .attr("x2", innerWidth/2 - margin.right)
          .attr("y2", yScale6(5.4))
          .style("stroke", "red")
          .style("stroke-width", 0.5)
          .style("stroke-dasharray", "4 4");

container6.append("text")
        .attr("x", innerWidth/2 - margin.right +1) 
        .attr("y", yScale6(5.4)) 
        .style("fill","red")
        .style("font-size","11px")
        .text("City Average: 5.4%"); 

})