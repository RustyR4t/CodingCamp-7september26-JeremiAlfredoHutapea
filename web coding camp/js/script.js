// ==================================================
// 1. GREETING DAN WAKTU
// ==================================================

// Mengambil elemen HTML yang kita perlukan

const greetingElement =
    document.getElementById("greeting");

const dateTimeElement =
    document.getElementById("date-time");

const nameInput =
    document.getElementById("name-input");

const saveNameButton =
    document.getElementById("save-name");


// Function untuk menampilkan waktu dan greeting

function updateDateTime() {

    // Mengambil waktu sekarang
    const now = new Date();

    // Mengambil jam
    const hour = now.getHours();


    // Greeting default
    let greeting = "Good evening";


    // Menentukan greeting berdasarkan jam

    if (hour < 12) {

        greeting = "Good morning";

    } else if (hour < 18) {

        greeting = "Good afternoon";
    }


    // Mengambil nama dari Local Storage

    const savedName =
        localStorage.getItem("dashboardName");


    // Menampilkan greeting

    if (savedName) {

        greetingElement.textContent =
            `${greeting}, ${savedName}!`;

    } else {

        greetingElement.textContent =
            `${greeting}!`;
    }


    // Menampilkan tanggal dan waktu

    dateTimeElement.textContent =
        now.toLocaleString("id-ID", {

            weekday: "long",

            day: "numeric",

            month: "long",

            year: "numeric",

            hour: "2-digit",

            minute: "2-digit",

            second: "2-digit"
        });
}


// Tombol Save Name

saveNameButton.addEventListener(
    "click",
    function () {

        const name =
            nameInput.value.trim();


        // Jangan simpan jika kosong

        if (name !== "") {

            localStorage.setItem(
                "dashboardName",
                name
            );


            updateDateTime();


            nameInput.value = "";
        }
    }
);


// Jika sebelumnya sudah ada nama

const savedName =
    localStorage.getItem("dashboardName");


if (savedName) {

    nameInput.placeholder =
        savedName;
}


// Jalankan pertama kali

updateDateTime();


// Update setiap 1 detik

setInterval(
    updateDateTime,
    1000
);



// ==================================================
// 2. DARK MODE
// ==================================================

// Mengambil tombol Dark Mode

const themeToggle =
    document.getElementById("theme-toggle");


// Function untuk mengubah tulisan tombol

function updateThemeButton() {

    if (
        document.body.classList.contains("dark")
    ) {

        themeToggle.textContent =
            "☀️ Light Mode";

    } else {

        themeToggle.textContent =
            "🌙 Dark Mode";
    }
}


// Mengambil theme yang sebelumnya disimpan

const savedTheme =
    localStorage.getItem("dashboardTheme");


if (savedTheme === "dark") {

    document.body.classList.add("dark");
}


// Update tulisan tombol

updateThemeButton();


// Ketika tombol ditekan

themeToggle.addEventListener(
    "click",
    function () {

        // Tambah/hapus class dark

        document.body.classList.toggle("dark");


        const isDark =
            document.body.classList.contains("dark");


        // Simpan pilihan user

        if (isDark) {

            localStorage.setItem(
                "dashboardTheme",
                "dark"
            );

        } else {

            localStorage.setItem(
                "dashboardTheme",
                "light"
            );
        }


        updateThemeButton();
    }
);



// ==================================================
// 3. TO-DO LIST
// ==================================================


// Mengambil elemen HTML

const taskForm =
    document.getElementById("task-form");

const taskInput =
    document.getElementById("task-input");

const taskList =
    document.getElementById("task-list");

const taskCount =
    document.getElementById("task-count");

const taskMessage =
    document.getElementById("task-message");


// Mengambil task dari Local Storage

let tasks =
    JSON.parse(
        localStorage.getItem("tasks")
    ) || [];


// ==================================================
// FUNCTION SAVE TASK
// ==================================================

function saveTasks() {

    localStorage.setItem(
        "tasks",
        JSON.stringify(tasks)
    );
}



// ==================================================
// FUNCTION SHOW TASKS
// ==================================================

