const margin = {top: 30, right: 150, bottom: 20, left: 150},
    width =  window.innerWidth*.8, 
    height =  window.innerHeight*.8 

let legendRectSize = 10,
    legendSpacing = 5,
    legendHeight = legendRectSize + legendSpacing;

/*********** FIRST STACKED BAR CHART ***********/

d3.csv('./Dataset/ProfileEthnicity.csv')
  .then((data) =>{

  let ethnicities = data.columns.slice(1)
  ethnicities = d3.reverse(ethnicities)
  console.log(ethnicities)
   
  year = data.map(d => d.Cohort_Year)

  /* Y AXIS */
  const yAxis = d3.scaleBand()
      .domain(year)
      .range([0, height/2 - margin.top - margin.bottom])
      .padding(0.3)

  /* SVG */
  const container1 = d3.select("#container");

  let svg1 = container1.append("svg")
        .attr("width", width/2)
        .attr("height", height/2 + margin.top + margin.bottom)
      .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);
    
  svg1.append("g")
      .attr("transform", `translate(${0}, ${0})`)
      .call(d3.axisLeft(yAxis).tickSizeOuter(0))
      .append("text")
        .attr("x", width/8)
        .attr("y", height/2)
        .attr("fill","black")
        .attr("text-anchor","middle")
        .attr("font-size","14px")
        .text("Chart 1. Percent Students by Ethnicity")
        .style("font-weight", "bold");

    /* X AXIS */
  const xAxis = d3.scaleLinear()
    .domain([0, 100])
    .range([width/2-margin.right-margin.left, 0]);

  const color = d3.scaleOrdinal()
    .domain(ethnicities) 
    .range(["#358d8f","#8ac082","#2471A3","#f16b69","#32c1d7","#eea057","#2471A3"])
  
  /* TOOLTIPS */
  let tooltip1 = container1.append("div")              
              .attr("class", "tooltip")
              .style("visibility", "hidden")
  
  tooltip1.append("text")
          .attr("fill","black")
          .style("pointer-events","none");

  // TOOLTIP FUNCTIONS 
  const mouseover1 = function(event, d) {
    tooltip1
      .style("opacity", 1)
      .style("visibility","visible")

    d3.select(this)
      .style("stroke", "orange")
      .style("stroke-width", 3)
      .style("opacity", 1)
  }
  const mousemove1 = function(event, d, i) {
    const [mx, my] = d3.pointer(event);
    tooltip1
      .html(`${(d[1]-d[0]).toFixed(1)}%`)
      .style("visibility","visible")
      .style("left", `${mx+170}px`)
      .style("top", `${my+200}px`)
  }
  const mouseout1 = function(event,d) {
    tooltip1
      .style("opacity", 0)

    d3.select(this)
      .style("stroke", "none")
      .style("opacity", 1)
  }

    /* STACK THE DATA */
  const stackedData = d3.stack()
    .keys(ethnicities)(data)
  console.log(stackedData[0])

    /* ELEMENT */
  let groups = svg1.append("g")
    .selectAll("g")
    .data(stackedData)
    .join("g")
      .attr("fill", d => color(d.key))
  
  groups.selectAll("g")
      .data(d => d)
      .enter()
        .append("rect")
          .attr("y", d => yAxis(d.data.Cohort_Year))
          .attr("x", d => xAxis(d[1]))
          .attr("width", d => xAxis(d[0]) - xAxis(d[1]))
          .attr("height", yAxis.bandwidth())
          .on("mouseover", mouseover1)
          .on("mousemove", mousemove1)
          .on("mouseout", mouseout1)
    
  let legend1 = svg1.selectAll(".legend")
        .data(d3.reverse(ethnicities))
        .enter()          
        .append("g")       
        .attr("class","legend")
        .attr("transform", (d,i) => `translate(${20},${((i*legendHeight)-40)})`) 

  legend1.append("rect") 
        .attr("width", legendRectSize)
        .attr("height", legendRectSize)
        .attr("rx", 5)
        .attr("ry", 5) 
        .attr("x", width/2-margin.right-margin.left)
        .attr("y", 80)     
        .style("fill", d=>color(d))
        .style("stroke", color)

  legend1.append("text")
        .attr("x", 20 +width/2-margin.right-margin.left)
        .attr("y", 90)
        .text(d=>d)
        .style("fill", "#190707")
        .style("font-size", "12px") 
        .style("font-weight", "bold") 
})

