function clock(){
	time = new Date();
	hr = time.getHours();
	min = time.getMinutes();
	sec = time.getSeconds();
	meridian = "AM";
    if (hr==0) {
		meridian="AM";
        hr=12;
	}
	if (hr > 12) {
		hr-=12;
		meridian="PM";
	}
	hr = hr < 10 ? "0" + hr : hr;
	min = min < 10 ? "0" + min : min;
	sec = sec < 10 ? "0" + sec : sec;

	document.getElementById("time").innerHTML = "🕰️"+hr + ":"+ min + ":" + sec +" "+ meridian;
}
setInterval(clock, 1000);
clock();

today = new Date();
presentMonth = today.getMonth();
presentYear = today.getFullYear();
selectYear = document.getElementById("year");
selectMonth = document.getElementById("month");
cell = document.getElementsByTagName("td");

months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

monthAndYear = document.getElementById("monthAndYear");
fillCalendar(presentMonth, presentYear);


function next() {
    presentYear = (presentMonth === 11) ? presentYear + 1 : presentYear;
    presentMonth = (presentMonth + 1) % 12;
    fillCalendar(presentMonth, presentYear);
}

function previous() {
    presentYear = (presentMonth === 0) ? presentYear - 1 : presentYear;
    presentMonth = (presentMonth === 0) ? 11 : presentMonth - 1;
    fillCalendar(presentMonth, presentYear);
}

function jump() {
    presentYear = parseInt(selectYear.value);
    presentMonth = parseInt(selectMonth.value);
    fillCalendar(presentMonth, presentYear);
}

function daysInMonth(Month,Year) {
    return 32 - new Date(Year, Month, 32).getDate();
}

function fillCalendar(month, year) {

    let firstDay = (new Date(year, month)).getDay();

    // filing data about month and in the page via DOM.
    monthAndYear.innerHTML = months[month] + " " + year;
    selectYear.value = year;
    selectMonth.value = month;
    let date = 1;
    for (let i = 0; i < 6; i++) {
        //filling each row
        for (let j = 0; j < 7; j++) {
            if (i === 0 && j < firstDay) {
                cell[(i*7+j)].innerHTML="-";
            }
            else if (date > daysInMonth(month, year)) {
                cell[(i*7+j)].innerHTML="-";
            }
            else {
                cell[(i*7+j)].innerHTML=date;
                if (date === today.getDate() && year === today.getFullYear() && month === today.getMonth()) {
                    cell[(i*7+j)].style.border = "2px solid blue";
                }
                else{
                    cell[(i*7+j)].style.border = "";
                }
                date++;
            }
            console.log(date);
            console.log(cell[(i*7+j)].innerHTML);
        }
    }

}
