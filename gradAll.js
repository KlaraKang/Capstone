 
    /* CONSTANTS AND GLOBALS */
const width = window.innerWidth*.7,
      height = window.innerHeight*.7,
      margin = {top:20, bottom:50, left:50, right:10},
      innerWidth = width - margin.right - margin.left, 
      innerHeight = height - margin.top - margin.bottom;
  
let xScale1, yScale1, xScale2, yScale2;
let xAxis1, xAxisGroup1, xAxis2, xAxisGroup2;
let colorScale1, colorScale2;
let svg2, lineGen, data2;
  
  /* APPLICATION STATE */
let state = {
    data: [], 
    hover: null,
    selection: 2019 //default selection
};

    /* LOAD DATA */
d3.csv('./Dataset/All.csv', d3.autoType)
    .then(raw_data => {
      state.data = raw_data;
    //  console.log(state.data) 
    init();
});
    
  /* INITIALIZING FUNCTION */
function init() {

// PART1. Vertical Bar Chart: Grad Rates by Cohort Year
   /* Filter data */
  const data1 = state.data.filter(d => d.Category === "All") 

    /* SCALES */
  xScale1 = d3.scaleBand()
          .domain(data1.map(d=> d.Cohort_Year))
          .range([0, innerWidth/2])
          .padding(.15)          
   
  yScale1 = d3.scaleLinear()
          .domain([55, 100])
          .range([innerHeight, 0])
                
  colorScale1 = d3.scaleOrdinal()
          .domain(data1.map(d=> d.Cohort_Year))
          .range(["#154360"])

  /*  // LINE GENERATOR FUNCTION
  lineGen = d3.line()
              .curve(d3.curveBasis)
              .x(d => xScale1(data1.Cohort_Year))
              .y(d => yScale1(data1.Percent_Grads)) 
  */      
    /* ELEMENTS */
  const container1 = d3.select("#container")
                    .append("svg")
                      .attr("width",width/2+margin.right+margin.left)
                      .attr("height",height)
                    .append("g")
                      .attr("transform",`translate(${margin.left},${0})`);
  
  container1.append("g")
            .call(d3.axisBottom(xScale1).tickSizeOuter(0))
              .attr("transform", `translate(${0},${innerHeight})`)
             // .attr("font-size","12px")
            .append("text")
              .attr("x",innerWidth/4)
              .attr("y",margin.bottom)
              .attr("fill","black")
              .attr("text-anchor","middle")
              .attr("font-size","14px")
              .attr("font-weight","bold")
              .text("Chart 6. Graduation Rates from Cohort Year 2012 to 2019")
    
    /* For the first chart: SELECT - DATA JOIN - DRAW */

  container1.selectAll("rect")
            .data(data1)
            .join("rect")
            .attr("width", xScale1.bandwidth())
            .attr("height", 0)
            .attr("x", d =>xScale1(d.Cohort_Year))
            .attr("y", innerHeight)
            .attr("fill", d=>colorScale1(d.Cohort_Year))
            .transition()
              .duration(800)
              .attr("y", d=>yScale1(d.Percent_Grads))
              .attr("height", d=>innerHeight - yScale1(d.Percent_Grads))
              .delay((d,i) => i*200)
              .attr("fill", d=>colorScale1(d.Cohort_Year))             
  
  container1.selectAll("text.bar-label")
            .data(data1, d=>d.id)
            .join("text")
              .attr("class","bar-label") 
              .text(d => d.Percent_Grads+"%")            
              .attr("x", d => xScale1(d.Cohort_Year)+xScale1.bandwidth()/2)
              .attr("y", innerHeight)
              .attr("opacity",0)
              .transition()
                .duration(800)
                .delay((d,i) => i*200)
                .attr("y", d => yScale1(d.Percent_Grads)+25)
                .attr("font-size","12px")
                .style("fill","#FFFFFF")
                .attr("text-anchor", "middle")
                .attr("opacity",1);
  /*
  container1.selectAll(".path")
            .data(data1, d=>d.id)
            .join("path")
            .attr("class","line_thick")
            .attr("d", d => lineGen(d.Percent_Grads))
            .style("stroke", "red")
            .call(enter => enter
              .transition()
                .duration(1500)
                .attrTween("stroke-dasharray", function(){
                  const l = this.getTotalLength(),
                    i = d3.interpolateString("0,"+l, l+","+l);
                    return function(t){return i(t)};
                })
                .on("end", ()=>{d3.select(this).transition();})
             );
  */
// PART 2. Bar Chart: Grad Rates by Ethnicity for all Cohorts
  /* Filter data */
  data2 = state.data.filter(d => d.Category === "Ethnicity")
  //console.log("data2",data2)

      /* SCALES */
  xScale2 = d3.scaleBand()
      .domain(data2.map(d=> d.subCategory))
      .range([0, innerWidth/2])
      .padding(.3)          

  yScale2 = d3.scaleLinear()
      .domain([55, 100])
      .range([innerHeight, 0])
            
  colorScale2 = d3.scaleOrdinal()
      .domain(data2.map(d=> d.subCategory))
      .range(["#358d8f","#8ac082","#2471A3","#f16b69","#32c1d7","#eea057","#5499C7","#2980B9","#2471A3","#1F618D","#1A5276"])
    
    /* ELEMENTS */
  const container2 = d3.select("#container")
  
  svg2 = container2.append("svg")
                  .attr("width",width/2+margin.right+margin.left)
                  .attr("height",height)
                  .attr("x",width/2+margin.right+margin.left)
                  .attr("y",innerHeight)
                  .attr("transform",`translate(${innerWidth/4-margin.left-margin.right},${0})`)
  
  xAxisGroup2 = svg2.append("g")
                .attr("transform",`translate(${0},${innerHeight})`)
                .call(d3.axisBottom(xScale2).tickSizeOuter(0))  
                .append("text")
                  .attr("x",innerWidth/4)
                  .attr("y",margin.bottom)
                  .attr("fill","black")
                  .attr("text-anchor","middle")
                  .attr("font-size","14px")
                  .attr("font-weight","bold")
                  .text("Chart 7. Graduation Rate by Ethnicity per Cohort Year")
  
    // + UI ELEMENT SETUP
    /*manual drop-down menu */  
    const selectElement = d3.select("#dropdown")

    selectElement.selectAll("option") // "option" is a HTML element
                  .data([
                  ...new Set(state.data.map(d => d.Cohort_Year).sort(d3.descending))]) 
                  .join("option")
                  .attr("value", d => d) // what's on the data
                  .text(d=> d) // what users can see
    
    /* set up event listener to filter data based on dropdown menu selection*/
    selectElement.on("change", event => {
      state.selection = +event.target.value
      draw(); 
      });

    draw();  
}