/*********** SECOND STACKED BAR CHART ***********/

d3.csv('./Dataset/ProfileLocation.csv')
  .then((data2) =>{
  
  let boroughs = data2.columns.slice(1)
  boroughs = d3.reverse(boroughs)
  console.log(boroughs)
 
  year = data2.map(d => d.Cohort_Year)

    /* Y AXIS */
  const yAxis = d3.scaleBand()
      .domain(year)
      .range([0, height/2 - margin.top - margin.bottom])
      .padding(0.3)

  const container2 = d3.select("#container");

  let svg2 = container2.append("svg")
              .attr("width", width/2)
              .attr("height", height/2 + margin.top + margin.bottom)
            .append("g")
              .attr("transform", `translate(${margin.left},${margin.top})`);

  svg2.append("g")
      .attr("transform", `translate(${0}, ${0})`)
      .call(d3.axisLeft(yAxis).tickSizeOuter(0))
      .append("text")
        .attr("x", width/8)
        .attr("y", height/2)
        .attr("fill","black")
        .attr("text-anchor","middle")
        .attr("font-size","14px")
        .text("Chart 2. Percent Students by Borough")
        .style("font-weight", "bold");

    /* X AXIS */
  const xAxis = d3.scaleLinear()
    .domain([0, 100])
    .range([width/2-margin.right-margin.left, 0]);

  const color = d3.scaleOrdinal()
    .domain(boroughs) 
    .range(["#8dd3c7","#878f99","#fb8072","#5499C7","#4daf4a"])

  /* TOOLTIPS */
  let tooltip = container2.append("div")              
              .attr("class", "tooltip")
              .style("visibility", "hidden")
  
  tooltip.append("text")
          .attr("fill","black")
          .style("pointer-events","none");

  // TOOLTIP FUNCTIONS 
  const mouseover = function(event, d) {
    tooltip
      .style("opacity", 1)
      .style("visibility","visible")

    d3.select(this)
      .style("stroke", "orange")
      .style("stroke-width", 3)
      .style("opacity", 1)
  }
  const mousemove = function(event, d, i) {
    const [mx, my] = d3.pointer(event);
    tooltip
      .html(`${(d[1]-d[0]).toFixed(1)}%`)
      .style("visibility","visible")
      .style("left", `${mx+width/2+margin.right}px`)
      .style("top", `${my+200}px`)
  }
  const mouseout = function(event,d) {
    tooltip
      .style("opacity", 0)

    d3.select(this)
      .style("stroke", "none")
      .style("opacity", 1)
  }

    /*STACK THE DATA */
  const stackedData = d3.stack()
    .keys(boroughs)(data2)

    /* ELEMENT */
  let groups = svg2.append("g")
    .selectAll("g")
    .data(stackedData)
    .join("g")
      .attr("fill", d => color(d.key))
  
  groups.selectAll("g")
      .data(d => d)
      .enter()
      .append("rect")
        .attr("y", d => yAxis(d.data.Cohort_Year))
        .attr("x", d => xAxis(d[1]))
        .attr("width", d => xAxis(d[0]) - xAxis(d[1]))
        .attr("height", yAxis.bandwidth())
          .on("mouseover", mouseover)
          .on("mousemove", mousemove)
          .on("mouseout", mouseout)

  let legend2 = svg2.selectAll(".legend")
        .data(d3.reverse(boroughs))
        .enter()          
        .append("g")       
        .attr("class","legend")
        .attr("transform", (d,i) => `translate(${20},${((i*legendHeight)-40)})`) 

  legend2.append("rect") 
        .attr("width", legendRectSize)
        .attr("height", legendRectSize)
        .attr("rx", 5)
        .attr("ry", 5) 
        .attr("x", width/2-margin.right-margin.left)
        .attr("y", 80)     
        .style("fill", d=>color(d))
        .style("stroke", color)

  legend2.append("text")
        .attr("x", 20 +width/2-margin.right-margin.left)
        .attr("y", 90)
        .text(d=>d)
        .style("fill", "#190707")
        .style("font-size", "12px") 
        .style("font-weight", "bold") 
  
});

