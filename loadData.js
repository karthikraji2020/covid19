let covidInfo = (function () {
    let usaInfo, indiaInfo, stateInfo,countryNames;
    // to get fetch in total county data 

    fetch("https://covid19.mathdro.id/api/countries").then((res)=>{
        return res.json();
    }).then((data)=>{
        // countryNames= data.countries.map((d)=>d.name);
        countryNames= data.countries;
        setNames(countryNames);
    })
   
    function setNames(countryNames)
    {
        let country_names=document.querySelector('.country-names');
        for(let i =0;i<countryNames.length;i++)
        {
            country_names.innerHTML+=`<option value='${countryNames[i].name}'>${countryNames[i].name}</option>`;
        }
        // let x = document.querySelector('.country-names').selectedIndex;
        // alert(document.getElementsByTagName("option")[x].value);
        
    }

   //get usa and india info
    fetch('https://covid19.mathdro.id/api/countries/usa')
    .then((response) => {
        return response.json();
    })
    .then((data) => {
        usaInfo = data;
        //set usa values and update view
        setValues('usa');
    });

    fetch('https://covid19.mathdro.id/api/countries/ind')
    .then((response) => {
        return response.json();
    })
    .then((data) => {
        indiaInfo = data;
        //set india values and update view
        setValues('india');
    });

    function setValues(country){
    let infoObj;  
    if(country === "usa"){
        infoObj = usaInfo;
      }
    
    if(country === "india"){
        infoObj = indiaInfo;
      }
      const countryId = country+'-info';
      const infoElm = document.getElementById(countryId);
      
      let info_confirmed_elm = infoElm.querySelector('.confirmed');
      
      let info_confirmed_value = infoObj.confirmed.value;
      info_confirmed_elm.querySelector('.value').innerText = info_confirmed_value;
      
      let info_recovered_elm = infoElm.querySelector('.recovered');
      let info_recovered_value = infoObj.recovered.value;
      info_recovered_elm.querySelector('.value').innerText = info_recovered_value;
      
      let info_deaths_elm = infoElm.querySelector('.deaths');
      let info_deaths_value = infoObj.deaths.value;
      info_deaths_elm.querySelector('.value').innerText = info_deaths_value;
      
      let info_active_elm = infoElm.querySelector('.active');
      info_active_elm.querySelector('.value').innerText = info_confirmed_value - (info_deaths_value + info_recovered_value);
    
    let info_updated_elm = infoElm.querySelector('.updated-date');
      info_updated_elm.querySelector('.detail').innerText = new Date(infoObj.lastUpdate).toLocaleDateString() + ", "+ new Date(infoObj.lastUpdate).toLocaleTimeString();
      

    }
    
    function fetchStateInfo(selectedState){
        fetch('https://covid19.mathdro.id/api/countries/usa/confirmed')
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            stateInfo = data;
            filterStateInfo(selectedState);
        });
    
    }

    function filterStateInfo(selectedState){
        console.log(selectedState);
        stateInfo.forEach(function (item) {
        if(selectedState === item.provinceState){
            showStateInfo(item);
        }
        });
    }
    
  function showStateInfo(stateInfo){
    let infoElm = document.getElementById('info');
        if (infoElm.classList.contains("hide")) {
            infoElm.classList.remove("hide");
            infoElm.classList.add("show");
        }
      infoElm.querySelector('.state-name').innerText = stateInfo.provinceState;
      
      let info_confirmed_elm = infoElm.querySelector('.confirmed');
      
      let info_confirmed_value = stateInfo.confirmed;
      info_confirmed_elm.querySelector('.value').innerText = info_confirmed_value;
      
      let info_recovered_elm = infoElm.querySelector('.recovered');
      let info_recovered_value = stateInfo.recovered;
      info_recovered_elm.querySelector('.value').innerText = info_recovered_value;
      
      let info_deaths_elm = infoElm.querySelector('.deaths');
      let info_deaths_value = stateInfo.deaths;
      info_deaths_elm.querySelector('.value').innerText = info_deaths_value;
      
      let info_active_elm = infoElm.querySelector('.active');
      info_active_elm.querySelector('.value').innerText = stateInfo.active
    
    let info_updated_elm = infoElm.querySelector('.updated-date');
      info_updated_elm.querySelector('.detail').innerText = new Date(stateInfo.lastUpdate).toLocaleDateString() + ", "+ new Date(stateInfo.lastUpdate).toLocaleTimeString();
    }    
    
    return {
      fetchStateInfo: fetchStateInfo
    };
})();

function showSelectedInfo(){
  let selectedState = document.getElementById("selectedState").value;
  covidInfo.fetchStateInfo(selectedState);
}
function myFunction()
{
    let uiObject;
   let x = document.querySelector('.country-names').selectedIndex;
//    alert(document.getElementsByTagName("option")[x].value);
let selectedCountry=document.getElementsByTagName("option")[x].value;
   document.querySelector('.media-body .selected-country').innerText=selectedCountry;
   fetch(`https://covid19.mathdro.id/api/countries/${selectedCountry}`).then((res)=>{
       return res.json();
   }).then((data)=>{
    uiObject=data;
    displayObj(uiObject);
   })
 }

function  displayObj(uiObject)
 {
    // let confirmedValue= document.querySelector('.selected-country .confirmed').innerText;
    // let recoveredValue= document.querySelector('.selected-country .recovered').innerText;
    // let deathsValue= document.querySelector('.selected-country .deaths').innerText;
    // let lastUpdateValue= document.querySelector('.selected-country .lastUpdate').innerText;
    document.querySelector('.selected-country .confirmed').innerText=uiObject.confirmed.value;
    document.querySelector('.selected-country .recovered').innerText=uiObject.recovered.value;
    document.querySelector('.selected-country .deaths').innerText=uiObject.deaths.value;
    document.querySelector('.selected-country .lastUpdate').innerText=new Date(uiObject.lastUpdate).toLocaleDateString() + ", "+ new Date(uiObject.lastUpdate).toLocaleTimeString();

    ///
    document.querySelector('.media-body p span.confirmed').innerText=uiObject.confirmed.value;
    document.querySelector('.media-body p span.recovered').innerText=uiObject.recovered.value;
    document.querySelector('.media-body p span.deaths').innerText=uiObject.deaths.value;
    document.querySelector('.media-body p span.lastUpdate').innerText= new Date(uiObject.lastUpdate).toLocaleDateString() + ", "+ new Date(uiObject.lastUpdate).toLocaleTimeString();
    /*
    <th>confirmed</th>
                <th>recovered</th>
                <th>deaths</th>
                <th>lastUpdate</th>*/
 }