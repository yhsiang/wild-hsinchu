import React from 'react';
import $ from '../js/jquery';
import moment from 'moment';
const url = "https://query.yahooapis.com/v1/public/yql?q=select%20item.condition%2C%20item.description%20from%20weather.forecast%20where%20woeid%20%3D%202306185%20and%20u%3D'c'&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys";

class Weather extends React.Component {
  state = {
    temp: 0,
    url: ''
  }
  componentWillMount() {
    $.ajax(url).then((res) => {
      const {query: {results:{channel:{item}}}} = res,
        {condition: {temp}, description} = item,
        [origin,url] = description.match(/<img src=\"(.+).gif\"\/>/);
      this.setState({temp, url: url + ".gif" });
    });
  }
  render() {

    return (
      <div className="weather">
        <div className="message">
          {moment().format('現在是 YYYY 年 MM 月 DD 日 h:mm:ss a')}
          {` 本日天氣 ${this.state.temp} °C `}
          <img src={this.state.url} />
        </div>
      </div>
    );
  }
}

React.render(<Weather/>, document.getElementById('weather'));
