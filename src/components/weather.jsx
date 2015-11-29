import React from 'react';
import { render } from 'react-dom';
import $ from '../js/jquery';
import moment from 'moment';
const url = "https://query.yahooapis.com/v1/public/yql?q=select%20item.condition%2C%20astronomy%20from%20weather.forecast%20where%20woeid%20%3D%202306185%20and%20u%3D'c'&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys";

class Weather extends React.Component {
  state = {
    temp: 0,
    url: '',
    sunset: moment('2015-11-29 5:04 pm')
  }
  componentWillMount() {
    $.ajax(url).then((res) => {
      const {query: {results:{channel:{item, astronomy: { sunset}}}}} = res,
        {condition: {temp, code}} = item;
      this.setState({
        temp,
        url: "/images/weather/" + code + ".png",
        sunset: moment(moment().format('YYYY-MM-DD') + " " + sunset).format('X')
      });
    });
  }
  render() {
    const is_day = (moment().format('X') <= this.state.sunset) ? true: false
        , back = (is_day) ? '/images/back_weather_d.jpg' : '/images/back_weather_n.jpg'
        , color = (is_day) ? '#666' : '#fff'
        , now = moment()
        , year = moment().format('YYYY')
        , month = moment().format('MM')
        , day = moment().format('DD')
        , time = moment().format('h:mm:ss a')
        , text_color = 'rgb(0, 189, 212)';

    return (
      <div
        className="weather"
        style={{ background: `url('${back}')`}}
      >
        <div
          className="message"
          style={{ color }}
        >
          現在是
          <span className="color">{year}</span>
          年
          <span className="color">{month}</span>
          月
          <span className="color">{day}</span>
          日 本日天氣
          <span className="color">{`${this.state.temp}`}</span>
          ℃
          <img style={{
            width: 32,
            height: 32,
            position: 'relative',
            top: -4
          }} src={this.state.url} />
        </div>
      </div>
    );
  }
}

render(<Weather/>, document.getElementById('weather'));