function showTasks() {

    // Kosongkan list terlebih dahulu

    taskList.innerHTML = "";


    // Jika belum ada task

    if (tasks.length === 0) {

        const emptyText =
            document.createElement("p");


        emptyText.className =
            "empty-state";


        emptyText.textContent =
            "Belum ada tugas. Tambahkan tugas pertama kamu.";


        taskList.appendChild(
            emptyText
        );
    }


    // Mengambil task satu per satu

    tasks.forEach(
        function (task) {


            // Membuat <li>

            const li =
                document.createElement("li");


            li.className =
                "task-item";


            // Membuat checkbox

            const checkbox =
                document.createElement("input");


            checkbox.type =
                "checkbox";


            checkbox.checked =
                task.done;


            // Ketika checkbox berubah

            checkbox.addEventListener(
                "change",
                function () {

                    task.done =
                        checkbox.checked;


                    saveTasks();

                    showTasks();
                }
            );


            // Membuat text task

            const text =
                document.createElement("span");


            text.className =
                "task-text";


            // Jika task selesai

            if (task.done) {

                text.classList.add("done");
            }


            text.textContent =
                task.text;


            // Membuat tempat tombol

            const actions =
                document.createElement("div");


            actions.className =
                "task-actions";


            // ==================================================
            // EDIT BUTTON
            // ==================================================

            const editButton =
                document.createElement("button");


            editButton.textContent =
                "Edit";


            editButton.addEventListener(
                "click",
                function () {


                    const newText =
                        prompt(
                            "Edit tugas:",
                            task.text
                        );


                    if (
                        newText !== null &&
                        newText.trim() !== ""
                    ) {

                        task.text =
                            newText.trim();


                        saveTasks();

                        showTasks();
                    }
                }
            );


            // ==================================================
            // DELETE BUTTON
            // ==================================================

            const deleteButton =
                document.createElement("button");


            deleteButton.textContent =
                "Delete";


            deleteButton.className =
                "delete-button";


            deleteButton.addEventListener(
                "click",
                function () {


                    tasks =
                        tasks.filter(
                            function (item) {

                                return (
                                    item.id !==
                                    task.id
                                );
                            }
                        );


                    saveTasks();

                    showTasks();
                }
            );


            // Masukkan tombol ke actions

            actions.appendChild(
                editButton
            );

            actions.appendChild(
                deleteButton
            );


            // Masukkan semua elemen ke li

            li.appendChild(
                checkbox
            );

            li.appendChild(
                text
            );

            li.appendChild(
                actions
            );


            // Masukkan li ke list

            taskList.appendChild(
                li
            );
        }
    );


    // Menghitung task yang belum selesai

    const unfinishedTasks =
        tasks.filter(
            function (task) {

                return !task.done;
            }
        ).length;


    taskCount.textContent =
        `${unfinishedTasks} unfinished`;
}



// ==================================================
// ADD TASK
// ==================================================

taskForm.addEventListener(
    "submit",
    function (event) {


        // Mencegah halaman reload

        event.preventDefault();


        // Mengambil input

        const text =
            taskInput.value.trim();


        // Jika input kosong

        if (text === "") {

            return;
        }


        // ==================================================
        // CHALLENGE:
        // PREVENT DUPLICATE TASKS
        // ==================================================

        const duplicate =
            tasks.some(
                function (task) {

                    return (
                        task.text.toLowerCase()
                        ===
                        text.toLowerCase()
                    );
                }
            );


        // Jika task sudah ada

        if (duplicate) {

            taskMessage.textContent =
                "Tugas tersebut sudah ada.";

            return;
        }


        taskMessage.textContent =
            "";


        // Membuat task baru

        const newTask = {

            id: Date.now(),

            text: text,

            done: false
        };


        // Memasukkan task ke array

        tasks.push(
            newTask
        );


        // Simpan

        saveTasks();


        // Tampilkan

        showTasks();


        // Kosongkan input

        taskInput.value = "";
    }
);


// Tampilkan task ketika website pertama kali dibuka

showTasks();



// ==================================================
// 4. FOCUS TIMER
// ==================================================


// Mengambil elemen HTML

const timerDisplay =
    document.getElementById(
        "timer-display"
    );

const timerStatus =
    document.getElementById(
        "timer-status"
    );

const startTimerButton =
    document.getElementById(
        "start-timer"
    );

const stopTimerButton =
    document.getElementById(
        "stop-timer"
    );

const resetTimerButton =
    document.getElementById(
        "reset-timer"
    );


// 25 menit = 25 x 60 detik

const defaultTime =
    25 * 60;


// Waktu yang sedang berjalan

let remainingTime =
    defaultTime;


// Menyimpan timer

let timer = null;



// ==================================================
// FUNCTION UPDATE TIMER
// ==================================================

function updateTimerDisplay() {


    // Menghitung menit

    const minutes =
        Math.floor(
            remainingTime / 60
        );


    // Menghitung detik

    const seconds =
        remainingTime % 60;


    // Menambahkan 0 di depan jika perlu

    const minuteText =
        String(minutes)
        .padStart(2, "0");


    const secondText =
        String(seconds)
        .padStart(2, "0");


    // Menampilkan timer

    timerDisplay.textContent =
        `${minuteText}:${secondText}`;
}



// ==================================================
// START TIMER
// ==================================================

