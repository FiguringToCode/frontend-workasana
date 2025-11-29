import { Sidebar } from "../components/Sidebar"
import { useContext } from "react"
import AuthContext from "../../AuthContext"
import { GiHamburgerMenu } from "react-icons/gi";
import { Pie, Bar } from 'react-chartjs-2'
import {
    Chart as ChartJS, 
    ArcElement,    
    Tooltip,       
    Legend        
} from 'chart.js/auto'
 
ChartJS.register(ArcElement, Tooltip, Legend)

export const Reports = () => {
    const { sidebarOpen, setSidebarOpen, tasks } = useContext(AuthContext)

    console.log(tasks)
    const oneWeekAgo = new Date()
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7)
    const lastWeekTasks = tasks.filter(task => task.status === "Completed" && new Date(task.updatedAt) >= oneWeekAgo)
    console.log(lastWeekTasks)

    const totalTasks = [
        {label: "Total Tasks", value: tasks?.length},
        {label: "Tasks Completed Last Week", value: lastWeekTasks?.length}
    ]

    const taskTimeObject = tasks?.reduce((acc, task) => {
        acc[task.name] = task.timeToComplete/24
        return acc
    }, {})

    // Modified: Count tasks by team and status for proper team vs status chart
    const teamStatusCounts = tasks?.reduce((acc, task) => {
        const teamName = task.team?.name || 'Unknown';
        const status = task.status || 'Unknown';
        if (!acc[teamName]) {
            acc[teamName] = {};
        }
        if (!acc[teamName][status]) {
            acc[teamName][status] = 0;
        }
        acc[teamName][status]++;
        return acc;
    }, {});
    
    console.log(teamStatusCounts);

    // Prepare chart data for team vs status (stacked bar chart)
    const teamNames = Object.keys(teamStatusCounts || {});
    const uniqueStatuses = [...new Set(
        tasks?.flatMap(task => task.status).filter(Boolean) || []
    )];
    
    const datasets = uniqueStatuses.map((status, index) => ({
        label: status,
        data: teamNames.map(teamName => teamStatusCounts[teamName]?.[status] || 0),
        backgroundColor: `hsl(${index * 60}, 70%, 50%)`,
        borderColor: `hsl(${index * 60}, 70%, 30%)`,
        borderWidth: 1
    }));

    return (
        <div className="flex bg-black h-max">
            
            <div>
                <Sidebar />
            </div>

            <main className="flex-1 min-w-screen lg:min-w-[82vw]">

                <header className="bg-black bg-opacity-90 flex items-center lg:justify-center p-4 border-b-2 border-pink-600">
                    <button className="p-2 text-2xl lg:hidden z-30 border-2 rounded-lg border-pink-600 text-pink-600 hover:text-indigo-500 hover:border-indigo-500 transition" onClick={() => setSidebarOpen(!sidebarOpen)} aria-label="Toggle sidebar">
                        <GiHamburgerMenu />
                    </button>
                    <h1 className="text-2xl sm:text-3xl tracking-wider bg-linear-to-r from-pink-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent font-semibold ps-5 ml-4">
                        Workasana Reports
                    </h1>
                </header>

                <section className="px-4 md:px-10 py-10 space-y-10">

                    <div className="bg-white/10 p-5 shadow-lg shadow-neutral-800 rounded-lg flex flex-col items-center">
                        <h2 className="text-gray-100 font-semibold text-xl sm:text-2xl text-center">Total Tasks Completed Last Week</h2>
                        <div className="w-full max-w-md sm:max-w-lg">
                            <Pie data={{
                                labels: totalTasks?.map(data => data.label),
                                datasets: [
                                    {
                                        data: totalTasks?.map(data => data.value),
                                        backgroundColor: ['rgba(245, 73, 39, 0.8)', 'rgba(39, 245, 73, 0.8)'],
                                        borderColor: ['rgba(245, 73, 39, 1)', 'rgba(39, 245, 73, 1)'],
                                        borderWidth: 2
                                    }
                                ]
                            }} options={{ maintainAspectRatio: true, responsive: true }} />
                        </div>
                    </div>

                    <div className="bg-white/10 py-10 shadow-lg shadow-neutral-800 rounded-lg flex flex-col items-center">
                        <h2 className="text-gray-100 font-semibold text-xl sm:text-2xl text-center mb-2">Total Time Pending</h2>
                        <div className="w-full max-w-full overflow-x-auto">
                            <Bar data={{
                                labels: Object.keys(taskTimeObject || {}),
                                datasets: [
                                    {
                                        label: "Tasks Pending Time (hrs)",
                                        data: Object.values(taskTimeObject || {}),
                                        backgroundColor: "rgba(106, 90, 205, 0.8)",
                                    }
                                ]
                            }} options={{ maintainAspectRatio: false, responsive: true, scales: { x: {ticks: { maxRotation: 90, minRotation: 45 },}, y: { beginAtZero: true, }, },}} height={350} />
                        </div>
                    </div>

                    <div className="bg-white/10 p-5 shadow-lg shadow-neutral-800 rounded-lg flex flex-col items-center">
                        <h2 className="text-gray-100 font-semibold text-xl sm:text-2xl text-center mb-2">Team vs Task Status</h2>
                        <div className="w-full max-w-full overflow-x-auto">
                            <Bar data={{
                                labels: teamNames,
                                datasets: datasets
                            }} options={{ maintainAspectRatio: false, responsive: true, scales: { x: {stacked: true, ticks: { maxRotation: 90, minRotation: 45 },}, y: { stacked: true, beginAtZero: true,},},}} height={350} />
                        </div>
                    </div>
                </section>

            </main>
        </div>
    )
}
