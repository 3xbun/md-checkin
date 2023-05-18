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
            console.log(searchID.value);
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
            console.log(id);
            const result = StudentsData.filter(std => std.studentID === id)[0]
            if (result) {
                student.value = result
            }
        }

        return {
            searchID,
            cardID,
            checkedLst,
            student,
            err,
            searchCard,
            checkIn,
            del,
            add
        }
    }
}).mount('#app')