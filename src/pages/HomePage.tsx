import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin, { type DateClickArg } from '@fullcalendar/interaction';
import type { EventClickArg, EventInput } from '@fullcalendar/core';
import { ACTIVITY_TYPES, ACTIVITY_TYPE_KEYS } from '../activityTypes';
import { subscribeActivities, type Activity } from '../data/activities';
import { LogNewModal } from '../components/LogNewModal';

export function HomePage() {
  const navigate = useNavigate();
  const [activities, setActivities] = useState<Activity[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [logOpen, setLogOpen] = useState(false);
  const [logDate, setLogDate] = useState<string | undefined>(undefined);

  useEffect(() => subscribeActivities(setActivities, (e) => setError(e.message)), []);

  const events: EventInput[] = useMemo(
    () =>
      activities.map((a) => ({
        id: a.id,
        title: ACTIVITY_TYPES[a.type].label,
        start: a.date,
        allDay: true,
        backgroundColor: ACTIVITY_TYPES[a.type].color,
        borderColor: ACTIVITY_TYPES[a.type].color,
        textColor: '#3d3a4a',
      })),
    [activities],
  );

  function openLog(date?: string) {
    setLogDate(date);
    setLogOpen(true);
  }

  return (
    <div className="home">

      {error && <p className="error">Could not load activities: {error}</p>}

      <div className="card calendar-card">
        <FullCalendar
          plugins={[dayGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          firstDay={1}
          headerToolbar={{ left: 'prev,next today', center: 'title', right: '' }}
          events={events}
          height="auto"
          dateClick={(arg: DateClickArg) => openLog(arg.dateStr)}
          eventClick={(arg: EventClickArg) => {
            arg.jsEvent.preventDefault();
            navigate(`/activity/${arg.event.id}`);
          }}
        />
      </div>


      <div className="page-header">
        <button className="btn btn-primary" onClick={() => openLog()}>
          Log activity
        </button>
      </div>

      <ul className="legend" aria-label="Activity colours">
        {ACTIVITY_TYPE_KEYS.map((k) => (
          <li key={k}>
            <span className="swatch" style={{ background: ACTIVITY_TYPES[k].color }} />
            {ACTIVITY_TYPES[k].label}
          </li>
        ))}
      </ul>

      {logOpen && <LogNewModal initialDate={logDate} onClose={() => setLogOpen(false)} />}
    </div>
  );
}
