  /* CONSTANTS AND GLOBALS */
  const width = window.innerWidth*.8,
  height = window.innerHeight*.8,
  margin = {top:30, bottom:50, left:100, right:100},
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
const EcoData = rawdata.filter(d => d.Category === "Economic Disadv"); 
const ELLData = rawdata.filter(d => d.Category === "Current_ELL"); 
const DpData = rawdata.filter(d => d.Category === "Dropout");
const SWDdata = rawdata.filter(d => d.Category === "SWD");

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
          .attr("x",innerWidth/3)
          .attr("y",margin.bottom)
          .attr("fill","black")
          .attr("text-anchor","end")
          .attr("font-size","14px")
          .style("font-weight", "bold")
          .text("Economically Disadvantaged Students")

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
          .attr("x1", 0)
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
const container2 = d3.select("#container_middle")
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
          .text("ELL Students")

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
          .attr("x",innerWidth/4+20)
          .attr("y",margin.bottom)
          .attr("fill","black")
          .attr("text-anchor","end")
          .attr("font-size","14px")
          .style("font-weight", "bold")
          .text("Percent Dropouts")

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

/***** CHART 5. PERCENT STUDENTS WITH DISABILITY IN BORO  *****/ 

/* SCALES */
let xScale4 = d3.scaleBand()
      .domain(SWDdata.map(d=> d.Borough))
      .range([0, innerWidth/2-margin.right])
      .padding(.15)          

let yScale4 = d3.scaleLinear()
      .domain([0, 30])
      .range([innerHeight/2, 0])
            
let colorScale4 = d3.scaleOrdinal()
      .domain(SWDdata.map(d=> d.Borough))
      .range(["#4daf4a","#5499C7","#fb8072","#878f99","#8dd3c7"])
     
/* ELEMENTS */
  const container4 = d3.select("#container_bottom")
                .append("svg")
                  .attr("width", width/2)
                  .attr("height", height/2 + margin.top + margin.bottom)
                .append("g")
                  .attr("transform",`translate(${margin.left},${0})`);

  container4.append("g")
        .call(d3.axisBottom(xScale4).tickSizeOuter(0))
          .attr("transform", `translate(${0},${innerHeight/2})`)            
        .append("text")
          .attr("x",innerWidth/4)
          .attr("y",margin.bottom)
          .attr("fill","black")
          .attr("text-anchor","end")
          .attr("font-size","14px")
          .style("font-weight", "bold")
          .text("Students with Disability")

  /* For the first chart: SELECT - DATA JOIN - DRAW */
  container4.selectAll("rect")
        .data(SWDdata)
        .join("rect")
        .attr("width", xScale4.bandwidth())
        .attr("height", 0)
        .attr("x", d =>xScale4(d.Borough))
        .attr("y", innerHeight/2)
        .attr("fill", d=>colorScale4(d.Borough))
        .transition()
          .duration(800)
          .attr("y", d=>yScale4(d.Percent_Stud))
          .attr("height", d=>innerHeight/2 - yScale4(d.Percent_Stud))
          .delay((d,i) => i*200)
          .attr("fill", d=>colorScale4(d.Borough))             

  container4.selectAll("text.bar-label")
        .data(SWDdata, d=>d.id)
        .join("text")
          .attr("class","bar-label") 
          .text(d => d.Percent_Stud+"%")            
          .attr("x", d => xScale4(d.Borough)+xScale4.bandwidth()/2)
          .attr("y", innerHeight/2)
          .attr("opacity",0)
          .transition()
            .duration(800)
            .delay((d,i) => i*200)
            .attr("y", d => yScale4(d.Percent_Stud)-10)
            .attr("font-size","12px")
            .style("fill","#190707")
            .style("font-weight","bold")
            .attr("text-anchor", "middle")
            .attr("opacity",1);


  /* GRID LINE FOR THE CITY AVERAGE VALUE */
  container4.selectAll("line.grid")
        .data(yScale2.ticks(5))
        .enter()
        .append("line")
          .attr("class", "grid")
          .attr("x1", 0)
          .attr("y1", yScale4(19.7))
          .attr("x2", innerWidth/2 - margin.right)
          .attr("y2", yScale4(19.7))
          .style("stroke", "red")
          .style("stroke-width", 0.5)
          .style("stroke-dasharray", "4 4");

  container4.append("text")
        .attr("x", innerWidth/2 - margin.right+1) 
        .attr("y", yScale4(19.7)) 
        .style("fill","red")
        .style("font-size","11px")
        .text("City Average: 19.7%");

        
