document.activeElement.blur();

const { createApp, ref } = Vue

createApp({
    setup() {
        const searchID = ref('')
        const cardID = ref('')
        const student = ref({})
        const checkedLst = ref([])
        const err = ref('')

        const del = () => {
            searchID.value = searchID.value.replace(/.$/, '')
            err.value = ''
        };

        const add = (n) => {
            err.value = ''
            if (searchID.value.length <= 4) {
                searchID.value += n;
            }
        }

        const pad = num => String(num).padStart(2, '0')

        const checkIn = (std) => {
            err.value = ''

            if (std.length < 5) {
                err.value = "Please Enter Student ID"
            } else {
                const date = new Date()
                searchStudent(std)
                if (student.value.name) {
                    checkedLst.value.unshift({
                        id: std,
                        name: student.value.name,
                        time: `${pad(date.getHours())}:${pad(date.getMinutes())}`
                    })
                    searchID.value = ''
                    cardID.value = ''
                } else {
                    err.value = 'Student not found'
                }
                student.value = {}
            }
        }

        const searchCard = () => {
            const result = Students.filter(std => std.cardID === cardID.value)[0]
            if (result) {
                searchID.value = result.studentID
                checkIn(result.studentID)
            }
        }

        const searchStudent = (id) => {
            const result = StudentsData.filter(std => std.studentID === id)[0]
            if (result) {
                student.value = result
            }
        }

        const saveFile = () => {
            const ws = XLSX.utils.json_to_sheet(checkedLst.value)
            const wb = XLSX.utils.book_new()
            XLSX.utils.book_append_sheet(wb, ws, "Checked In")
            XLSX.writeFile(wb, "Excel.xlsx")
        }

        return {
            searchID,
            cardID,
            checkedLst,
            student,
            err,
            saveFile,
            searchCard,
            checkIn,
            del,
            add
        }
    }
}).mount('#app')