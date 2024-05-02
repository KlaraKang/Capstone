  /* CONSTANTS AND GLOBALS */
  const width = window.innerWidth*.8,
  height = window.innerHeight*.8,
  margin = {top:30, bottom:50, left:100, right:100},
  innerWidth = width - margin.right - margin.left, 
  innerHeight = height - margin.top - margin.bottom;

let borough, ethnicity;

// CHART 1. Bar Chart with Selection for Borough: Grad Rates by ethnicity in each borough for Cohort Year 2018 
  
/* APPLICATION STATE */
let state = {
  data: [], 
  hover: null,
  selection: "All" //default selection
}; 
/* LOAD DATA */
d3.csv('./Dataset/GradBoroEth.csv', d3.autoType)
  .then(rawdata => {
    state.data = rawdata;
    init();
});    
/* INITIALIZING FUNCTION */
function init() {

  /* Filter data */
  const filteredData = state.data.filter(d => d.Borough === "All")

  /* SCALES */
  xScale1 = d3.scaleBand()
    .domain(filteredData.map(d=> d.subCategory))
    .range([0, innerWidth/2])
    .padding(.3)          

  yScale1 = d3.scaleLinear()
    .domain([60, 100])
    .range([innerHeight/2, margin.top])
          
  colorScale1 = d3.scaleOrdinal()
    .domain(filteredData.map(d=> d.subCategory))
    .range(["#358d8f","#8ac082","#2471A3","#f16b69","#32c1d7","#eea057"])

/* ELEMENTS */
  const container1 = d3.select("#container_top")

  svg1 = container1.append("svg")
                    .attr("width",width/2)
                    .attr("height",height/2)
                  .append("g")
                    .attr("transform",`translate(${0},${0})`);

  xAxisGroup1 = svg1.append("g")
          .call(d3.axisBottom(xScale1).tickSizeOuter(0))
            .attr("transform", `translate(${margin.left},${innerHeight/2-margin.bottom})`)            
          .append("text")
            .attr("x",innerWidth/4)
            .attr("y",margin.bottom+20)
            .attr("fill","black")
            .attr("text-anchor","middle")
            .attr("font-size","14px")              
            .style("font-weight", "bold")
            .text("Chart 14. Graduation Rate by Ethnicity per Borough")

  // + UI ELEMENT SETUP
  /*manual drop-down menu */  
  const selectElement = d3.select("#dropdown")
  console.log(borough)
  selectElement.selectAll("option") 
                .data([...new Set(state.data.map(d => d.Borough))]) 
                .join("option")
                .attr("value", d => d) 
                .text(d=> d)
                .style("font-weight", "bold")

  /* set up event listener to filter data based on dropdown menu selection*/
  selectElement.on("change", event => {
    state.selection = event.target.value
    draw(); 
  });

  draw();  
}

/* DRAW FUNCTION */
function draw() {

  // + FILTER DATA BASED ON STATE     
  const filteredData = state.data.filter(d => d.Borough === state.selection)

  // + UPDATE DOMAINS, if needed
  xScale1.domain(filteredData.map(d=>d.subCategory))
  colorScale1.domain(filteredData.map(d=>d.subCategory))

  svg1.selectAll("rect.bar")
      .data(filteredData, d => d.id)
      .join(
      // + HANDLE ENTER SELECTION
      enter => enter
        .append("rect")
        .attr("class","bar")
        .attr("width", xScale1.bandwidth())
        .attr("height", 0)
        .attr("x", (d,i)=>xScale1(d.subCategory)+margin.left)
        .attr("y", innerHeight/2-margin.bottom)
        .attr("fill", d=>colorScale1(d.subCategory))
        .call(enter => enter
          .transition()
          .duration(800)
          .attr("y",(d,i)=>yScale1(d.Percent_Grads))
          .attr("height", (d,i)=>innerHeight/2-margin.bottom-yScale1(d.Percent_Grads))
          .delay((d,i)=>i*200)
          .attr("fill", d=>colorScale1(d.subCategory))
        )
        ,
        // + HANDLE UPDATE SELECTION
        update => update
        ,
        // + HANDLE EXIT SELECTION
        exit => exit
          .transition()
          .duration(800)
          .attr("visibility",0)
          .attr("y", innerHeight/2-margin.bottom)
          .attr("height", 0)
          .remove("bar")  
      )   

  svg1.selectAll("text.bar-label")
    .data(filteredData, d => d.id)
    .join(
      enter=>enter
        .append("text")
        .attr("class","bar-label")
        .text(d=>d.Percent_Grads+"%")
        .attr("x", (d,i)=>xScale1(d.subCategory)+xScale1.bandwidth()/2+margin.left)
        .attr("y", innerHeight/2)
        .attr("opacity",0)
        .call(enter => enter
          .transition()
          .duration(800)
          .delay((d,i)=>i*200)
          .attr("x", (d, i) => xScale1(d.subCategory)+xScale1.bandwidth()/2+margin.left)
          .attr("y", d=>yScale1(d.Percent_Grads)+25)
          .attr("text-anchor", "middle")
          .style("fill","black")
          .attr("opacity",1)
          )
        
      ,
      update=>update
      ,
      exit => exit
      .transition()
      .duration(50)
      .attr("y", 0)
      .remove("data-labels")   
      )  
}

