import * as React from "react";
import Paper from "@material-ui/core/Paper";
import {
  ViewState,
  EditingState,
  IntegratedEditing
} from "@devexpress/dx-react-scheduler";
import {
  Scheduler,
  DayView,
  Appointments,
  AppointmentForm,
  AppointmentTooltip,
  ConfirmationDialog,
  EditRecurrenceMenu,
  WeekView,
  MonthView,
  Toolbar,
  DateNavigator,
  TodayButton,
  ViewSwitcher,
  Resources
} from "@devexpress/dx-react-scheduler-material-ui";

import { appointments } from "./demo-data/appointments";

export default class Demo extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      data: appointments,
      currentDate: new Date(),
      currentViewName: "work-week",
      addedAppointment: {},
      appointmentChanges: {},
      editingAppointment: undefined,
      resources: [
        {
          fieldName: "teacher",
          title: "Teacher",
          allowMultiple: true,
          instances: [
            { id: 1, text: "Dhirendre Kumar" },
            { id: 2, text: "Divyansh Bharadwaj" },
            { id: 3, text: "Pooja Verma" },
            { id: 4, text: "Nidhi singh" },
            { id: 5, text: "Vaibhav diwan" },
            { id: 6, text: "Deepak Mittal" },
            { id: 7, text: "Divya verma" },
            { id: 8, text: "Anupam Kumar" },
            { id: 9, text: "Jugindre pal" }
          ]
        }
      ]
    };
    this.currentViewNameChange = (currentViewName) => {
      this.setState({ currentViewName });
    };

    this.commitChanges = this.commitChanges.bind(this);
    this.changeAddedAppointment = this.changeAddedAppointment.bind(this);
    this.changeAppointmentChanges = this.changeAppointmentChanges.bind(this);
    this.changeEditingAppointment = this.changeEditingAppointment.bind(this);
  }

  changeAddedAppointment(addedAppointment) {
    this.setState({ addedAppointment });
  }

  changeAppointmentChanges(appointmentChanges) {
    this.setState({ appointmentChanges });
  }

  changeEditingAppointment(editingAppointment) {
    this.setState({ editingAppointment });
  }

  commitChanges({ added, changed, deleted }) {
    this.setState((state) => {
      let { data } = state;
      if (added) {
        const startingAddedId =
          data.length > 0 ? data[data.length - 1].id + 1 : 0;
        data = [...data, { id: startingAddedId, ...added }];
      }
      if (changed) {
        data = data.map((appointment) =>
          changed[appointment.id]
            ? { ...appointment, ...changed[appointment.id] }
            : appointment
        );
      }
      if (deleted !== undefined) {
        data = data.filter((appointment) => appointment.id !== deleted);
      }
      return { data };
    });
  }

  render() {
    const {
      currentDate,
      data,
      addedAppointment,
      currentViewName,
      appointmentChanges,
      editingAppointment,
      resources
    } = this.state;
    return (
      <Paper>
        <Scheduler data={data}>
          <ViewState
            defaultCurrentDate={currentDate}
            currentViewName={currentViewName}
            onCurrentViewNameChange={this.currentViewNameChange}
          />
          <EditingState
            onCommitChanges={this.commitChanges}
            addedAppointment={addedAppointment}
            onAddedAppointmentChange={this.changeAddedAppointment}
            appointmentChanges={appointmentChanges}
            onAppointmentChangesChange={this.changeAppointmentChanges}
            editingAppointment={editingAppointment}
            onEditingAppointmentChange={this.changeEditingAppointment}
          />

          <DayView startDayHour={9} endDayHour={15} />

          <WeekView
            name="work-week"
            displayName="Work Week"
            excludedDays={[0, 6]}
            startDayHour={9}
            endDayHour={19}
          />
          <MonthView />
          <Toolbar />
          <ViewSwitcher />
          <DateNavigator />
          <TodayButton />
          <IntegratedEditing />
          <EditRecurrenceMenu />

          <ConfirmationDialog />
          <Appointments />
          <AppointmentTooltip showOpenButton showDeleteButton />

          <AppointmentForm />
          <Resources data={resources} />
        </Scheduler>
      </Paper>
    );
  }
}
