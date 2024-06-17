const requestOptions = {
  method: "GET",
  redirect: "follow",
};
const URLS =[
  `./assets/data/summary.json`,
  `./assets/data/confirmed.json`,
  `https://api.covid19api.com/summary`,
  `https://api.covid19api.com/live/country/india/status/confirmed`
];


function renderTable(tableRowObject,i) {
  let tableRowData= `<tr>
 <td>  ${tableRowObject[i].Country}</td>
 <td>${tableRowObject[i].TotalConfirmed}</td>
 <td> 
 <div class="clearfix">
 <span class="float-left">
 ${tableRowObject[i].NewConfirmed}
 </span>
 <span class="float-right">
     <span class="fa fa-angle-double-up text-danger"></span>
 </span>
 </div> 
 </td>
 <td >
 <div class="clearfix">
 <span class="float-left">
 ${tableRowObject[i].TotalDeaths}
 </span>
 <span class="float-right">
     <span class="fa fa-angle-double-up text-danger"></span>
 </span>
 </div> 
 </td>
 <td >
 <div class="clearfix">
 <span class="float-left">
 ${tableRowObject[i].TotalRecovered}
 </span>
 <span class="float-right">
  <span class="fa fa-angle-double-up text-success"></span>
 </span>
 </div> 
 </td>
</tr>`;
return tableRowData;
}

function filterData(countryName_copy, Text) {
  let filterText = Text.trim().toLowerCase();
  let country_names = document.querySelector(".country-names");
  let filterObjects = countryName_copy.Countries.filter(function (item) {
    let reData =
      item.Country.toLowerCase().includes(filterText) ||
      item.TotalConfirmed.toString() === filterText ||
      item.NewConfirmed.toString() === filterText ||
      item.TotalDeaths.toString() == filterText ||
      item.TotalRecovered.toString() == filterText;
    return reData;
  });
  country_names.innerHTML = "";

  for (let i = 0; i < filterObjects.length; i++) {
    country_names.innerHTML += renderTable(filterObjects,i);
  }

}


  async function getChartData() {
    const first = await fetch(`${URLS[0]}`, requestOptions).catch(error => console.log("error", error));
   const two = await fetch(`${URLS[1]}`, requestOptions).catch(error => console.log("error", error));
   const firstvalue = await first.json();
   setNames(firstvalue);
   const secondvalue = await two.json();
   setLineChartData(secondvalue);
 }



// for line chart

getChartData();

function nextSlot(num, countryName_copy) {
  // prestartingI=n-1
  // lI=n*10
  let prestartingI = num - 1;
  let lI = num * 10;
  let d1 = prestartingI + "0";
  let sI = parseInt(d1);
  let nextslot = countryName_copy.Countries.slice(sI, lI);
  country_names = document.querySelector(".country-names");
  country_names.innerHTML = "";
  for (let i = 0; i < nextslot.length; i++) {
    country_names.innerHTML += renderTable(nextslot,i);
  }

}