// CHART 2. Vertical Bar Chart: Grad Rates of Cohort 2019 in Each Borough 

  /* LOAD DATA */
d3.csv('./Dataset/All.csv', d3.autoType)
  .then(data => {

   /* Filter data */
  const data2 = data.filter(d => d.Category === "Location" && d.Cohort_Year === 2019); 
  borough = data2.map(d=> d.subCategory);

    /* SCALES */
  xScale2 = d3.scaleBand()
          .domain(data2.map(d=> d.subCategory))
          .range([margin.left, innerWidth/2-margin.right])
          .padding(.15)          
   
  yScale2 = d3.scaleLinear()
          .domain([60, 100])
          .range([innerHeight/2, 0])
                
  colorScale2 = d3.scaleOrdinal()
          .domain(data2.map(d=> d.subCategory))
          .range(["#4daf4a","#5499C7","#fb8072","#878f99","#8dd3c7"])
     
  /* ELEMENTS */
  const container2 = d3.select("#container_top")
                    .append("svg")
                      .attr("width", width/2)
                      .attr("height", height/2)
                    .append("g")
                      .attr("transform",`translate(${0},${0})`);
  
  container2.append("g")
            .call(d3.axisBottom(xScale2).tickSizeOuter(0))
              .attr("transform", `translate(${margin.left},${innerHeight/2-margin.bottom})`)            
            .append("text")
              .attr("x",innerWidth/4)
              .attr("y",margin.bottom + 20)
              .attr("fill","black")
              .attr("text-anchor","middle")
              .attr("font-size","14px")
              .style("font-weight", "bold")
              .text("Chart 15. Graduation Rates by Borough")
    
  /* For the first chart: SELECT - DATA JOIN - DRAW */
  container2.selectAll("rect")
            .data(data2)
            .join("rect")
            .attr("width", xScale2.bandwidth())
            .attr("height", 0)
            .attr("x", d =>xScale2(d.subCategory)+margin.left)
            .attr("y", innerHeight/2-margin.bottom)
            .attr("fill", d=>colorScale2(d.subCategory))
            .transition()
              .duration(800)
              .attr("y", d=>yScale2(d.Percent_Grads))
              .attr("height", d=>innerHeight/2-margin.bottom - yScale2(d.Percent_Grads))
              .delay((d,i) => i*200)
              .attr("fill", d=>colorScale2(d.subCategory))             
  
  container2.selectAll("text.bar-label")
            .data(data2, d=>d.id)
            .join("text")
              .attr("class","bar-label") 
              .text(d => d.Percent_Grads+"%")            
              .attr("x", d => xScale2(d.subCategory)+xScale2.bandwidth()/2+margin.left)
              .attr("y", innerHeight/2)
              .attr("opacity",0)
              .transition()
                .duration(800)
                .delay((d,i) => i*200)
                .attr("y", d => yScale2(d.Percent_Grads)-10)
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
              .attr("x1", margin.left+100)
              .attr("y1", yScale2(83.7))
              .attr("x2", innerWidth/2)
              .attr("y2", yScale2(83.7))
              .style("stroke", "red")
              .style("stroke-width", 0.5)
              .style("stroke-dasharray", "4 4");

  container2.append("text")
            .attr("x", innerWidth/2+10) 
            .attr("y", yScale2(83.7)) 
            .style("fill","red")
            .style("font-size","11px")
            .text("Avg. 83.7%"); 

 
})