startTimerButton.addEventListener(
    "click",
    function () {


        // Jangan jalankan timer
        // jika timer sudah berjalan

        if (timer !== null) {

            return;
        }


        timerStatus.textContent =
            "Focus time!";


        // Jalankan setiap 1 detik

        timer =
            setInterval(
                function () {


                    // Kurangi 1 detik

                    remainingTime--;


                    // Update tampilan

                    updateTimerDisplay();


                    // Jika waktu habis

                    if (
                        remainingTime <= 0
                    ) {


                        clearInterval(
                            timer
                        );


                        timer = null;


                        remainingTime = 0;


                        timerStatus.textContent =
                            "Time is up! Take a short break.";


                        updateTimerDisplay();
                    }

                },
                1000
            );
    }
);



// ==================================================
// STOP TIMER
// ==================================================

stopTimerButton.addEventListener(
    "click",
    function () {


        if (timer !== null) {

            clearInterval(
                timer
            );


            timer = null;


            timerStatus.textContent =
                "Timer stopped";
        }
    }
);



// ==================================================
// RESET TIMER
// ==================================================

resetTimerButton.addEventListener(
    "click",
    function () {


        // Hentikan timer

        clearInterval(
            timer
        );


        timer = null;


        // Kembali ke 25 menit

        remainingTime =
            defaultTime;


        timerStatus.textContent =
            "Ready to focus";


        updateTimerDisplay();
    }
);


// Tampilkan 25:00 saat awal

updateTimerDisplay();



// ==================================================
// 5. QUICK LINKS
// ==================================================


// Mengambil elemen HTML

const linkForm =
    document.getElementById(
        "link-form"
    );

const linkNameInput =
    document.getElementById(
        "link-name"
    );

const linkUrlInput =
    document.getElementById(
        "link-url"
    );

const linkList =
    document.getElementById(
        "link-list"
    );


// Mengambil link dari Local Storage

let links =
    JSON.parse(
        localStorage.getItem(
            "quickLinks"
        )
    ) || [

        {
            id: 1,

            name: "Google",

            url: "https://www.google.com"
        },

        {
            id: 2,

            name: "GitHub",

            url: "https://github.com"
        }
    ];



// ==================================================
// SAVE LINKS
// ==================================================

function saveLinks() {

    localStorage.setItem(
        "quickLinks",
        JSON.stringify(links)
    );
}



// ==================================================
// SHOW LINKS
// ==================================================

function showLinks() {


    // Kosongkan list

    linkList.innerHTML = "";


    // Tampilkan link satu per satu

    links.forEach(
        function (link) {


            // Container

            const wrapper =
                document.createElement(
                    "div"
                );


            wrapper.className =
                "link-item";


            // Membuat link

            const anchor =
                document.createElement(
                    "a"
                );


            anchor.href =
                link.url;


            // Buka di tab baru

            anchor.target =
                "_blank";


            anchor.rel =
                "noopener noreferrer";


            anchor.textContent =
                link.name;


            // ==================================================
            // DELETE LINK
            // ==================================================

            const deleteButton =
                document.createElement(
                    "button"
                );


            deleteButton.textContent =
                "Delete";


            deleteButton.className =
                "delete-button";


            deleteButton.addEventListener(
                "click",
                function () {


                    links =
                        links.filter(
                            function (item) {

                                return (
                                    item.id !==
                                    link.id
                                );
                            }
                        );


                    saveLinks();

                    showLinks();
                }
            );


            // Masukkan link dan button

            wrapper.appendChild(
                anchor
            );

            wrapper.appendChild(
                deleteButton
            );


            // Masukkan ke halaman

            linkList.appendChild(
                wrapper
            );
        }
    );
}



// ==================================================
// ADD LINK
// ==================================================

linkForm.addEventListener(
    "submit",
    function (event) {


        // Mencegah reload

        event.preventDefault();


        const name =
            linkNameInput.value.trim();


        let url =
            linkUrlInput.value.trim();


        // Jika kosong

        if (
            name === "" ||
            url === ""
        ) {

            return;
        }


        // Jika user tidak menulis https://

        if (
            !url.startsWith(
                "http://"
            ) &&
            !url.startsWith(
                "https://"
            )
        ) {

            url =
                "https://" + url;
        }


        // Membuat link baru

        const newLink = {

            id: Date.now(),

            name: name,

            url: url
        };


        // Masukkan ke array

        links.push(
            newLink
        );


        // Simpan

        saveLinks();


        // Tampilkan

        showLinks();


        // Kosongkan input

        linkNameInput.value = "";

        linkUrlInput.value = "";
    }
);



// ==================================================
// INITIALIZE QUICK LINKS
// ==================================================

saveLinks();

showLinks();