/********** THREE PIE CHARTS **********/

    /* APPLICATION STATE */
let state = {
    poverty: [],
    language: [],
    disability: [],
    years: [], 
    selectYear: "2019" //default selection
  }

let angleGen, arcGen, svg3, svg4, svg5;
let legend3, legend4, legend5;
let ECOdata, ELLdata, SWDdata;

let w = 300, h = 300,
    outerRadius = w/3,
    innerRadius = 70;

d3.csv('./Dataset/All.csv')
  .then(rawdata => {
    state.poverty = rawdata.filter(d => d.Category === "Poverty") 
    state.language = rawdata.filter(d => d.Category === "English") 
    state.disability = rawdata.filter(d => d.Category === "Disability") 
    state.years = rawdata.filter(d=>d.Category === "All")
   
    init();
  })

function init(){

  angleGen = d3.pie()
          .startAngle(0)
          .endAngle(2*Math.PI)
          .value((d,i) => +d.Total_Cohort)
          .sort(null)
          .padAngle(.01);
            
  arcGen = d3.arc()  
          .outerRadius(outerRadius)
          .innerRadius(innerRadius);   
          
  svg3 = d3.select("#chart")
          .append("svg")
            .attr("width", width/3)
            .attr("height", height/2)
          .append("g")
           .attr("transform",`translate(${width/6+10},${height/4+margin.top})`)
  
  svg3.append("text")
            .attr("x",width/8-margin.left)
            .attr("y",margin.top-margin.bottom-height/4)
            .attr("fill","black")
            .attr("text-anchor","middle")
            .attr("font-weight","bold")
            .attr("font-size","14px")
            .text("Chart 3. Students by Economic Needs")

  svg4 = d3.select("#chart")
           .append("svg")
             .attr("width", width/3)
             .attr("height", height/2)
           .append("g")
            .attr("transform",`translate(${width/6+10},${height/4+margin.top})`);
  
  svg4.append("text")
            .attr("x",width/8-margin.left)
            .attr("y",margin.top-margin.bottom-height/4)
            .attr("fill","black")
            .attr("text-anchor","middle")
            .attr("font-weight","bold")
            .attr("font-size","14px")
            .text("Chart 4. Students by English Learning")

  svg5 = d3.select("#chart")
            .append("svg")
              .attr("width", width/3)
              .attr("height", height/2)
            .append("g")
             .attr("transform",`translate(${width/6+10},${height/4+margin.top})`);

  svg5.append("text")
             .attr("x",width/8-margin.left)
             .attr("y",margin.top-margin.bottom-height/4)
             .attr("fill","black")
             .attr("text-anchor","middle")
             .attr("font-weight","bold")
             .attr("font-size","14px")
             .text("Chart 5. Needs of Special Education")  

  // manual drop-down menu for year selection
  const selectElement = d3.select("#dropdown")      
  selectElement.selectAll("option") 
                .data([
                ...new Set(state.years.map(d => d.Cohort_Year).sort(d3.descending))]) 
                .join("option")
                .attr("value", d => d)
                .text(d=> d) 
                .style("font-weight", "bold")

  // set up event listener to filter data based on dropdown menu selection
  selectElement.on("change", event => {
      state.selectYear = event.target.value
      draw(); 
  });

  draw();
  
} 

