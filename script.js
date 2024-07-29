  const alarms = new Set();

        // Set the interval to call the render function every second
        setInterval(render, 1000);

        function render() {
            const now = new Date();
            const hour = now.getHours();
            const minute = now.getMinutes();
            const seconds = now.getSeconds();

            // formatted hour
            const fh = hour > 12 ? hour % 12 : hour;
            const formattedHours = fh < 10 ? `0${fh}` : fh;

            // formatted minutes
            const formattedMinute = minute < 10 ? `0${minute}` : minute;

            // formatted seconds
            const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;
            
            // anti meridian and post meridian
            const amPm = hour < 12 ? "AM" : "PM";

            const formattedTime = `${formattedHours}:${formattedMinute}:${formattedSeconds} ${amPm}`;

            // Update the clock display
            const timeDisplay = document.querySelector(".current-time");
            if (timeDisplay) {
                timeDisplay.textContent = formattedTime;
            }

            // Check if current time matches any alarm
            if (alarms.has(formattedTime)) {
                alert("Time to wake up!");
                alarms.delete(formattedTime); // Optionally remove the alarm after it has been triggered
                updateAlarmList(); // Update the display of alarms
            }
        }

        // Handle form submission and alarm management
        const form = document.getElementById('myform');
        const alarmList = document.getElementById('alarm-list');

        form.addEventListener('submit', function(event) {
            event.preventDefault(); // Prevent form from submitting normally

            // Retrieve form values
            const inputHour = document.getElementById("ihour").value.padStart(2,"0");
            const inputMinute = document.getElementById("iminute").value.padStart(2,"0");
            const inputSeconds = document.getElementById("iseconds").value.padStart(2,"0");
            const inputAmPm = document.getElementById("iAmPm").value;
            
            const alarmTime = `${inputHour}:${inputMinute}:${inputSeconds} ${inputAmPm}`;
            alarms.add(alarmTime);
    
            // inputHour='';
            // Update the alarm list display
            updateAlarmList();
        });

        function updateAlarmList() {
            alarmList.innerHTML = "";
            alarms.forEach(alarm => {
                const listItem = document.createElement("li");
                listItem.classList.add("list-item")
                listItem.textContent = alarm;

                // Delete button
                const deleteAlarm = document.createElement("button");
                deleteAlarm.classList.add("delete-button")
                deleteAlarm.textContent = "Delete";
                deleteAlarm.addEventListener('click', function() {
                    alarms.delete(alarm);
                    updateAlarmList(); // Refresh the list to reflect the deletion
                });

                listItem.appendChild(deleteAlarm);
                alarmList.appendChild(listItem);
            });
        }