import { Badge, Calendar, Card, Col, Row } from 'antd';
import moment from 'moment';
import { FC, useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Loader, PageTitle } from 'components';

import './styles.scss';
import { useFetch } from 'services';
import { Appointments } from './components';

interface ScheduleDataType {
  day: number;
  amountOfAppointments: number;
  available: boolean;
}

export const Schedule: FC = () => {
  const { t } = useTranslation();
  const [month, setMonth] = useState(() => {
    return moment().format('MMMM');
  });

  const {
    get: getMonthScheduleData,
    response: monthScheduleData,
    loading: loadingMonthSchedule,
  } = useFetch<ScheduleDataType>({
    baseURL: 'appointments',
  });
  const {
    get: getDayScheduleData,
    response: dayScheduleData,
    loading: loadingDaySchedule,
  } = useFetch<any>({
    baseURL: 'appointments',
  });

  const fetchDay = useCallback(
    (dateString) => {
      getDayScheduleData({
        url: '/schedule',
        config: {
          params: {
            type: 'day',
            date: dateString,
          },
        },
        options: {
          clearData: true,
        },
      });
    },
    [getDayScheduleData],
  );

  const fetchMonth = useCallback(
    (dateString) => {
      getMonthScheduleData({
        url: '/schedule',
        config: {
          params: {
            type: 'month',
            date: dateString,
          },
        },
        options: {
          clearData: true,
        },
      });
    },
    [getMonthScheduleData],
  );

  const dateCellRender = useCallback(
    (date) => {
      if (!monthScheduleData) return <></>;
      if (date.month() !== new Date().getMonth()) return <></>;

      const { items = [] } = monthScheduleData;

      const { amountOfAppointments } = items[date.date() - 1];

      if (!amountOfAppointments) return <></>;

      return (
        <Badge
          status="warning"
          text={t('pages.schedule.appointmentCount', {
            count: amountOfAppointments,
          })}
        />
      );
    },
    [monthScheduleData, t],
  );

  const onSelect = useCallback(
    (date) => {
      if (date.month() !== new Date().getMonth()) return;

      const jsDate = new Date(date.format('YYYY-MM-DD'));

      fetchDay(jsDate.toISOString());
    },
    [fetchDay],
  );

  const onPanelChange = useCallback(
    (date) => {
      const jsDate = new Date(date.format('YYYY-MM-DD'));

      setMonth(date.format('MMMM'));

      fetchMonth(jsDate);
      fetchDay(jsDate);
    },
    [fetchDay, fetchMonth],
  );

  useEffect(() => {
    const currentDate = new Date().toISOString();

    fetchMonth(currentDate);
    fetchDay(currentDate);
  }, [fetchDay, fetchMonth]);

  return (
    <>
      <PageTitle
        title={t('pages.schedule.title')}
        subtitle={t('pages.schedule.subtitle', { month })}
      />

      <Card id="schedule-page">
        <Row>
          <Col span={18}>
            <Loader loading={loadingMonthSchedule} />
            <Calendar
              dateCellRender={dateCellRender}
              onSelect={onSelect}
              onPanelChange={onPanelChange}
            />
            ,
          </Col>
          <Col span={6}>
            <Loader loading={loadingDaySchedule} />
            <Appointments data={dayScheduleData?.items} />
          </Col>
        </Row>
      </Card>
    </>
  );
};