// DRAW FUNCTION 
function draw() {
  /* PERCENT STUDENTS BY ECONOMIC STATUS */
  const filteredPoverty = state.poverty
         .filter(d=> (d.Cohort_Year === state.selectYear))
  
  ECOdata = angleGen(filteredPoverty); 
  
  /* UPDATE DOMAIN FOR COLOR SCALE */ 
 let legendColor3 = d3.scaleOrdinal()
      .range(["#E8590B","#909F9D"])

  svg3.selectAll("path.arc")
  .data(ECOdata, d=>d.id)
  .join(
    enter=>enter
      .append("path")
      .attr("d", d=>arcGen(d))
      .attr("fill", d=>legendColor3(d.data.subCategory))
      .attr("stroke", "none")
      .attr("stroke-width", 1)
      .call(
        enter => enter
          .transition()              
          .ease(d3.easeCircle)
          .duration(1000)
          .attrTween("d", function(d,i) {
            let interpolate = d3.interpolate({startAngle: 0, endAngle: 0}, d)                
            return t => arcGen(interpolate(t));
            })
        ),
        // + HANDLE UPDATE SELECTION
        update => update
        ,
        // + HANDLE EXIT SELECTION
        exit => exit
        .transition()
        .attrTween("d", d=>d.null) 
        .remove("path")  
    ) 
  let rest3 = function() {

    svg3.selectAll("text.newText")
      .data(ECOdata, d=>d.id)
      .join(
        enter=>enter
        .append("text")
        .attr("class","newText")
        .call (
          enter=>enter
            .transition()
            .duration(200)
            .text(d=>((d.endAngle-d.startAngle)/(2*Math.PI)*100).toFixed(1)+"%")  
            .attr("transform", (d,i)=>`translate(${arcGen.centroid(d)})`)
            .attr("dy", ".4em")
            .attr("x", -40)
            .attr("text-anchor", "middle")                 
        ),
        update => update
          .style("opacity",1)
          .text(d=>((d.endAngle-d.startAngle)/(2*Math.PI)*100).toFixed(1)+"%")
          .attr("x",40)
        ,
        exit => exit
        .transition()
        .duration(50)
        .remove("newText")   
      )

    legend3 = svg3.selectAll(".legend")
      .data(ECOdata)
      .enter()          
      .append("g")
      .attr("class","legend")
      .attr("transform", (d,i) => `translate(-60,${((i*legendHeight)-40)})`) 

    legend3.append("rect") 
      .attr("width", legendRectSize)
      .attr("height", legendRectSize)
      .attr("rx", 5)
      .attr("ry", 5) 
      .attr("x", 10)
      .attr("y", 18)     
      .style("fill", d=>legendColor3(d.data.subCategory))
      .style("stroke", legendColor3)

    legend3.append("text")
      .attr("x", 22)
      .attr("y", 28)
      .text(d=> d.data.subCategory)
        .style("fill", "#190707")
        .style("font-size", "12px") 
        .style("font-weight", "bold")

  } 
  setTimeout(rest3,1000);
   
/* PERCENT STUDENTS BY ENGLISH LANGUAGE LEARNIG STATUS */
  const filteredLanguage = state.language
      .filter(d => d.Cohort_Year === state.selectYear)

  ELLdata = angleGen(filteredLanguage);

  let legendColor4 = d3.scaleOrdinal()
   .range(["#FDD538","#D9B282","#909F9D"])

  svg4.selectAll("path.arc")
    .data(ELLdata, d=>d.id)
    .join(
      enter=>enter
        .append("path")
        .attr("d", d=>arcGen(d))
        .attr("fill", d=>legendColor4(d.data.subCategory))
        .attr("stroke", "none")
        .attr("stroke-width", 1)
        .call(
        enter => enter
          .transition()              
          .ease(d3.easeCircle)
          .duration(1000)
          .attrTween("d", function(d,i) {
            let interpolate = d3.interpolate({startAngle: 0, endAngle: 0}, d)                
            return t => arcGen(interpolate(t));
            })
        ),
        // + HANDLE UPDATE SELECTION
        update => update
        ,
        // + HANDLE EXIT SELECTION
        exit => exit
        .transition()
        .attrTween("d", d=>d.null) 
        .remove("path")  
    ) 
  let rest4 = function() {

    svg4.selectAll("text.newText")
      .data(ELLdata, d=>d.id)
      .join(
        enter=>enter
        .append("text")
        .attr("class","newText")
        .call (
          enter=>enter
            .transition()
            .duration(200)
            .text(d=>((d.endAngle-d.startAngle)/(2*Math.PI)*100).toFixed(1)+"%")  
            .attr("transform", (d,i)=>`translate(${arcGen.centroid(d)})`)
            .attr("dy", ".4em")
            .attr("x", 0)
            .attr("text-anchor", "middle")                 
        ),
        update => update
          .style("opacity",1)
          .text(d=>((d.endAngle-d.startAngle)/(2*Math.PI)*100).toFixed(1)+"%")
          .attr("x",40)
          .attr("y",-10)
        ,
        exit => exit
        .transition()
        .duration(50)
        .remove("newText")   
      )

    legend4 = svg4.selectAll(".legend")
      .data(ELLdata)
      .enter()          
      .append("g")
      .attr("class","legend")
      .attr("transform", (d,i) => `translate(-60,${((i*legendHeight)-40)})`) 

    legend4.append("rect") 
      .attr("width", legendRectSize)
      .attr("height", legendRectSize)
      .attr("rx", 5)
      .attr("ry", 5) 
      .attr("x", 10)
      .attr("y", 18)     
      .style("fill", d=>legendColor4(d.data.subCategory))
      .style("stroke", legendColor4)

    legend4.append("text")
      .attr("x", 22)
      .attr("y", 28)
      .text(d=> d.data.subCategory)
      .style("fill", "#190707")
      .style("font-size", "12px") 
      .style("font-weight", "bold")  
  }
  setTimeout(rest4,1000); 

 /* PERCENT STUDENTS BY DISABILITY OR NO-DISABILITY */  

  const filteredDisability = state.disability
        .filter(d => d.Cohort_Year === state.selectYear)
  
  SWDdata = angleGen(filteredDisability); 

  let legendColor5 = d3.scaleOrdinal()
                  .range(["#58FAF4","#909F9D"]);

  svg5.selectAll("path.arc")
      .data(SWDdata, d=>d.id)
      .join(
        enter=>enter
        .append("path")
        .attr("d", d=>arcGen(d))
        .attr("fill", d=>legendColor5(d.data.subCategory))
        .attr("stroke", "none")
        .attr("stroke-width", 1)
        .call(
        enter => enter
          .transition()              
          .ease(d3.easeCircle)
          .duration(1000)
          .attrTween("d", function(d,i) {
           let interpolate = d3.interpolate({startAngle: 0, endAngle: 0}, d)                
           return t => arcGen(interpolate(t));
           })
        ),
        // + HANDLE UPDATE SELECTION
        update => update
        ,
        // + HANDLE EXIT SELECTION
        exit => exit
        .transition()
        .attrTween("d", d=>d.null) 
        .remove("path")  
      ) 
  let rest5 = function() {

  svg5.selectAll("text.newText")
      .data(SWDdata, d=>d.id)
      .join(
      enter=>enter
          .append("text")
          .attr("class","newText")
          .call (
         enter=>enter
          .transition()
          .duration(200)
          .text(d=>((d.endAngle-d.startAngle)/(2*Math.PI)*100).toFixed(1)+"%")  
          .attr("transform", (d,i)=>`translate(${arcGen.centroid(d)})`)
          .attr("dy", ".4em")
          .attr("x", 0)
          .attr("text-anchor", "middle")                 
      ),
      update => update
         .style("opacity",1)
         .text(d=>((d.endAngle-d.startAngle)/(2*Math.PI)*100).toFixed(1)+"%")
         .attr("x",40)
         .attr("y",-10)
      ,
      exit => exit
       .transition()
       .duration(50)
       .remove("newText")   
     )

  legend5 = svg5.selectAll(".legend")
     .data(SWDdata)
     .enter()          
     .append("g")
     .attr("class","legend")
     .attr("transform", (d,i) => `translate(-60,${((i*legendHeight)-40)})`) 

  legend5.append("rect") 
     .attr("width", legendRectSize)
     .attr("height", legendRectSize)
     .attr("rx", 5)
     .attr("ry", 5) 
     .attr("x", 10)
     .attr("y", 18)     
     .style("fill", d=>legendColor5(d.data.subCategory))
     .style("stroke", legendColor5)

  legend5.append("text")
     .attr("x", 22)
     .attr("y", 28)
     .text(d=> d.data.subCategory)
     .style("fill", "#190707")
     .style("font-size", "12px") 
     .style("font-weight", "bold")  
 
 } 
 setTimeout(rest5,1000); 
}

