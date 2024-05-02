# Capstone Project
<table border="1">
  <tr>
    <td colspan="2">Page title</td><td colspan="2">html</td>
  </tr>
  <tr>
    <td>chart#</td><td>chart title</td><td>data file</td>	<td>variables: descriptions</td>
  </tr>
  <tr><td colspan="4"></td></tr>
  <tr>
    <td colspan="2">NYC Public High School Student Demographics</td>
    <td colspan="2">index.html</td>
  </tr>  
  <tr>  
    <td>1</td><td>Percent students by Ethnicity</td><td>ProfileEthnicity.csv</td>
    <td>Cohort_Year: The year of each cohort<br>Asian: The percentage of Asian students in the cohort<br> Black: The percentage of Black students in the cohort<br>Hispanic: The percentage of Hispanic students in the cohort<br>Multi-Racial: The percentage of multi-race students in the cohort<br>Native American: The percentage of Native American students in the cohort<br>White: The percentage of White students in the cohort</td>
  </tr>
  <tr>
    <td>2</td><td>Percent students by Borough</td><td>ProfileLocation.csv</td><td>Cohort_Year: The year of each cohort<br>Bronx: The percentage of students attending schools in the Bronx<br>Brooklyn: The percentage of students attending schools in Brooklyn<br>Manhattan: The percentage of students attending schools in Manhattan<br>Queens: The percentage of students attending schools in Queens<br>Staten Island: The percentage of students attending schools in Staten Island</td>
  </tr>
  <tr>
    <td>3</td><td>Students by Economic Needs</td><td rowspan="3">All.csv</td><td rowspan="3">Category: The student demographic categories, such as Poverty, Disability, and ELL<br>Cohort_Year: The year of each cohort<br>Subcategory: sub-categories of student demographics, such as economically disadvantaged, not economically disadvantaged, disabled, not disabled, current ELL, former ELL, not ELL<br>Total_Cohort: Number of students in each sub-category</td>
  </tr>
  <tr>
    <td>4</td><td>Students by English Learning</td>
  </tr>
  <tr>
    <td>5</td><td>Students by Special Education</td>
  </tr>
  <tr><td colspan="4"></td></tr>
  <tr>
    <td colspan="2">8 Years of NYC Public High School Graduation Rates</td><td colspan="2">gradAll.html</td>
  </tr>
  <tr>  
    <td>6</td><td>Graduation Rates from Cohort Year 2012 to 2019</td><td rowspan="2">All.csv</td>	<td rowspan="2">Category: The student demographic categories, such as Ethnicity<br>Cohort_Year: The year of each cohort<br> Percent_Grads: The graduation rates of students in each ethnicity<br>subcategory: student ethnicities</td>
  </tr>
  <tr>
    <td>7</td><td>Graduation Rates by Ethnicity per Cohort Year</td>
  </tr>
  <tr><td colspan="4"></td></tr>
  <tr>
    <td colspan="2">Demographics of Cohort 2019 (Class of 2023)</td><td colspan="2">boro.html</td>
  </tr>
  <tr>  
    <td>8</td><td>% ELL students</td><td rowspan="5">StudBoro.csv</td><td rowspan="5">Borough: The five NYC boroughs<br>Category: The student demographic categories, such as Economically Disadvantaged, ELL, Ethnicity, Disability, Dropout<br>Percent_Stud: The percentage of students in each category</td>
  </tr>
  <tr>
    <td>9</td><td>% Economically Disadvantaged Students</td>
  </tr>
  <tr>
    <td>10</td><td>% Students with Disability</td>
  </tr>
  <tr>
    <td>11</td><td>% Students by Ethnicity</td>
  </tr>
  <tr>
    <td>12</td><td>Percent Dropout in Borough</td>
  </tr>
  <tr>
    <td>13</td><td>Percent Dropout by Ethnicity</td><td>All.csv</td><td>Percent_Drop: The dropout percentage for each ethnicity</td>
  </tr>
  <tr><td colspan="4"></td></tr>
  <tr>
    <td colspan="2">Graduation Rates of Cohort 2019 by Ethnicity and Borough</td><td colspan="2">ethn.html</td>
  </tr>
  <tr>
    <td>14</td><td>Graduation Rates by Ethnicity per Borough</td><td>GradBoroEth.csv</td><td>Borough: the five NYC boroughs<br>Percent_Grad: The graduation rates of students in each ethnicity<br> subcategory: Student ethnicities</td>
  </tr>
  <tr>
    <td>15</td><td>Graduation Rates by Borough</td><td>All.csv</td><td>ategory: Student demographic categories<br>subCategory: the five NYC boroughs<br>Percent_Grads: The graduation rates of students in each borough</td>
  </tr>
  <tr><td colspan="4"></td></tr>
  <tr>
    <td colspan="2">Graduation Rates of Cohort 2019 by Demographic Characteristics</td><td colspan="2">grad2.html</td>
  </tr>
  <tr>  
    <td>16</td><td>Graduation Rate by English Learning Status</td><td>GradBoroEng.csv</td><td>Borough: The five NYC boroughs<br>ELL: The percentage of students classified as ELL as of the graduation year<br>Former ELL: The percentage of students classified as ELL in the prior two school years and are no longer ELL<br>Not ELL: The percentage of students who have never been classified as ELL or declassified more than two years prior the graduation year</td>
  </tr>
  <tr>
    <td>17</td><td>Graduation Rate by Economic Status</td><td>GradBoroPov.csv</td><td>Econ Disadv: The percentage of students from economically disadvantaged families<br>Not Econ Disadv: The percentage of students whose families are not economically disadvantaged</td>
  </tr>
  <tr>
    <td>18</td><td>Graduation Rate by Disability Status</td><td>GradBoroDisab.csv</td><td>SWD: The percentage of students with disabilities<br>Not SWD: The percentage of students without disabilities</td>
  </tr>
  <tr>
    <td>19</td><td>Percent Dropout by Demographic Category</td><td>DropoutBoroDemo.csv</td><td>Category: Ethnicity and Dropout<br> Percent_Drop:  The percentage of dropouts in each sub-category<br>subCategory: student ethnicity and demographic category</td>
  </tr>
  <tr><td colspan="4"></td></tr>
  <tr>
    <td colspan="2">District-level Demographics and Graduation Rates of Cohort 2019</td><td colspan="2">grad.html</td>
  </tr> 
  <tr> 
    <td>20</td><td>% Ethnicity in Each School District</td><td rowspan="4">GradDistrict.csv</td><td rowspan="4">Category: Student demographic categories<br> District: NYC School district numbers, 1 through 32<br> Percent_Cohort: The percentage of students in each sub-category<br> Percent_Grads: The graduation rates of students in each sub-category<br> subCategory: student ethnicity and demographic category</td>
  </tr>
  <tr>
    <td>21</td><td>Graduation Rates by Ethnicity in each District</td>
  </tr>
  <tr>
    <td>22</td><td>% Students by Demographic Category in Each District</td>
  </tr>
  <tr>
    <td>23</td><td>Graduation Rates by District</td>
  </tr>
  <tr><td colspan="4"></td></tr>
  <tr>
    <td colspan="2">Proportion of Schools with Graduation Rates Above/Below the Citywide Average</td><td colspan="2">schools.html</td>
  </tr>
  <tr>
    <td>24 -29</td><td>Citywide; Bronx; Brooklyn; Manhattan; Queens; Staten Island</td><td>SchoolsAB.csv</td><td>Borough: The five NYC boroughs<br> Status: The school-level graduation rate is whether above or below the citywide average of 83.7%<br> Total: Total number of schools for each status</td>
  </tr> 
  <tr><td colspan="4"></td></tr> 
  <tr>
    <td colspan="2">NYC Public High Schools: Average School Funding per Pupil</td><td colspan="2">fund.html</td>
  </tr>
  <tr>
    <td>30</td><td>Average of Total School Funding per Pupil</td><td rowspan="3">FundingPerSchool.csv</td><td rowspan="3">AY: Academic Year<br> Category: The three funding categories for the analysis. Funding_per_Pupil, Funding for Instructional_Media, and Funding for Pupil_Support_Services<br> Manhattan: The average funding for schools in Manhattan for each category<br> Bronx: The average funding for schools in the Bronx for each category<br> Brooklyn: The average funding for schools in Brooklyn for each category<br> Queens: The average funding for schools in Queens for each category<br> Staten Island: The average funding for schools in Staten Island for each category</td>
  </tr>
  <tr>
    <td>31</td><td>Average School Funding per Student for Instructional Media</td>
  </tr>
    <tr>
    <td>32</td><td>Average School Funding per Student for Student Support Services</td>
  </tr>
  <tr><td colspan="4"></td></tr>
  <tr>
    <td colspan="2">Graduation Rates and School Survey Results</td><td colspan="2">survey.html</td>
  </tr>
  <tr>  
    <td>33</td><td>Rigorous Instruction: % Positive</td><td rowspan="6">SchoolSurvey.csv</td><td rowspan="6">school_name: High school's name<br> Borough: The five NYC boroughs<br> Grad_Rate: The school-level graduation rates<br> Rigorous_Instr: The percentage of positive responses on Rigorous Instruction<br> Collaborative: The percentage of positive responses on Collaborative Teachers<br> Supportive: The percentage of positive responses on Supportive Environment<br> Leadership: The percentage of positive responses on Effective School Leadership<br> FamilyComm: The percentage of positive responses on Strong Family-Community Ties<br> sTrust: The percentage of positive responses on Trust (whether the relationships between administrators, educators, students, and families are based on trust and respect)</td>
  </tr>
    <tr>
    <td>34</td><td>Collaborative Teachers: % Positive</td>
  </tr>
    <tr>
    <td>35</td><td>Supportive Environment: % Positive</td>
  </tr>
    <tr>
    <td>36</td><td>Effective Leadership: % Positive</td>
  </tr>
    <tr>
    <td>37</td><td>Family-Community Ties: % Positive</td>
  </tr>
    <tr>
    <td>38</td><td>Trust and Respect: % Positive</td>
  </tr>
  </table>
  
