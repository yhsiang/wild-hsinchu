import React, { Component, PropTypes } from 'react';
import { render } from 'react-dom';
import moment from 'moment';
import createDateObjects from './createDateObjects';
import { map } from 'lodash';
import 'moment/locale/nb';

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

  render() {
    const { date, weekOffset, renderDay, onNextMonth, onPrevMonth, onPickDate } = this.props,
      renderToday = day => <span className="active">{day.format('D')}</span>;

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
                onClick={(e) => onPickDate(day.day)}
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
  render() {
    const date = moment();
    return (
      <div className="Event">
        <div className="Event-date">{`${date.format('YYYY')-1911} 年 ${date.format('MM 月 DD 日')}`}</div>
        <div className="Event-header"> 活動內容
          <div className="Event-header--boder"/>
        </div>
        <div className="Event-list">
          <div className="Event-item">新竹黑客松市府官網設計大賽
          </div>
          <div className="Event-item">「捐發票  送好康」租稅宣導活動
          </div>
          <div className="Event-item">「新竹·漫步小旅行」1小時免費導覽服務
          </div>
        </div>
      </div>
    );
  }
}
class MyCalendar extends Component {
  state = {
    date: moment()
  }

  render() {
    return (
      <div style={{height: 100 + '%'}}>
        <Calendar
          onNextMonth={() => this.setState({ date: this.state.date.clone().add(1, 'months') }) }
          onPrevMonth={() => this.setState({ date: this.state.date.clone().subtract(1, 'months') }) }
          date={this.state.date}
          onPickDate={(date) => console.log(date)}
          renderDay={(day) => day.format('D')}
        />
        <Event />
      </div>
    );
  }
}


render(
  <MyCalendar />,
  document.getElementById('calendar-container')
);