/* DRAW FUNCTION */
function draw() {
    // + FILTER DATA BASED ON STATE 
    
  const filteredData = state.data
      .filter(d => (d.Category === "Ethnicity") && (d.Cohort_Year === state.selection))
  
    // + UPDATE DOMAINS, if needed
  xScale2.domain(filteredData.map(d=>d.subCategory))
  colorScale2.domain(filteredData.map(d=>d.subCategory))

  svg2.selectAll("rect.bar")
        .data(filteredData, d => d.id)
        .join(
        // + HANDLE ENTER SELECTION
        enter => enter
          .append("rect")
          .attr("class","bar")
          .attr("width", xScale2.bandwidth())
          .attr("height", 0)
          .attr("x", (d,i)=>xScale2(d.subCategory))
          .attr("y", innerHeight)
          .attr("fill", d=>colorScale2(d.subCategory))
          .call(enter => enter
            .transition()
            .duration(800)
            .attr("y",(d,i)=>yScale2(d.Percent_Grads))
            .attr("height", (d,i)=>innerHeight-yScale2(d.Percent_Grads))
            .delay((d,i)=>i*200)
            .attr("fill", d=>colorScale2(d.subCategory))
          )
          ,
          // + HANDLE UPDATE SELECTION
          update => update
          ,
          // + HANDLE EXIT SELECTION
          exit => exit
            .transition()
            .duration(50)
            .attr("y", yScale2(0))
            .attr("height", 0)
            .remove("bar")  
        )   

    svg2.selectAll("text.bar-label")
      .data(filteredData, d => d.id)
      .join(
        enter=>enter
          .append("text")
          .attr("class","bar-label")
          .text(d=>d.Percent_Grads+"%")
          .attr("x", (d,i)=>xScale2(d.subCategory)+xScale2.bandwidth()/2)
          .attr("y", innerHeight)
          .attr("opacity",0)
          .call(enter => enter
            .transition()
            .duration(800)
            .delay((d,i)=>i*200)
            .attr("x", (d, i) => xScale2(d.subCategory)+xScale2.bandwidth()/2)
            .attr("y", d=>yScale2(d.Percent_Grads)+25)
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