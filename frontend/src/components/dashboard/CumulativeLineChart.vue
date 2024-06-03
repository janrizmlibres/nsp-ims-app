<script setup>
import Chart from 'primevue/chart';
import Card from 'primevue/card';
import { computed, toRaw } from 'vue';

import { useUtilitiesStore } from '@/stores/utilities';
import { useStudentsStore } from '@/stores/students';
import { useEnrollmentStore } from '@/stores/enrollment';
import { useVolunteerStore } from '@/stores/volunteer';

const enrollmentStore = useEnrollmentStore();
const utilitiesStore = useUtilitiesStore()
const studentsStore = useStudentsStore()
const volunteersStore = useVolunteerStore()

const chartData = computed(() => setChartData())
const chartOptions = computed(() => setChartOptions())
const data = computed(() => {
    return {
        terms: structuredClone(toRaw(utilitiesStore.terms)).reverse(),
        students: structuredClone(toRaw(studentsStore.students)),
        enrollments: structuredClone(toRaw(enrollmentStore.allEnrolled)),
        volunteers: structuredClone(toRaw(volunteersStore.volunteers))
    }
})

function setChartData() {
    const documentStyle = getComputedStyle(document.documentElement);

    var years = data.value.terms.map(({ start_date, end_date }) => new Date(start_date).getFullYear() + '-' + new Date(end_date).getFullYear())

    var studentCount = data.value.students.reduce((prev, curr) => {
        var admitted_year = curr.admitted_year;
        var index = years.indexOf(admitted_year)
        
        if (!(index in prev)) {
            prev[index] = 0
        }
        prev[index]++;
        return prev;
    }, []);

    studentCount = Array.from(studentCount, item => item || 0);

    var enrollmentCount = data.value.enrollments.reduce((prev, curr) => {
        let date = new Date(curr.dateEnrolled).getFullYear()
        var dateEnrolled =  date + '-' + (date+1) ;
        var index = years.indexOf(dateEnrolled)
        
        if (!(index in prev)) {
            prev[index] = 0
        }
        prev[index]++;
        return prev;
    }, []);

    enrollmentCount = Array.from(enrollmentCount, item => item || 0);

    var volunteerCount = data.value.volunteers.reduce((prev, curr) => {
        var admitted_year = curr.admitted_year;
        var index = years.indexOf(admitted_year)
        
        if (!(index in prev)) {
            prev[index] = 0
        }
        prev[index]++;
        return prev;
    }, []);

    volunteerCount = Array.from(volunteerCount, item => item || 0);

    var saKPI = data.value.terms.map(term => term.student_admission_kpi)
    var eKPI = data.value.terms.map(term => term.enrollment_kpi)
    var vaKPI = data.value.terms.map(term => term.volunteer_admission_kpi)


    return {
        labels: years,
        datasets: [
            {
                type: 'bar',
                label: 'Student Admission',
                data: studentCount,
                fill: false,
                backgroundColor: documentStyle.getPropertyValue('--cyan-500'),
                borderColor: 'white',
                borderWidth: 2
            },
            {
                type: 'bar',
                label: 'Student Enrollment',
                data: enrollmentCount,
                fill: false,
                backgroundColor: documentStyle.getPropertyValue('--pink-500'),
                borderColor: 'white',
                borderWidth: 2
            },
            {
                type: 'bar',
                label: 'Volunteer Admission',
                data: volunteerCount,
                fill: false,
                backgroundColor: documentStyle.getPropertyValue('--yellow-500'),
                borderColor: 'white',
                borderWidth: 2
            },
            {
                type: 'line',
                label: 'Student Admission KPI',
                data: saKPI,
                fill: false,
                borderColor: documentStyle.getPropertyValue('--bluegray-500'),
            },
            {
                type: 'line',
                label: 'Enrollment KPI',
                data: eKPI,
                fill: false,
                borderColor: documentStyle.getPropertyValue('--indigo-500'),
            },
            {
                type: 'line',
                label: 'Volunteer Admission KPI',
                data: vaKPI,
                fill: false,
                borderColor: documentStyle.getPropertyValue('--teal-500'),
            }
        ]
    }
}

function setChartOptions() {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

    return {
        maintainAspectRatio: false,
        plugins: {
            legend: {
                labels: {
                    color: textColor
                }
            }
        },
        scales: {
            x: {
                ticks: {
                    color: textColorSecondary
                },
                grid: {
                    color: surfaceBorder
                }
            },
            y: {
                beginAtZero: true,
                ticks: {
                    color: textColorSecondary
                },
                grid: {
                    color: surfaceBorder
                }
            }
        }
    };
}
</script>

<template>
    <Card class="!rounded-2xl shadow-2xl row-span-2 xl:col-span-2  u-border-bottom"
        :pt="{body: {class: ['h-full']}, content: {class:['h-full !py-0']}}" :ptOptions="{mergeProps: true}"
    >
        <template #content>
            <Chart type="bar" :data="chartData" :options="chartOptions" class="h-full" />
        </template>
    </Card>
</template>