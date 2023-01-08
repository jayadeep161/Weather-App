var input=document.getElementById('text');
var button=document.getElementById('search')
var  place=document.getElementById('place');
var today=document.getElementById('description-of-day');
var today_icon=document.getElementById('today-icon');
var today_temp=document.getElementById('today-temp');
var today_condition=document.getElementById('today-condition');
var today_high_temp=document.getElementById('today-high-temp');
var today_wind_speed=document.getElementById('today-wind-speed');
var today_low_temp=document.getElementById('today-low-temp');
var today_humidity=document.getElementById('today-humidity');
var five_day_content=document.getElementById('fiveday-content');

const month=["January","February","March","April","May","June","July","August","September","October","November","December"];

const week=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];


window.addEventListener('load',()=>{
    document.getElementById('content').classList.add('d-none');
    
})

button.addEventListener('click',(e)=>{
    const Api_key='dcd9f8c4d4bf39a68809b5fe3a251fce';
    var URL=`https://api.openweathermap.org/data/2.5/forecast?q=${input.value}&appid=${Api_key}`;
    fetch(URL).then((res)=>{
        return res.json();
    }).then((data)=>{

        document.getElementById('content').classList.remove('d-none');
        // display city name
       place.innerHTML=data.city.name;

       //display today details day,month,year
       let date=DateExtract(data,0,true);
       let value='';

       value+=getweekday(date)+' '+getday(date)+' '+getmonth(date);
       today.innerHTML=value;

       // today weather icon
       var img=document.createElement('img');
       img.src=" http://openweathermap.org/img/wn/"+data.list[0].weather[0].icon+".png";
       today_icon.innerHTML='';
       today_icon.appendChild(img);

       // today temp
       var temperature=convert(data.list[0].main.temp);
       today_temp.innerHTML=temperature;

       // today weather condition
       today_condition.innerHTML=data.list[0].weather[0].description;

       // today high temperature
        today_high_temp.innerHTML=convert(data.list[0].main.temp_max);

      // today wind speed
      today_wind_speed.innerHTML=data.list[0].wind.speed+"MPH";

      // today low temp
      today_low_temp.innerHTML=convert(data.list[0].main.temp_min);

      // today humidity

      today_humidity.innerHTML=data.list[0].main.humidity+" g.m-3";

      // Retrieve Five days
      const dates=[];
      const five_array=[];

      data.list.forEach(element => {
            var x=DayExtract(element);
            if(dates.includes(x)==false){
                dates.push(x);
                five_array.push(element);
            }
      });
      for(var i=0;i<5;i++){
        var row=document.createElement('div');
        row.className='row';
        // day of week
         var row1=document.createElement('div');
         row1.className='row';
         var small=document.createElement('small');
         small.innerHTML=getweekday(DateExtract(five_array[i],i,false));
         small.style.fontWeight='bold';
         row1.appendChild(small);
         row.appendChild(row1);
         // day -icon
        var row2=document.createElement('div');
        row2.className='row-sm';
        var img_icon =document.createElement('img');
        img_icon.src=" http://openweathermap.org/img/wn/"+five_array[i].weather[0].icon+".png";
        img_icon.style.height='90px';
        img_icon.style.width='90px';
        row2.appendChild(img_icon);
        row.appendChild(row2);
        // temp
        var row3=document.createElement('div');
        row3.className='row-sm';
        var small1=document.createElement('small');
        small1.innerHTML=convert(five_array[i].main.temp);
        small1.style.fontWeight='bold';
        row3.appendChild(small1);
        row.appendChild(row3);
        document.getElementById("col"+(i+1)).innerHTML='';
        document.getElementById("col"+(i+1)).appendChild(row);
      }
      
      input.value='';
    }).catch((error)=>{
        console.log(error);
        document.getElementById('content').classList.add('d-none');
        alert('Data Not Found');
    })
   
})


function convert(kelvin){
    return Math.round(kelvin-273.15)+"°"+"C";;
}

function  getweekday(date){
    return week[date.getDay()];
}

function getmonth (date){
    return month[date.getMonth()];
}

function getday(date){
    return date.getDate();
}
function DateExtract(data,index,bool){
    var  arr=0;
    if(bool==true){
       arr= (data.list[index].dt_txt).split(" ");
    }
    else{
        arr=data.dt_txt.split(" ");
    }
    return (new Date(arr[0]));
}

function DayExtract(data){
    const arr=data.dt_txt.split(" ");
    let date=new Date(arr[0]);
    return getday(date);
}

