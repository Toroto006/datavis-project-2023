import React from 'react';
import { useState } from 'react';
import BarComponent from '../components/BarComponent';
import { useFetch } from '../hooks/useFetch';

var ogData = [
  {year: 1980, efficiency: 24.3, sales: 8949000},
  {year: 1985, efficiency: 27.6, sales: 10979000},
  {year: 1990, efficiency: 28, sales: 9303000},
  {year: 1991, efficiency: 28.4, sales: 8185000},
  {year: 1992, efficiency: 27.9, sales: 8213000},
  {year: 1993, efficiency: 28.4, sales: 8518000},
  {year: 1994, efficiency: 28.3, sales: 8991000},
  {year: 1995, efficiency: 28.6, sales: 8620000},
  {year: 1996, efficiency: 28.5, sales: 8479000},
  {year: 1997, efficiency: 28.7, sales: 8217000},
  {year: 1998, efficiency: 28.8, sales: 8085000},
  {year: 1999, efficiency: 28.3, sales: 8638000},
  {year: 2000, efficiency: 28.5, sales: 8778000},
  {year: 2001, efficiency: 28.8, sales: 8352000},
  {year: 2002, efficiency: 29, sales: 8042000},
  {year: 2003, efficiency: 29.5, sales: 7556000},
  {year: 2004, efficiency: 29.5, sales: 7483000},
  {year: 2005, efficiency: 30.3, sales: 7660000},
  {year: 2006, efficiency: 30.1, sales: 7762000},
  {year: 2007, efficiency: 31.2, sales: 7562000},
  {year: 2008, efficiency: 31.5, sales: 6769000},
  {year: 2009, efficiency: 32.9, sales: 5402000},
  {year: 2010, efficiency: 33.9, sales: 5636000},
  {year: 2011, efficiency: 33.1, sales: 6093000},
  {year: 2012, efficiency: 35.3, sales: 7245000},
  {year: 2013, efficiency: 36.4, sales: 7586000},
  {year: 2014, efficiency: 36.5, sales: 7708000},
  {year: 2015, efficiency: 37.2, sales: 7517000},
  {year: 2016, efficiency: 37.7, sales: 6873000},
  {year: 2017, efficiency: 39.4, sales: 6081000},
]

//const weatherUrl = "https://api.weatherbit.io/v2.0/forecast/daily?city=Lausanne&days=7&key=de7baa6dfedd4ee8b140662b5298b160"
const weatherUrl = "http://localhost:8000/testData.json"

function Home() {
	const [city, setCity] = useState('Lausanne');

	const url = city && `http://localhost:8000/testData.json?query=${city}`;

	const { status, data, error } = useFetch(url);

  const weekdays = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday"
  ]

  const handleSubmit = (e) => {
		e.preventDefault();

		const query = e.target.search.value;
		if (query) {
			setCity(query);
			e.target.search.value = '';
		}
	};

  const weatherbitToTemperatures = (weatherBitData) => {
    // Converts the weatherbit data to the following format
    // array of {'y': temperature, 'x': number_of_day, 'name': day_name}
    var temperatures = []
    for (var i = 0; i < weatherBitData.data.length; i++) {
      var day = weatherBitData.data[i]
      var date = new Date(day.datetime);
      temperatures.push({
        'y': day.high_temp,
        'x': i,
        'name': weekdays[date.getDay()]
      })
    }
    return temperatures
  }

  return (
    <div class="container fill">
      <h3>Example</h3>
      <form className="Form" onSubmit={handleSubmit}>
				<input
					type="text"
					autoFocus
					autoComplete="off"
					name="search"
					placeholder="Lausanne"
				/>
				<button> Search </button>
			</form>
      <p>Click on a bar to remove one from the chart.</p>
      <div class="container fill">
        {status === 'idle' && (
					<div> Let's get started by searching for weather from a place! </div>
				)}
				{status === 'error' && <div>{error}</div>}
				{status === 'fetching' && <div className="loading">Loading.</div>}
				{status === 'fetched' && console.log(weatherbitToTemperatures(data)) && (
					<>
            <BarComponent ogData={weatherbitToTemperatures(data)}/>
					</>
				)}
      </div>
    </div>
  );
}

export default Home;