/***** CHART 6. HEATMAP: STUDENT POPULATION BY ETHNICITY IN BORO */
   /* FILTER DATA */
  const EthData = rawdata.filter(d => d.id > 20);
  const ethnicity = [... new Set(EthData.map(d=>d.Category))];
  const boro = [... new Set(EthData.map(d=>d.Borough))]; 
console.log("ethnicity",ethnicity)
console.log("boro",boro)
   /* APPEND SVG */
  const container5 = d3.select("#container_bottom")
        .append("svg")
          .attr("width", width/2 + margin.right)
          .attr("height", height/2 + margin.bottom + margin.top)
        .append("g")
          .attr("transform", `translate(${0},${0})`);

   /* X AXIS SCALE*/    
  let xScale5 = d3.scaleBand()
          .range([margin.left, innerWidth/2])
          .domain(boro)
          .padding(0.05);
  
  container5.append("g")
      .attr("transform", `translate(${0},${height/2 + margin.top})`)
      .call(d3.axisBottom(xScale5).tickSize(0))
      .style("font-size", "10px")
      .select(".domain").remove()

   /* Y AXIS SCALE */
  let yScale5 = d3.scaleBand()
        .range([margin.top, height/2 + margin.top])
        .domain(ethnicity)
        .padding(0.1);

  container5.append("g")
      .style("font-size", "10px")
      .attr("transform", `translate(${margin.left},${0})`)
      .call(d3.axisLeft(yScale5).tickSize(0))      
      .select(".domain").remove()
    
  /* COLOR SCALE */
  let colorBX = d3.scaleSequential([0, 60], d3.interpolateGreens);
  let colorBK = d3.scaleSequential([0, 60], d3.interpolateBlues);
  let colorMT = d3.scaleSequential([0, 60], d3.interpolateReds);
  let colorQS = d3.scaleSequential([0, 60], d3.interpolateGreys);
  let colorSI = d3.scaleSequential([0, 60], d3.interpolatePuBuGn);

  /* TOOLTIPS */
  tooltip = container5.append("div.tooltip")              
            .attr("class", "tooltip")
            .style("visibility", "hidden")
            .attr("x",0)
            .attr("y",0)
            .style("top", 0)
            .style("left", 0)              
            .style("background-color", "white")
            .style("border", "solid")
            .style("border-width", "1px")
            .style("border-radius", "2px")
            .style("padding", "0.5px")

  tooltip.append("text")
        .attr("fill","black")
        .style("pointer-events","none");

  /* TOOLTIP FUNCTIONS */
  const mouseover = function(event, d) {
     tooltip
       .style("opacity", 1)
       .style("visibility","visible")

     d3.select(this)
       .style("stroke", "black")
       .style("opacity", 1)
  }
  const mousemove = function(event, d, i) {
  const [mx, my] = d3.pointer(event);
     tooltip
       .html(`"Grad Rate: " ${d.Percent_Stud}`)
       .style("visibility","visible")
       .style("left", `${mx}px`)
       .style("top", `${my}px`)
  }
  const mouseleave = function(event,d) {
     tooltip
       .style("opacity", 0)

     d3.select(this)
       .style("stroke", "none")
       .style("opacity", 0.8)
  }
            
  /* SELECT - JOIN - DATA FOR THE SQUARES */
  container5.selectAll()
      .data(EthData, d=>d.id)
      .join("rect")
       .attr("x", d => xScale5(d.Borough))
       .attr("y", d => yScale5(d.Category))
       .attr("rx", 2)
       .attr("ry", 2)
       .attr("width", xScale5.bandwidth()-10)
       .attr("height", yScale5.bandwidth())
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
        
       } )
       .style("stroke-width", 4)
       .style("stroke", "none")
       .style("opacity", 0.8)
         .on("mouseover", mouseover)
         .on("mousemove", mousemove)
         .on("mouseleave", mouseleave)
      
    /*
      .on("mouseover", function(event, d){
          tooltip
            .html(`${d.Percent_Grads}+"%"`)
            .style("visibility", "visible")
        }) 
      .on("mousemove", function(event){
          tooltip
            .style("left", (event.pageX + 30 + "px"))
            .style("top", (event.pageY + "px"))
        })         
      .on("mouseout", function(event,d){
          tooltip
          .html(``)
          .style("visibility", "hidden");
        }) 
    */
   /* HEATMAP TITLE */
  container5.append("text")
      .attr("x", innerWidth/4+10)
      .attr("y", margin.top-10)
      .attr("text-anchor", "middle")
      .style("font-size", "14px")
      .style("font-weight", "bold")
      .text("Student Populations in Borough by Ethnicity");  
   

})
