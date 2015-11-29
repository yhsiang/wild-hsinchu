import React, { Component, PropTypes } from 'react';
import { render } from 'react-dom';
import moment from 'moment';
import createDateObjects from './createDateObjects';
import { map } from 'lodash';
import $ from '../js/jquery';
import 'moment/locale/nb';

const url = 'https://hsinchu.herokuapp.com/events';

class Calendar extends Component {

  static propTypes = {
    weekOffset: PropTypes.number.isRequired,
    date: PropTypes.object.isRequired,
    renderDay: PropTypes.func,
    onNextMonth: PropTypes.func.isRequired,
    onPrevMonth: PropTypes.func.isRequired,
    onPickDate: PropTypes.func
  }

  static defaultProps = {
    weekOffset: 0,
    renderDay: day => day.format('YYYY-MM-D'),
  }

  state = {
    is_show: false
  }
  openPopup() {
    this.setState({ is_show: true });
  }
  closePopup() {
    this.setState({ is_show: false });
  }
  renderPopup() {
    return (
      <div className="calendar-popup-pane">
        <div className="calendar-popup-wrapper">
          <div className="calendar-popup-content">
            Hi !!!!
            <span onClick={this.closePopup.bind(this)}>x</span>
          </div>
        </div>
      </div>
    );
  }
  render() {
    const { date, weekOffset, renderDay, onNextMonth, onPrevMonth, onPickDate } = this.props,
      renderToday = day => {
        return (
          <span className="active">
            {day.format('D')}
          </span>
        );
      };

    return (
      <div className='Calendar'>
        <div className='Calendar-header'>
          -- {date.format('MMM').toUpperCase()} --
          <span className="year">{date.format('YYYY') - 1911}</span>
        </div>
        <div className='Calendar-grid-header'>
          {map(['一', '二', '三', '四', '五', '六', '日'], it => {
            return (
              <div
                className="Calendar-grid-item"
                key={it}
              >
                {it}
              </div>
            );
          })}
        </div>
        <div className='Calendar-grid'>
          {createDateObjects(date, weekOffset).map((day, i) =>{
            return (
              <div
                key={`day-${i}`}
                className={`Calendar-grid-item ${day.classNames || ''}`}
                onClick={(e) => onPickDate(day.day) }
              >
                { (moment().format('M-D') === day.day.format('M-D'))? renderToday(day.day):renderDay(day.day)}
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

class Event extends Component {
  triggerUpdate(event) {
    if (window.updateDetail) {
      window.updateDetail(event);
    } else {
      window.open(window.location.href.replace('#','calendar.html'));
    }
  }
  renderItem() {
    return (
      map(this.props.events.slice(0,3), (e) => {
        return (
          <div
            className="Event-item"
            key={e.title}
            onClick={this.triggerUpdate.bind(this, e)}
          >
            {e.title}
          </div>
        );
      })
    );
  }
  render() {
    const date = moment();
    return (
      <div className="Event">
        <div className="Event-date">{`${date.format('YYYY')-1911} 年 ${date.format('MM 月 DD 日')}`}</div>
        <div className="Event-header"> 活動內容
          <div className="Event-header--boder"/>
        </div>
        <div className="Event-list">
          {this.renderItem()}
        </div>
      </div>
    );
  }
}
class MyCalendar extends Component {
  state = {
    date: moment(),
    events: []
  }
  componentWillMount() {
    $.ajax(url).then((it) =>{
      this.setState({ events: it.results });
    });
  }
  render() {
    return (
      <div style={{height: 100 + '%'}}>
        <Calendar
          onNextMonth={() => this.setState({ date: this.state.date.clone().add(1, 'months') }) }
          onPrevMonth={() => this.setState({ date: this.state.date.clone().subtract(1, 'months') }) }
          date={this.state.date}
          onPickDate= {(day) => console.log(day)}
          renderDay={(day) => day.format('D')}
        />
        <Event events={this.state.events}/>
      </div>
    );
  }
}


render(
  <MyCalendar />,
  document.getElementById('calendar-container')
);
