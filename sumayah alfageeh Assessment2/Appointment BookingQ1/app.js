const DBName = 'AppointmentsDB';
let DB;
function InitIndexedDB() {
    const request = window.indexedDB.open(DBName, 1);
    request.onerror = (event) => { console.log('Error creating / accessing DB'); };
    request.onsuccess = (event) => {
        DB = event.target.result;
        LoadAppointments();
    }
    request.onupgradeneeded = (event) => {
        DB = event.target.result;
        DB.createObjectStore('Appointments', { autoIncrement: true });
    };
}
function AddAppointment(appointment) {
    const transaction = DB.transaction(['Appointments'], 'readwrite');
    const AppointmentStore = transaction.objectStore('Appointments');
    const request = AppointmentStore.add(appointment);
    request.onsuccess = () => { LoadAppointments(); };
    transaction.onComplete = () => { DB.close(); };
}
function LoadAppointments() {
    const AppointmentSection = document.getElementById('Appointment');
    AppointmentSection.innerHTML = '';
    const ObjectStore = DB.transaction('Appointments').objectStore('Appointments');
    ObjectStore.openCursor().onsuccess = (event) => {
        const cursor = event.target.result;
        if (cursor) {
            const Appointment = cursor.value;
            const AppointmentItem = document.createElement('li');
            AppointmentItem.className = 'list-group-item';
            AppointmentItem.textContent = `Pationt Name: ${Appointment.Name} - Appiontment Date: ${Appointment.Date} - Appiontment Time: 
            ${Appointment.Time} - The Problem:  ${Appointment.Problem}`;
            AppointmentSection.appendChild(AppointmentItem);
            cursor.continue();
        }
    };
}
$('#App_mentForm').submit(function (e) {
    e.preventDefault();
    const Name = $('#name').val();
    const Date = $('#date').val();
    const Time = $('#time').val();
    const Problem = $('#problem').val();

    const Appointment = { Name, Date, Time, Problem };
    AddAppointment(Appointment);
    $('#name').val('');
    $('#date').val('');
    $('#time').val('');
    $('#problem').val('');
})
InitIndexedDB();